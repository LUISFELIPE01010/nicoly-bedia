import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { brl, LEAD_STATUS_LABEL, TEMPERATURE_LABEL } from '@/lib/crm';

type Stage = { id: string; name: string; position: number; color: string; status_key: string | null };
type Lead = {
  id: string; name: string; phone: string | null; status: string; temperature: string;
  estimated_value: number | null; stage_id: string | null;
};

const Pipeline = () => {
  const qc = useQueryClient();
  const [dragging, setDragging] = useState<string | null>(null);

  const { data: stages = [] } = useQuery({
    queryKey: ['pipeline_stages'],
    queryFn: async () => ((await supabase.from('pipeline_stages').select('*').order('position')).data ?? []) as Stage[],
  });
  const { data: leads = [] } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => ((await supabase.from('leads').select('*').order('created_at', { ascending: false })).data ?? []) as Lead[],
  });

  const leadsForStage = (stage: Stage) =>
    leads.filter((l) => (l.stage_id ? l.stage_id === stage.id : l.status === stage.status_key));

  const moveTo = async (leadId: string, stage: Stage) => {
    const patch: Record<string, unknown> = { stage_id: stage.id };
    if (stage.status_key) patch.status = stage.status_key;
    const { error } = await supabase.from('leads').update(patch as never).eq('id', leadId);
    if (error) {
      toast.error(error.message);
      return;
    }
    qc.invalidateQueries({ queryKey: ['leads'] });
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Pipeline</h1>
        <p className="text-sm text-muted-foreground">Arraste os cards para mudar o estágio do lead</p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageLeads = leadsForStage(stage);
          const total = stageLeads.reduce((acc, l) => acc + Number(l.estimated_value ?? 0), 0);
          return (
            <div
              key={stage.id}
              className="w-64 shrink-0 rounded-lg bg-muted/50 p-2"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => dragging && moveTo(dragging, stage)}
            >
              <div className="mb-2 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: stage.color }} />
                  <span className="text-sm font-medium">{stage.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{stageLeads.length}</span>
              </div>
              <p className="mb-2 px-1 text-[11px] text-muted-foreground">{brl(total)} em potencial</p>
              <div className="space-y-2">
                {stageLeads.map((lead) => (
                  <Card
                    key={lead.id}
                    draggable
                    onDragStart={() => setDragging(lead.id)}
                    onDragEnd={() => setDragging(null)}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <CardContent className="space-y-1 p-3">
                      <p className="text-sm font-medium">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.phone ?? 'Sem telefone'}</p>
                      <div className="flex flex-wrap items-center gap-1 pt-1">
                        <Badge variant="secondary" className="text-[10px]">{TEMPERATURE_LABEL[lead.temperature]}</Badge>
                        <Badge variant="outline" className="text-[10px]">{LEAD_STATUS_LABEL[lead.status]}</Badge>
                        {lead.estimated_value ? <span className="text-[11px] text-muted-foreground">{brl(lead.estimated_value)}</span> : null}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {!stageLeads.length && <p className="px-1 py-4 text-center text-xs text-muted-foreground">Vazio</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pipeline;
