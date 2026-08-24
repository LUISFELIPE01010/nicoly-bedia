import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, Phone, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import {
  LEAD_STATUS, LEAD_STATUS_LABEL, TEMPERATURES, TEMPERATURE_LABEL, INTERACTION_TYPES, INTERACTION_LABEL,
  brl, dateTime, shortDate, toLocalInput,
} from '@/lib/crm';

type Lead = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  status: string;
  temperature: string;
  source_id: string | null;
  procedure_id: string | null;
  notes: string | null;
  estimated_value: number | null;
  next_followup_at: string | null;
  created_at: string;
};

const emptyLead = {
  name: '', phone: '', email: '', status: 'novo', temperature: 'morno',
  source_id: '', procedure_id: '', notes: '', estimated_value: '', next_followup_at: '',
};

const Leads = () => {
  const { profile, user } = useAuth();
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [sourceFilter, setSourceFilter] = useState('todas');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Lead | null>(null);
  const [form, setForm] = useState({ ...emptyLead });
  const [interactionType, setInteractionType] = useState('mensagem');
  const [interactionText, setInteractionText] = useState('');

  const { data: sources = [] } = useQuery({
    queryKey: ['lead_sources'],
    queryFn: async () => (await supabase.from('lead_sources').select('id, name').order('name')).data ?? [],
  });
  const { data: procedures = [] } = useQuery({
    queryKey: ['procedures'],
    queryFn: async () => (await supabase.from('procedures').select('id, name, base_price').order('name')).data ?? [],
  });
  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => ((await supabase.from('leads').select('*').order('created_at', { ascending: false })).data ?? []) as Lead[],
  });
  const { data: interactions = [] } = useQuery({
    queryKey: ['interactions', editing?.id],
    enabled: !!editing?.id,
    queryFn: async () =>
      (await supabase.from('interactions').select('*').eq('lead_id', editing!.id).order('created_at', { ascending: false })).data ?? [],
  });

  const filtered = leads.filter((l) => {
    const term = search.toLowerCase();
    const matchTerm = !term || l.name.toLowerCase().includes(term) || (l.phone ?? '').includes(term) || (l.email ?? '').toLowerCase().includes(term);
    const matchStatus = statusFilter === 'todos' || l.status === statusFilter;
    const matchSource = sourceFilter === 'todas' || l.source_id === sourceFilter;
    return matchTerm && matchStatus && matchSource;
  });

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyLead });
    setOpen(true);
  };

  const openEdit = (lead: Lead) => {
    setEditing(lead);
    setForm({
      name: lead.name,
      phone: lead.phone ?? '',
      email: lead.email ?? '',
      status: lead.status,
      temperature: lead.temperature,
      source_id: lead.source_id ?? '',
      procedure_id: lead.procedure_id ?? '',
      notes: lead.notes ?? '',
      estimated_value: lead.estimated_value != null ? String(lead.estimated_value) : '',
      next_followup_at: lead.next_followup_at ? toLocalInput(lead.next_followup_at) : '',
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
      status: form.status as Lead['status'],
      temperature: form.temperature,
      source_id: form.source_id || null,
      procedure_id: form.procedure_id || null,
      notes: form.notes.trim() || null,
      estimated_value: form.estimated_value ? Number(form.estimated_value) : null,
      next_followup_at: form.next_followup_at ? new Date(form.next_followup_at).toISOString() : null,
      owner_id: user?.id ?? null,
    };

    const { error } = editing
      ? await supabase.from('leads').update(payload as never).eq('id', editing.id)
      : await supabase.from('leads').insert(payload as never);

    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(editing ? 'Lead atualizado.' : 'Lead criado.');
    qc.invalidateQueries({ queryKey: ['leads'] });
    setOpen(false);
  };

  const addInteraction = async () => {
    if (!editing || !interactionText.trim() || !profile?.company_id) return;
    const { error } = await supabase.from('interactions').insert({
      company_id: profile.company_id,
      lead_id: editing.id,
      type: interactionType,
      content: interactionText.trim(),
      created_by: user?.id ?? null,
    } as never);
    if (error) {
      toast.error(error.message);
      return;
    }
    setInteractionText('');
    qc.invalidateQueries({ queryKey: ['interactions', editing.id] });
  };

  const convertToClient = async () => {
    if (!editing || !profile?.company_id) return;
    const { data, error } = await supabase
      .from('clients')
      .insert({
        company_id: profile.company_id,
        lead_id: editing.id,
        name: editing.name,
        phone: editing.phone,
        email: editing.email,
      } as never)
      .select('id')
      .single();
    if (error) {
      toast.error(error.message);
      return;
    }
    await supabase.from('leads').update({ status: 'cliente', converted_client_id: data.id } as never).eq('id', editing.id);
    toast.success('Lead convertido em cliente.');
    qc.invalidateQueries({ queryKey: ['leads'] });
    qc.invalidateQueries({ queryKey: ['clients'] });
    setOpen(false);
  };

  const removeLead = async () => {
    if (!editing) return;
    const { error } = await supabase.from('leads').delete().eq('id', editing.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Lead excluído.');
    qc.invalidateQueries({ queryKey: ['leads'] });
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Leads</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} registro(s)</p>
        </div>
        <Button onClick={openNew} className="gap-2"><Plus className="h-4 w-4" /> Novo lead</Button>
      </div>

      <Card>
        <CardContent className="flex flex-wrap gap-2 p-3">
          <div className="relative min-w-[200px] flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-8" placeholder="Buscar por nome, telefone ou e-mail" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-44"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os status</SelectItem>
              {LEAD_STATUS.map((s) => <SelectItem key={s} value={s}>{LEAD_STATUS_LABEL[s]}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-44"><SelectValue placeholder="Origem" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as origens</SelectItem>
              {sources.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Contato</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Origem</TableHead>
                <TableHead className="hidden lg:table-cell">Valor</TableHead>
                <TableHead className="hidden sm:table-cell">Criado</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && <TableRow><TableCell colSpan={7} className="py-8 text-center text-sm text-muted-foreground">Carregando…</TableCell></TableRow>}
              {!isLoading && !filtered.length && (
                <TableRow><TableCell colSpan={7} className="py-8 text-center text-sm text-muted-foreground">Nenhum lead encontrado.</TableCell></TableRow>
              )}
              {filtered.map((lead) => (
                <TableRow key={lead.id} className="cursor-pointer" onClick={() => openEdit(lead)}>
                  <TableCell>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-xs text-muted-foreground">{TEMPERATURE_LABEL[lead.temperature]}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{lead.phone || lead.email || '—'}</TableCell>
                  <TableCell><Badge variant="secondary">{LEAD_STATUS_LABEL[lead.status]}</Badge></TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {sources.find((s) => s.id === lead.source_id)?.name ?? '—'}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm">{lead.estimated_value ? brl(lead.estimated_value) : '—'}</TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{shortDate(lead.created_at)}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    {lead.phone && (
                      <a href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                        <Button size="icon" variant="ghost"><Phone className="h-4 w-4" /></Button>
                      </a>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="crm w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader><SheetTitle>{editing ? 'Editar lead' : 'Novo lead'}</SheetTitle></SheetHeader>
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
                <Label>E-mail</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{LEAD_STATUS.map((s) => <SelectItem key={s} value={s}>{LEAD_STATUS_LABEL[s]}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Temperatura</Label>
                <Select value={form.temperature} onValueChange={(v) => setForm({ ...form, temperature: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{TEMPERATURES.map((t) => <SelectItem key={t} value={t}>{TEMPERATURE_LABEL[t]}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Origem</Label>
                <Select value={form.source_id || 'none'} onValueChange={(v) => setForm({ ...form, source_id: v === 'none' ? '' : v })}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sem origem</SelectItem>
                    {sources.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Procedimento</Label>
                <Select value={form.procedure_id || 'none'} onValueChange={(v) => setForm({ ...form, procedure_id: v === 'none' ? '' : v })}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Não definido</SelectItem>
                    {procedures.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Valor estimado</Label>
                <Input type="number" step="0.01" value={form.estimated_value} onChange={(e) => setForm({ ...form, estimated_value: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Próximo follow-up</Label>
                <Input type="datetime-local" value={form.next_followup_at} onChange={(e) => setForm({ ...form, next_followup_at: e.target.value })} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Observações</Label>
              <Textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="submit">Salvar</Button>
              {editing && <Button type="button" variant="secondary" onClick={convertToClient}>Converter em cliente</Button>}
              {editing && <Button type="button" variant="ghost" className="text-destructive" onClick={removeLead}>Excluir</Button>}
            </div>
          </form>

          {editing && (
            <div className="mt-6 border-t border-border pt-4">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold"><MessageSquare className="h-4 w-4" /> Histórico</h3>
              <div className="flex gap-2">
                <Select value={interactionType} onValueChange={setInteractionType}>
                  <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                  <SelectContent>{INTERACTION_TYPES.map((t) => <SelectItem key={t} value={t}>{INTERACTION_LABEL[t]}</SelectItem>)}</SelectContent>
                </Select>
                <Input placeholder="Registrar contato…" value={interactionText} onChange={(e) => setInteractionText(e.target.value)} />
                <Button type="button" onClick={addInteraction}>Add</Button>
              </div>
              <ul className="mt-3 space-y-2">
                {interactions.map((i) => (
                  <li key={i.id} className="rounded-md border border-border p-2 text-sm">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{INTERACTION_LABEL[i.type]}</span>
                      <span>{dateTime(i.created_at)}</span>
                    </div>
                    <p>{i.content}</p>
                  </li>
                ))}
                {!interactions.length && <li className="text-sm text-muted-foreground">Nenhuma interação registrada.</li>}
              </ul>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Leads;
