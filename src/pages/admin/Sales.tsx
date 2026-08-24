import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { brl, shortDate, SALE_STATUS, SALE_LABEL, PAYMENT_METHODS, toLocalInput } from '@/lib/crm';

type Sale = {
  id: string; client_id: string | null; sold_at: string; total_amount: number;
  discount: number; payment_method: string | null; status: string;
};

type Item = { procedure_id: string; quantity: string; unit_price: string };

const Sales = () => {
  const { profile, user } = useAuth();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [clientId, setClientId] = useState('');
  const [soldAt, setSoldAt] = useState(toLocalInput());
  const [discount, setDiscount] = useState('0');
  const [method, setMethod] = useState('Pix');
  const [status, setStatus] = useState('pago');
  const [items, setItems] = useState<Item[]>([{ procedure_id: '', quantity: '1', unit_price: '0' }]);

  const { data: sales = [] } = useQuery({
    queryKey: ['sales'],
    queryFn: async () => ((await supabase.from('sales').select('*').order('sold_at', { ascending: false })).data ?? []) as Sale[],
  });
  const { data: clients = [] } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => (await supabase.from('clients').select('id, name').order('name')).data ?? [],
  });
  const { data: procedures = [] } = useQuery({
    queryKey: ['procedures'],
    queryFn: async () => (await supabase.from('procedures').select('id, name, base_price').order('name')).data ?? [],
  });

  const subtotal = items.reduce((acc, i) => acc + Number(i.quantity || 0) * Number(i.unit_price || 0), 0);
  const total = Math.max(subtotal - Number(discount || 0), 0);

  const updateItem = (index: number, patch: Partial<Item>) =>
    setItems(items.map((it, i) => (i === index ? { ...it, ...patch } : it)));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.company_id) return;
    const { data, error } = await supabase.from('sales').insert({
      company_id: profile.company_id,
      client_id: clientId || null,
      sold_at: new Date(soldAt).toISOString(),
      total_amount: total,
      discount: Number(discount || 0),
      payment_method: method,
      status,
      created_by: user?.id ?? null,
    } as never).select('id').single();

    if (error) { toast.error(error.message); return; }

    const validItems = items.filter((i) => i.procedure_id);
    if (validItems.length) {
      await supabase.from('sale_items').insert(
        validItems.map((i) => ({
          company_id: profile.company_id,
          sale_id: data.id,
          procedure_id: i.procedure_id,
          quantity: Number(i.quantity || 1),
          unit_price: Number(i.unit_price || 0),
        })) as never,
      );
    }
    if (clientId) {
      await supabase.from('clients').update({ last_visit_at: new Date(soldAt).toISOString() } as never).eq('id', clientId);
    }

    toast.success('Venda registrada.');
    qc.invalidateQueries({ queryKey: ['sales'] });
    setOpen(false);
    setItems([{ procedure_id: '', quantity: '1', unit_price: '0' }]);
    setDiscount('0');
    setClientId('');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Vendas</h1>
          <p className="text-sm text-muted-foreground">Atendimentos faturados</p>
        </div>
        <Button className="gap-2" onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Nova venda</Button>
      </div>

      <Card>
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="hidden md:table-cell">Pagamento</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="text-sm">{shortDate(s.sold_at)}</TableCell>
                  <TableCell className="text-sm font-medium">{clients.find((c) => c.id === s.client_id)?.name ?? '—'}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{s.payment_method ?? '—'}</TableCell>
                  <TableCell className="text-sm font-medium">{brl(s.total_amount)}</TableCell>
                  <TableCell><Badge variant="secondary">{SALE_LABEL[s.status]}</Badge></TableCell>
                </TableRow>
              ))}
              {!sales.length && (
                <TableRow><TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">Nenhuma venda registrada.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="crm max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader><DialogTitle>Nova venda</DialogTitle></DialogHeader>
          <form onSubmit={save} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Cliente</Label>
                <Select value={clientId} onValueChange={setClientId}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>{clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Data</Label>
                <Input type="datetime-local" value={soldAt} onChange={(e) => setSoldAt(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Itens</Label>
              {items.map((item, index) => (
                <div key={index} className="flex items-end gap-2">
                  <div className="flex-1">
                    <Select
                      value={item.procedure_id}
                      onValueChange={(v) => {
                        const p = procedures.find((x) => x.id === v);
                        updateItem(index, { procedure_id: v, unit_price: String(p?.base_price ?? 0) });
                      }}
                    >
                      <SelectTrigger><SelectValue placeholder="Procedimento" /></SelectTrigger>
                      <SelectContent>{procedures.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <Input className="w-16" type="number" min="1" value={item.quantity} onChange={(e) => updateItem(index, { quantity: e.target.value })} />
                  <Input className="w-24" type="number" step="0.01" value={item.unit_price} onChange={(e) => updateItem(index, { unit_price: e.target.value })} />
                  <Button type="button" size="icon" variant="ghost" onClick={() => setItems(items.filter((_, i) => i !== index))}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => setItems([...items, { procedure_id: '', quantity: '1', unit_price: '0' }])}>
                Adicionar item
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label>Desconto</Label>
                <Input type="number" step="0.01" value={discount} onChange={(e) => setDiscount(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Pagamento</Label>
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{PAYMENT_METHODS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{SALE_STATUS.map((s) => <SelectItem key={s} value={s}>{SALE_LABEL[s]}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-md bg-muted p-3 text-sm">
              <span>Total</span>
              <span className="text-base font-semibold">{brl(total)}</span>
            </div>

            <Button type="submit" className="w-full">Registrar venda</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sales;
