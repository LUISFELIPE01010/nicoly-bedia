import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { brl, dateTime, shortDate, APPOINTMENT_LABEL } from '@/lib/crm';

type Client = {
  id: string; name: string; phone: string | null; email: string | null; birth_date: string | null;
  address: string | null; notes: string | null; last_visit_at: string | null; created_at: string;
};

const emptyClient = { name: '', phone: '', email: '', birth_date: '', address: '', notes: '' };

const Clients = () => {
  const { profile } = useAuth();
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [form, setForm] = useState({ ...emptyClient });

  const { data: clients = [] } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => ((await supabase.from('clients').select('*').order('name')).data ?? []) as Client[],
  });
  const { data: history } = useQuery({
    queryKey: ['client_history', editing?.id],
    enabled: !!editing?.id,
    queryFn: async () => {
      const [appts, sales, inter] = await Promise.all([
        supabase.from('appointments').select('id, starts_at, status, procedures(name)').eq('client_id', editing!.id).order('starts_at', { ascending: false }),
        supabase.from('sales').select('id, sold_at, total_amount, status').eq('client_id', editing!.id).order('sold_at', { ascending: false }),
        supabase.from('interactions').select('id, type, content, created_at').eq('client_id', editing!.id).order('created_at', { ascending: false }),
      ]);
      return { appts: appts.data ?? [], sales: sales.data ?? [], inter: inter.data ?? [] };
    },
  });

  const filtered = clients.filter((c) => {
    const t = search.toLowerCase();
    return !t || c.name.toLowerCase().includes(t) || (c.phone ?? '').includes(t) || (c.email ?? '').toLowerCase().includes(t);
  });

  const openNew = () => { setEditing(null); setForm({ ...emptyClient }); setOpen(true); };
  const openEdit = (c: Client) => {
    setEditing(c);
    setForm({
      name: c.name, phone: c.phone ?? '', email: c.email ?? '', birth_date: c.birth_date ?? '',
      address: c.address ?? '', notes: c.notes ?? '',
    });
    setOpen(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.company_id) return;
    const payload = {
      company_id: profile.company_id,
      name: form.name.trim(),
      phone: form.phone.trim() || null,
      email: form.email.trim() || null,
      birth_date: form.birth_date || null,
      address: form.address.trim() || null,
      notes: form.notes.trim() || null,
    };
    const { error } = editing
      ? await supabase.from('clients').update(payload as never).eq('id', editing.id)
      : await supabase.from('clients').insert(payload as never);
    if (error) { toast.error(error.message); return; }
    toast.success(editing ? 'Cliente atualizado.' : 'Cliente criado.');
    qc.invalidateQueries({ queryKey: ['clients'] });
    setOpen(false);
  };

  const totalSpent = (history?.sales ?? []).reduce((acc, s) => acc + Number(s.total_amount), 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Clientes</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} cliente(s)</p>
        </div>
        <Button className="gap-2" onClick={openNew}><Plus className="h-4 w-4" /> Novo cliente</Button>
      </div>

      <Card>
        <CardContent className="p-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-8" placeholder="Buscar cliente" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Telefone</TableHead>
                <TableHead className="hidden lg:table-cell">E-mail</TableHead>
                <TableHead className="hidden sm:table-cell">Última visita</TableHead>
                <TableHead className="hidden sm:table-cell">Cadastro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id} className="cursor-pointer" onClick={() => openEdit(c)}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{c.phone ?? '—'}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{c.email ?? '—'}</TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">{shortDate(c.last_visit_at)}</TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{shortDate(c.created_at)}</TableCell>
                </TableRow>
              ))}
              {!filtered.length && (
                <TableRow><TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">Nenhum cliente encontrado.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="crm w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader><SheetTitle>{editing ? editing.name : 'Novo cliente'}</SheetTitle></SheetHeader>
          <form onSubmit={save} className="mt-4 space-y-3">
            <div className="space-y-1.5">
              <Label>Nome</Label>
              <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Telefone</Label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Nascimento</Label>
                <Input type="date" value={form.birth_date} onChange={(e) => setForm({ ...form, birth_date: e.target.value })} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>E-mail</Label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Endereço</Label>
              <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Observações</Label>
              <Textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
            <Button type="submit">Salvar</Button>
          </form>

          {editing && history && (
            <div className="mt-6 space-y-4 border-t border-border pt-4">
              <p className="text-sm">Total gasto: <span className="font-semibold">{brl(totalSpent)}</span></p>
              <div>
                <h3 className="mb-2 text-sm font-semibold">Atendimentos</h3>
                <ul className="space-y-1.5">
                  {history.appts.map((a) => (
                    <li key={a.id} className="flex items-center justify-between rounded-md border border-border p-2 text-sm">
                      <span>{(a as { procedures?: { name: string } | null }).procedures?.name ?? 'Procedimento'}</span>
                      <span className="flex items-center gap-2 text-xs text-muted-foreground">
                        {dateTime(a.starts_at)} <Badge variant="secondary" className="text-[10px]">{APPOINTMENT_LABEL[a.status]}</Badge>
                      </span>
                    </li>
                  ))}
                  {!history.appts.length && <li className="text-sm text-muted-foreground">Nenhum atendimento.</li>}
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">Vendas</h3>
                <ul className="space-y-1.5">
                  {history.sales.map((s) => (
                    <li key={s.id} className="flex items-center justify-between rounded-md border border-border p-2 text-sm">
                      <span>{shortDate(s.sold_at)}</span>
                      <span className="font-medium">{brl(s.total_amount)}</span>
                    </li>
                  ))}
                  {!history.sales.length && <li className="text-sm text-muted-foreground">Nenhuma venda.</li>}
                </ul>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Clients;
