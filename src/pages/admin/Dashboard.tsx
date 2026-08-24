import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Sparkles, MessageSquare, CalendarCheck, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { dateTime, LEAD_STATUS_LABEL, LEAD_STATUS_CLASS } from '@/lib/crm';

type Lead = { id: string; name: string; phone: string | null; status: string; created_at: string };

const cards = [
  { status: 'novo', label: 'Novos leads', icon: Sparkles },
  { status: 'contatado', label: 'Em contato', icon: MessageSquare },
  { status: 'agendado', label: 'Agendados', icon: CalendarCheck },
  { status: 'cliente', label: 'Concluídos', icon: CheckCircle2 },
];

const Dashboard = () => {
  const { data: leads = [] } = useQuery({
    queryKey: ['leads'],
    queryFn: async () =>
      ((await supabase.from('leads').select('id, name, phone, status, created_at').order('created_at', { ascending: false }))
        .data ?? []) as Lead[],
  });

  const count = (status: string) => leads.filter((l) => l.status === status).length;
  const latest = leads.slice(0, 8);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Visão geral</h1>
        <p className="text-sm text-muted-foreground">Contatos que chegaram pelo site.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.status} to={`/admin/leads?status=${c.status}`}>
            <Card className="transition-colors hover:border-primary">
              <CardContent className="flex items-center gap-4 p-5">
                <span className="rounded-lg bg-primary/10 p-2.5 text-primary"><c.icon className="h-5 w-5" /></span>
                <div>
                  <p className="text-2xl font-semibold leading-none">{count(c.status)}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{c.label}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="border-b border-border px-5 py-3 text-sm font-medium">Últimos contatos</div>
          {latest.length === 0 && (
            <p className="px-5 py-8 text-center text-sm text-muted-foreground">Nenhum lead ainda.</p>
          )}
          <ul className="divide-y divide-border">
            {latest.map((l) => (
              <li key={l.id}>
                <Link to={`/admin/leads/${l.id}`} className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-muted/50">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{l.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{dateTime(l.created_at)}</p>
                  </div>
                  <Badge variant="secondary" className={LEAD_STATUS_CLASS[l.status]}>{LEAD_STATUS_LABEL[l.status] ?? l.status}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
