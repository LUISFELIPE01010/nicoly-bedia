import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Users, CalendarCheck, UserPlus, DollarSign, TrendingUp, Percent } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { brl, rangeForPeriod } from '@/lib/crm';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#a855f7', '#84cc16'];

const Metric = ({ icon: Icon, label, value, hint }: { icon: React.ElementType; label: string; value: string; hint?: string }) => (
  <Card>
    <CardContent className="flex items-center gap-3 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
        {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [period, setPeriod] = useState('30');
  const { start, end } = rangeForPeriod(Number(period));

  const { data } = useQuery({
    queryKey: ['dashboard', period],
    queryFn: async () => {
      const iso = start.toISOString();
      const [leads, appointments, clients, sales, sources, procs] = await Promise.all([
        supabase.from('leads').select('id, status, source_id, created_at').gte('created_at', iso),
        supabase.from('appointments').select('id, status, starts_at').gte('starts_at', iso).lte('starts_at', end.toISOString()),
        supabase.from('clients').select('id, created_at').gte('created_at', iso),
        supabase.from('sales').select('id, total_amount, status, sold_at').gte('sold_at', iso),
        supabase.from('lead_sources').select('id, name'),
        supabase.from('sale_items').select('procedure_id, quantity, procedures(name)'),
      ]);

      const leadRows = leads.data ?? [];
      const saleRows = (sales.data ?? []).filter((s) => s.status !== 'cancelado');
      const revenue = saleRows.reduce((acc, s) => acc + Number(s.total_amount), 0);
      const attended = (appointments.data ?? []).filter((a) => a.status === 'compareceu').length;
      const converted = leadRows.filter((l) => l.status === 'cliente').length;
      const sourceMap = new Map((sources.data ?? []).map((s) => [s.id, s.name]));

      const bySource = Object.entries(
        leadRows.reduce<Record<string, number>>((acc, l) => {
          const key = l.source_id ? sourceMap.get(l.source_id) ?? 'Outros' : 'Sem origem';
          acc[key] = (acc[key] ?? 0) + 1;
          return acc;
        }, {}),
      ).map(([name, value]) => ({ name, value }));

      const byProcedure = Object.entries(
        (procs.data ?? []).reduce<Record<string, number>>((acc, item) => {
          const name = (item as { procedures?: { name: string } | null }).procedures?.name ?? 'Outro';
          acc[name] = (acc[name] ?? 0) + Number(item.quantity ?? 1);
          return acc;
        }, {}),
      )
        .map(([name, total]) => ({ name, total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 6);

      return {
        leads: leadRows.length,
        appointments: (appointments.data ?? []).length,
        attended,
        newClients: (clients.data ?? []).length,
        revenue,
        ticket: saleRows.length ? revenue / saleRows.length : 0,
        conversion: leadRows.length ? (converted / leadRows.length) * 100 : 0,
        bySource,
        byProcedure,
      };
    },
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Visão geral do desempenho da clínica</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Últimos 7 dias</SelectItem>
            <SelectItem value="30">Últimos 30 dias</SelectItem>
            <SelectItem value="90">Últimos 90 dias</SelectItem>
            <SelectItem value="365">Últimos 12 meses</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <Metric icon={Users} label="Leads no período" value={String(data?.leads ?? 0)} />
        <Metric icon={CalendarCheck} label="Agendamentos" value={String(data?.appointments ?? 0)} hint={`${data?.attended ?? 0} compareceram`} />
        <Metric icon={UserPlus} label="Clientes novos" value={String(data?.newClients ?? 0)} />
        <Metric icon={DollarSign} label="Faturamento" value={brl(data?.revenue)} />
        <Metric icon={TrendingUp} label="Ticket médio" value={brl(data?.ticket)} />
        <Metric icon={Percent} label="Conversão de leads" value={`${(data?.conversion ?? 0).toFixed(1)}%`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Leads por origem</CardTitle></CardHeader>
          <CardContent className="h-64">
            {data?.bySource?.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.bySource} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80}>
                    {data.bySource.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="pt-16 text-center text-sm text-muted-foreground">Sem dados no período.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Procedimentos mais vendidos</CardTitle></CardHeader>
          <CardContent className="h-64">
            {data?.byProcedure?.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.byProcedure}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-15} textAnchor="end" height={50} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="pt-16 text-center text-sm text-muted-foreground">Sem vendas registradas.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
