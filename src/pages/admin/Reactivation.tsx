import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { HeartHandshake, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { addDays, shortDate } from '@/lib/crm';

const Reactivation = () => {
  const { profile, user } = useAuth();
  const qc = useQueryClient();
  const [days, setDays] = useState('90');

  const cutoff = addDays(new Date(), -Number(days));

  const { data: clients = [] } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => (await supabase.from('clients').select('id, name, phone, last_visit_at, created_at').order('name')).data ?? [],
  });
  const { data: lostLeads = [] } = useQuery({
    queryKey: ['lost_leads'],
    queryFn: async () =>
      (await supabase.from('leads').select('id, name, phone, updated_at').eq('status', 'perdido').order('updated_at', { ascending: false })).data ?? [],
  });

  const inactive = clients.filter((c) => {
    const ref = c.last_visit_at ?? c.created_at;
    return new Date(ref) < cutoff;
  });

  const scheduleFollowUp = async (leadId: string | null, clientId: string | null) => {
    if (!profile?.company_id) return;
    const { error } = await supabase.from('follow_ups').insert({
      company_id: profile.company_id,
      lead_id: leadId,
      client_id: clientId,
      scheduled_for: new Date().toISOString(),
      channel: 'whatsapp',
      note: 'Campanha de reativação',
      assigned_to: user?.id ?? null,
    } as never);
    if (error) { toast.error(error.message); return; }
    toast.success('Follow-up de reativação criado.');
    qc.invalidateQueries({ queryKey: ['follow_ups'] });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Reativação</h1>
          <p className="text-sm text-muted-foreground">Clientes parados e leads perdidos para retomar</p>
        </div>
        <Select value={days} onValueChange={setDays}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="30">Sem retorno há 30 dias</SelectItem>
            <SelectItem value="60">Sem retorno há 60 dias</SelectItem>
            <SelectItem value="90">Sem retorno há 90 dias</SelectItem>
            <SelectItem value="180">Sem retorno há 180 dias</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm"><HeartHandshake className="h-4 w-4" /> Clientes inativos ({inactive.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {inactive.map((c) => (
              <div key={c.id} className="flex items-center justify-between gap-2 rounded-md border border-border p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">Última visita: {shortDate(c.last_visit_at ?? c.created_at)}</p>
                </div>
                <div className="flex gap-1">
                  {c.phone && (
                    <a href={`https://wa.me/55${c.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                      <Button size="icon" variant="ghost"><MessageCircle className="h-4 w-4" /></Button>
                    </a>
                  )}
                  <Button size="sm" variant="outline" onClick={() => scheduleFollowUp(null, c.id)}>Follow-up</Button>
                </div>
              </div>
            ))}
            {!inactive.length && <p className="py-6 text-center text-sm text-muted-foreground">Nenhum cliente inativo.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Leads perdidos ({lostLeads.length})</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {lostLeads.map((l) => (
              <div key={l.id} className="flex items-center justify-between gap-2 rounded-md border border-border p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{l.name}</p>
                  <p className="text-xs text-muted-foreground">Perdido em {shortDate(l.updated_at)}</p>
                </div>
                <div className="flex gap-1">
                  {l.phone && (
                    <a href={`https://wa.me/55${l.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                      <Button size="icon" variant="ghost"><MessageCircle className="h-4 w-4" /></Button>
                    </a>
                  )}
                  <Button size="sm" variant="outline" onClick={() => scheduleFollowUp(l.id, null)}>Follow-up</Button>
                </div>
              </div>
            ))}
            {!lostLeads.length && <p className="py-6 text-center text-sm text-muted-foreground">Nenhum lead perdido.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reactivation;
