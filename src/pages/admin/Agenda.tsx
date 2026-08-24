import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
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
import { APPOINTMENT_STATUS, APPOINTMENT_LABEL, addDays, startOfDay, timeOnly, toLocalInput } from '@/lib/crm';

type Appointment = {
  id: string; client_id: string | null; lead_id: string | null; procedure_id: string | null;
  starts_at: string; ends_at: string; status: string; notes: string | null;
};

const Agenda = () => {
  const { profile } = useAuth();
  const qc = useQueryClient();
  const [weekStart, setWeekStart] = useState(() => {
    const d = startOfDay(new Date());
    return addDays(d, -((d.getDay() + 6) % 7));
  });
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    client_id: '', procedure_id: '', starts_at: toLocalInput(), duration: '60', notes: '', status: 'agendado',
  });

  const weekEnd = addDays(weekStart, 7);

  const { data: appointments = [] } = useQuery({
    queryKey: ['appointments', weekStart.toISOString()],
    queryFn: async () =>
      ((await supabase.from('appointments').select('*')
        .gte('starts_at', weekStart.toISOString())
        .lt('starts_at', weekEnd.toISOString())
        .order('starts_at')).data ?? []) as Appointment[],
  });
  const { data: clients = [] } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => (await supabase.from('clients').select('id, name').order('name')).data ?? [],
  });
  const { data: procedures = [] } = useQuery({
    queryKey: ['procedures'],
    queryFn: async () => (await supabase.from('procedures').select('id, name, duration_minutes').order('name')).data ?? [],
  });

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.company_id) return;
    const start = new Date(form.starts_at);
    const end = new Date(start.getTime() + Number(form.duration) * 60000);
    const { error } = await supabase.from('appointments').insert({
      company_id: profile.company_id,
      client_id: form.client_id || null,
      procedure_id: form.procedure_id || null,
      starts_at: start.toISOString(),
      ends_at: end.toISOString(),
      status: form.status,
      notes: form.notes.trim() || null,
    } as never);
    if (error) { toast.error(error.message); return; }
    toast.success('Agendamento criado.');
    qc.invalidateQueries({ queryKey: ['appointments'] });
    setOpen(false);
  };

  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('appointments').update({ status } as never).eq('id', id);
    if (error) { toast.error(error.message); return; }
    qc.invalidateQueries({ queryKey: ['appointments'] });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Agenda</h1>
          <p className="text-sm text-muted-foreground">
            {weekStart.toLocaleDateString('pt-BR')} — {addDays(weekStart, 6).toLocaleDateString('pt-BR')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline" onClick={() => setWeekStart(addDays(weekStart, -7))}><ChevronLeft className="h-4 w-4" /></Button>
          <Button size="icon" variant="outline" onClick={() => setWeekStart(addDays(weekStart, 7))}><ChevronRight className="h-4 w-4" /></Button>
          <Button className="gap-2" onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Agendar</Button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {days.map((day) => {
          const dayItems = appointments.filter((a) => startOfDay(new Date(a.starts_at)).getTime() === day.getTime());
          const isToday = day.getTime() === startOfDay(new Date()).getTime();
          return (
            <Card key={day.toISOString()} className={isToday ? 'border-primary' : undefined}>
              <CardContent className="space-y-2 p-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium capitalize">{day.toLocaleDateString('pt-BR', { weekday: 'short' })}</span>
                  <span className="text-xs text-muted-foreground">{day.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</span>
                </div>
                {dayItems.map((a) => (
                  <div key={a.id} className="rounded-md border border-border p-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-medium">{timeOnly(a.starts_at)}</span>
                      <Badge variant="secondary" className="text-[10px]">{APPOINTMENT_LABEL[a.status]}</Badge>
                    </div>
                    <p className="truncate text-sm">{clients.find((c) => c.id === a.client_id)?.name ?? 'Sem cliente'}</p>
                    <p className="truncate text-xs text-muted-foreground">{procedures.find((p) => p.id === a.procedure_id)?.name ?? '—'}</p>
                    <Select value={a.status} onValueChange={(v) => setStatus(a.id, v)}>
                      <SelectTrigger className="mt-1 h-7 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {APPOINTMENT_STATUS.map((s) => <SelectItem key={s} value={s}>{APPOINTMENT_LABEL[s]}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
                {!dayItems.length && <p className="py-3 text-center text-xs text-muted-foreground">Livre</p>}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="crm">
          <DialogHeader><DialogTitle>Novo agendamento</DialogTitle></DialogHeader>
          <form onSubmit={create} className="space-y-3">
            <div className="space-y-1.5">
              <Label>Cliente</Label>
              <Select value={form.client_id} onValueChange={(v) => setForm({ ...form, client_id: v })}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>{clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Procedimento</Label>
              <Select
                value={form.procedure_id}
                onValueChange={(v) => {
                  const p = procedures.find((x) => x.id === v);
                  setForm({ ...form, procedure_id: v, duration: String(p?.duration_minutes ?? 60) });
                }}
              >
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>{procedures.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Início</Label>
                <Input type="datetime-local" value={form.starts_at} onChange={(e) => setForm({ ...form, starts_at: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Duração (min)</Label>
                <Input type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Observações</Label>
              <Textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
            <Button type="submit" className="w-full">Salvar</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Agenda;
