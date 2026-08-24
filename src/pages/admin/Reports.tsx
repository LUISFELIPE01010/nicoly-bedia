import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { brl, csvDownload, rangeForPeriod, shortDate, LEAD_STATUS_LABEL } from '@/lib/crm';

const Reports = () => {
  const [period, setPeriod] = useState('30');
  const { start } = rangeForPeriod(Number(period));

  const { data } = useQuery({
    queryKey: ['reports', period],
    queryFn: async () => {
      const iso = start.toISOString();
      const [sales, leads, sources, procedures, saleItems] = await Promise.all([
        supabase.from('sales').select('id, sold_at, total_amount, status, client_id').gte('sold_at', iso).order('sold_at'),
        supabase.from('leads').select('id, name, status, source_id, created_at').gte('created_at', iso),
        supabase.from('lead_sources').select('id, name'),
        supabase.from('procedures').select('id, name'),
        supabase.from('sale_items').select('procedure_id, quantity, unit_price, sales(sold_at)'),
      ]);

      const saleRows = (sales.data ?? []).filter((s) => s.status !== 'cancelado');
      const byDay = new Map<string, number>();
      saleRows.forEach((s) => {
        const key = new Date(s.sold_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        byDay.set(key, (byDay.get(key) ?? 0) + Number(s.total_amount));
      });

      const sourceMap = new Map((sources.data ?? []).map((s) => [s.id, s.name]));
      const leadRows = leads.data ?? [];
      const bySource = Array.from(
        leadRows.reduce<Map<string, { total: number; convertidos: number }>>((acc, l) => {
          const key = l.source_id ? sourceMap.get(l.source_id) ?? 'Outros' : 'Sem origem';
          const cur = acc.get(key) ?? { total: 0, convertidos: 0 };
          cur.total += 1;
          if (l.status === 'cliente') cur.convertidos += 1;
          acc.set(key, cur);
          return acc;
        }, new Map()),
      ).map(([name, v]) => ({ name, ...v }));

      const procMap = new Map((procedures.data ?? []).map((p) => [p.id, p.name]));
      const byProcedure = Array.from(
        (saleItems.data ?? [])
          .filter((i) => {
            const soldAt = (i as { sales?: { sold_at: string } | null }).sales?.sold_at;
            return soldAt ? new Date(soldAt) >= start : false;
          })
          .reduce<Map<string, { qtd: number; receita: number }>>((acc, i) => {
            const key = i.procedure_id ? procMap.get(i.procedure_id) ?? 'Outro' : 'Outro';
            const cur = acc.get(key) ?? { qtd: 0, receita: 0 };
            cur.qtd += Number(i.quantity ?? 1);
            cur.receita += Number(i.quantity ?? 1) * Number(i.unit_price ?? 0);
            acc.set(key, cur);
            return acc;
          }, new Map()),
      ).map(([name, v]) => ({ name, ...v })).sort((a, b) => b.receita - a.receita);

      return {
        revenueSeries: Array.from(byDay).map(([date, total]) => ({ date, total })),
        bySource,
        byProcedure,
        saleRows,
        leadRows,
        revenue: saleRows.reduce((acc, s) => acc + Number(s.total_amount), 0),
      };
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Relatórios</h1>
          <p className="text-sm text-muted-foreground">Faturamento de {brl(data?.revenue)} no período</p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Últimos 7 dias</SelectItem>
              <SelectItem value="30">Últimos 30 dias</SelectItem>
              <SelectItem value="90">Últimos 90 dias</SelectItem>
              <SelectItem value="365">Últimos 12 meses</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() =>
              csvDownload(
                `relatorio-leads-${period}d.csv`,
                (data?.leadRows ?? []).map((l) => ({
                  Nome: l.name,
                  Status: LEAD_STATUS_LABEL[l.status],
                  Criado: shortDate(l.created_at),
                })),
              )
            }
          >
            <Download className="h-4 w-4" /> Exportar CSV
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Faturamento por dia</CardTitle></CardHeader>
        <CardContent className="h-64">
          {data?.revenueSeries?.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.revenueSeries}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => brl(v)} />
                <Line type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="pt-16 text-center text-sm text-muted-foreground">Sem vendas no período.</p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Desempenho por origem</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow><TableHead>Origem</TableHead><TableHead>Leads</TableHead><TableHead>Convertidos</TableHead><TableHead>Taxa</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {(data?.bySource ?? []).map((s) => (
                  <TableRow key={s.name}>
                    <TableCell className="text-sm">{s.name}</TableCell>
                    <TableCell className="text-sm">{s.total}</TableCell>
                    <TableCell className="text-sm">{s.convertidos}</TableCell>
                    <TableCell className="text-sm">{s.total ? ((s.convertidos / s.total) * 100).toFixed(0) : 0}%</TableCell>
                  </TableRow>
                ))}
                {!data?.bySource?.length && <TableRow><TableCell colSpan={4} className="py-6 text-center text-sm text-muted-foreground">Sem dados.</TableCell></TableRow>}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Receita por procedimento</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow><TableHead>Procedimento</TableHead><TableHead>Qtd</TableHead><TableHead>Receita</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {(data?.byProcedure ?? []).map((p) => (
                  <TableRow key={p.name}>
                    <TableCell className="text-sm">{p.name}</TableCell>
                    <TableCell className="text-sm">{p.qtd}</TableCell>
                    <TableCell className="text-sm">{brl(p.receita)}</TableCell>
                  </TableRow>
                ))}
                {!data?.byProcedure?.length && <TableRow><TableCell colSpan={3} className="py-6 text-center text-sm text-muted-foreground">Sem dados.</TableCell></TableRow>}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
