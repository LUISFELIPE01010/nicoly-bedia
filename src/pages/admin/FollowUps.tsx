import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Check, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { dateTime, toLocalInput, FOLLOWUP_LABEL } from '@/lib/crm';

type FollowUp = {
  id: string; lead_id: string | null; client_id: string | null; scheduled_for: string;
  channel: string; status: string; note: string | null;
};

const FollowUps = () => {
  const { profile, user } = useAuth();
  const qc = useQueryClient();
  const [tab, setTab] = useState('pendentes');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ lead_id: '', scheduled_for: toLocalInput(), channel: 'whatsapp', note: '' });

  const { data: items = [] } = useQuery({
    queryKey: ['follow_ups'],
    queryFn: async () => ((await supabase.from('follow_ups').select('*').order('scheduled_for')).data ?? []) as FollowUp[],
  });
  const { data: leads = [] } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => (await supabase.from('leads').select('id, name').order('name')).data ?? [],
  });
  const { data: clients = [] } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => (await supabase.from('clients').select('id, name').order('name')).data ?? [],
  });

  const nameFor = (f: FollowUp) =>
    leads.find((l) => l.id === f.lead_id)?.name ?? clients.find((c) => c.id === f.client_id)?.name ?? 'Contato';

  const now = new Date();
  const todayEnd = new Date(now); todayEnd.setHours(23, 59, 59, 999);

  const filtered = items.filter((f) => {
    if (tab === 'concluidos') return f.status === 'concluido';
    if (f.status !== 'pendente') return false;
    if (tab === 'atrasados') return new Date(f.scheduled_for) < now;
    if (tab === 'hoje') return new Date(f.scheduled_for) >= now && new Date(f.scheduled_for) <= todayEnd;
    return true;
  });

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.company_id) return;
    const { error } = await supabase.from('follow_ups').insert({
      company_id: profile.company_id,
      lead_id: form.lead_id || null,
      scheduled_for: new Date(form.scheduled_for).toISOString(),
      channel: form.channel,
      note: form.note.trim() || null,
      assigned_to: user?.id ?? null,
    } as never);
    if (error) { toast.error(error.message); return; }
    toast.success('Follow-up agendado.');
    qc.invalidateQueries({ queryKey: ['follow_ups'] });
    setOpen(false);
    setForm({ lead_id: '', scheduled_for: toLocalInput(), channel: 'whatsapp', note: '' });
  };

  const complete = async (id: string) => {
    const { error } = await supabase.from('follow_ups').update({ status: 'concluido', completed_at: new Date().toISOString() } as never).eq('id', id);
    if (error) { toast.error(error.message); return; }
    qc.invalidateQueries({ queryKey: ['follow_ups'] });
  };

  const snooze = async (f: FollowUp) => {
    const next = new Date(f.scheduled_for);
    next.setDate(next.getDate() + 3);
    const { error } = await supabase.from('follow_ups').update({ scheduled_for: next.toISOString() } as never).eq('id', f.id);
    if (error) { toast.error(error.message); return; }
    qc.invalidateQueries({ queryKey: ['follow_ups'] });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Follow-ups</h1>
          <p className="text-sm text-muted-foreground">Retornos programados com leads e clientes</p>
        </div>
        <Button className="gap-2" onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Novo follow-up</Button>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
          <TabsTrigger value="atrasados">Atrasados</TabsTrigger>
          <TabsTrigger value="hoje">Hoje</TabsTrigger>
          <TabsTrigger value="concluidos">Concluídos</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">{filtered.length} registro(s)</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {filtered.map((f) => {
            const late = f.status === 'pendente' && new Date(f.scheduled_for) < now;
            return (
              <div key={f.id} className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border p-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{nameFor(f)}</p>
                  <p className="text-xs text-muted-foreground">{dateTime(f.scheduled_for)} · {f.channel}</p>
                  {f.note && <p className="mt-1 text-sm">{f.note}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={late ? 'destructive' : 'secondary'}>{late ? 'Atrasado' : FOLLOWUP_LABEL[f.status]}</Badge>
                  {f.status === 'pendente' && (
                    <>
                      <Button size="sm" variant="outline" className="gap-1" onClick={() => snooze(f)}><Clock className="h-3.5 w-3.5" /> +3d</Button>
                      <Button size="sm" className="gap-1" onClick={() => complete(f.id)}><Check className="h-3.5 w-3.5" /> Feito</Button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
          {!filtered.length && <p className="py-6 text-center text-sm text-muted-foreground">Nada por aqui.</p>}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="crm">
          <DialogHeader><DialogTitle>Novo follow-up</DialogTitle></DialogHeader>
          <form onSubmit={create} className="space-y-3">
            <div className="space-y-1.5">
              <Label>Lead</Label>
              <Select value={form.lead_id} onValueChange={(v) => setForm({ ...form, lead_id: v })}>
                <SelectTrigger><SelectValue placeholder="Selecione o lead" /></SelectTrigger>
                <SelectContent>{leads.map((l) => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Data e hora</Label>
                <Input type="datetime-local" value={form.scheduled_for} onChange={(e) => setForm({ ...form, scheduled_for: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Canal</Label>
                <Select value={form.channel} onValueChange={(v) => setForm({ ...form, channel: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="ligacao">Ligação</SelectItem>
                    <SelectItem value="email">E-mail</SelectItem>
                    <SelectItem value="presencial">Presencial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Nota</Label>
              <Textarea rows={3} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
            </div>
            <Button type="submit" className="w-full">Agendar</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FollowUps;
