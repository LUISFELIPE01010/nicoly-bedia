import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, MessageCircle, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { dateTime, LEAD_STATUS, LEAD_STATUS_LABEL, LEAD_STATUS_CLASS, whatsappLink } from '@/lib/crm';

type Lead = {
  id: string; name: string; phone: string | null; email: string | null;
  procedure_id: string | null; message: string | null; notes: string | null;
  status: string; created_at: string;
};

const emptyForm = { name: '', phone: '', email: '', procedure_id: '', message: '', notes: '', status: 'novo' };

const Leads = () => {
  const { profile } = useAuth();
  const qc = useQueryClient();
  const [params, setParams] = useSearchParams();
  const statusFilter = params.get('status') ?? 'todos';
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const { data: leads = [] } = useQuery({
    queryKey: ['leads'],
    queryFn: async () =>
      ((await supabase.from('leads').select('*').order('created_at', { ascending: false })).data ?? []) as Lead[],
  });
  const { data: procedures = [] } = useQuery({
    queryKey: ['procedures'],
    queryFn: async () => (await supabase.from('procedures').select('id, name').order('name')).data ?? [],
  });

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return leads.filter((l) => {
      if (statusFilter !== 'todos' && l.status !== statusFilter) return false;
      if (!term) return true;
      return [l.name, l.phone, l.email].some((v) => (v ?? '').toLowerCase().includes(term));
    });
  }, [leads, search, statusFilter]);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.company_id) return;
    if (form.name.trim().length < 2) { toast.error('Informe o nome.'); return; }
    const { error } = await supabase.from('leads').insert({
      company_id: profile.company_id,
      name: form.name.trim(),
      phone: form.phone.trim() || null,
      email: form.email.trim() || null,
      procedure_id: form.procedure_id || null,
      message: form.message.trim() || null,
      notes: form.notes.trim() || null,
      status: form.status,
      origin: 'manual',
    } as never);
    if (error) { toast.error(error.message); return; }
    toast.success('Lead criado.');
    qc.invalidateQueries({ queryKey: ['leads'] });
    setForm(emptyForm);
    setOpen(false);
  };

  const removeLead = async (lead: Lead) => {
    if (!window.confirm(`Excluir o lead "${lead.name}"? Esta ação não pode ser desfeita.`)) return;
    const { error } = await supabase.from('leads').delete().eq('id', lead.id);
    if (error) { toast.error(error.message); return; }
    toast.success('Lead excluído.');
    qc.invalidateQueries({ queryKey: ['leads'] });
  };

  const setStatus = (value: string) => {
    if (value === 'todos') params.delete('status');
    else params.set('status', value);
    setParams(params, { replace: true });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Leads</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} contato(s)</p>
        </div>
        <Button className="gap-2" onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Novo lead</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="relative min-w-[220px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Buscar por nome, WhatsApp ou e-mail" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatus}>
          <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os status</SelectItem>
            {LEAD_STATUS.map((s) => <SelectItem key={s} value={s}>{LEAD_STATUS_LABEL[s]}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 && <p className="px-5 py-10 text-center text-sm text-muted-foreground">Nenhum lead encontrado.</p>}
          <ul className="divide-y divide-border">
            {filtered.map((l) => {
              const wa = whatsappLink(l.phone, `Olá ${l.name.split(' ')[0]}, tudo bem?`);
              return (
                <li key={l.id} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50">
                  <Link to={`/admin/leads/${l.id}`} className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{l.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {l.phone || 'sem WhatsApp'} · {procedures.find((p) => p.id === l.procedure_id)?.name ?? 'Sem procedimento'} · {dateTime(l.created_at)}
                    </p>
                  </Link>
                  <Badge variant="secondary" className={LEAD_STATUS_CLASS[l.status]}>{LEAD_STATUS_LABEL[l.status] ?? l.status}</Badge>
                  {wa && (
                    <a href={wa} target="_blank" rel="noopener noreferrer" aria-label={`Abrir WhatsApp de ${l.name}`}>
                      <Button size="icon" variant="outline" className="h-8 w-8"><MessageCircle className="h-4 w-4" /></Button>
                    </a>
                  )}
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                    aria-label={`Excluir ${l.name}`}
                    onClick={() => removeLead(l)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="crm">
          <DialogHeader><DialogTitle>Novo lead</DialogTitle></DialogHeader>
          <form onSubmit={create} className="space-y-3">
            <div className="space-y-1.5">
              <Label>Nome</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>WhatsApp</Label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(13) 99999-9999" />
              </div>
              <div className="space-y-1.5">
                <Label>E-mail (opcional)</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Procedimento</Label>
                <Select value={form.procedure_id} onValueChange={(v) => setForm({ ...form, procedure_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>{procedures.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{LEAD_STATUS.map((s) => <SelectItem key={s} value={s}>{LEAD_STATUS_LABEL[s]}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Observações</Label>
              <Textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
            <Button type="submit" className="w-full">Salvar</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Leads;
