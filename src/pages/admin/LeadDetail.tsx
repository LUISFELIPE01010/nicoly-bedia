import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, MessageCircle, Mail, Phone, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { dateTime, LEAD_STATUS, LEAD_STATUS_LABEL, LEAD_STATUS_CLASS, whatsappLink } from '@/lib/crm';

type Lead = {
  id: string; name: string; phone: string | null; email: string | null; procedure_id: string | null;
  message: string | null; notes: string | null; status: string; origin: string | null; created_at: string;
};
type History = { id: string; from_status: string | null; to_status: string; created_at: string };

const LeadDetail = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const { data: lead, isLoading } = useQuery({
    queryKey: ['lead', id],
    queryFn: async () => (await supabase.from('leads').select('*').eq('id', id).maybeSingle()).data as Lead | null,
  });
  const { data: history = [] } = useQuery({
    queryKey: ['lead-history', id],
    queryFn: async () =>
      ((await supabase.from('lead_status_history').select('id, from_status, to_status, created_at')
        .eq('lead_id', id).order('created_at', { ascending: false })).data ?? []) as History[],
  });
  const { data: procedures = [] } = useQuery({
    queryKey: ['procedures'],
    queryFn: async () => (await supabase.from('procedures').select('id, name')).data ?? [],
  });

  useEffect(() => { setNotes(lead?.notes ?? ''); }, [lead?.id, lead?.notes]);

  if (isLoading) return <p className="text-sm text-muted-foreground">Carregando…</p>;
  if (!lead) return <p className="text-sm text-muted-foreground">Lead não encontrado.</p>;

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ['lead', id] });
    qc.invalidateQueries({ queryKey: ['lead-history', id] });
    qc.invalidateQueries({ queryKey: ['leads'] });
  };

  const changeStatus = async (status: string) => {
    const { error } = await supabase.from('leads').update({ status } as never).eq('id', id);
    if (error) { toast.error(error.message); return; }
    toast.success('Status atualizado.');
    refresh();
  };

  const saveNotes = async () => {
    setSaving(true);
    const { error } = await supabase.from('leads').update({ notes: notes.trim() || null } as never).eq('id', id);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success('Observações salvas.');
    refresh();
  };

  const wa = whatsappLink(lead.phone, `Olá ${lead.name.split(' ')[0]}, tudo bem? Aqui é da clínica.`);
  const procedure = procedures.find((p) => p.id === lead.procedure_id)?.name;

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Button variant="ghost" size="sm" className="gap-2 px-2" onClick={() => navigate('/admin/leads')}>
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Button>

      <Card>
        <CardContent className="space-y-4 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold">{lead.name}</h1>
              <p className="text-sm text-muted-foreground">
                Entrou em {dateTime(lead.created_at)} · {lead.origin === 'site' ? 'Formulário do site' : 'Cadastro manual'}
              </p>
            </div>
            <Badge variant="secondary" className={LEAD_STATUS_CLASS[lead.status]}>{LEAD_STATUS_LABEL[lead.status] ?? lead.status}</Badge>
          </div>

          <div className="grid gap-2 text-sm sm:grid-cols-2">
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" />{lead.phone || '—'}</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" />{lead.email || '—'}</p>
            <p className="sm:col-span-2"><span className="text-muted-foreground">Procedimento de interesse: </span>{procedure ?? '—'}</p>
          </div>

          {lead.message && (
            <div className="rounded-md bg-muted p-3 text-sm">
              <p className="mb-1 text-xs font-medium text-muted-foreground">Mensagem do formulário</p>
              {lead.message}
            </div>
          )}

          <div className="flex flex-wrap items-end gap-3">
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={lead.status} onValueChange={changeStatus}>
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>{LEAD_STATUS.map((s) => <SelectItem key={s} value={s}>{LEAD_STATUS_LABEL[s]}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer">
                <Button className="gap-2"><MessageCircle className="h-4 w-4" /> Abrir WhatsApp</Button>
              </a>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-3 p-5">
          <Label>Observações</Label>
          <Textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anote o que for importante sobre este contato" />
          <Button size="sm" onClick={saveNotes} disabled={saving}>{saving ? 'Salvando…' : 'Salvar observações'}</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <p className="mb-3 text-sm font-medium">Histórico de status</p>
          {history.length === 0 && <p className="text-sm text-muted-foreground">Sem alterações registradas.</p>}
          <ul className="space-y-2">
            {history.map((h) => (
              <li key={h.id} className="flex items-center gap-2 text-sm">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span>
                  {h.from_status ? `${LEAD_STATUS_LABEL[h.from_status] ?? h.from_status} → ` : 'Criado como '}
                  <strong>{LEAD_STATUS_LABEL[h.to_status] ?? h.to_status}</strong>
                </span>
                <span className="text-xs text-muted-foreground">{dateTime(h.created_at)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground">
        <Link to="/admin" className="underline">Voltar à visão geral</Link>
      </p>
    </div>
  );
};

export default LeadDetail;
