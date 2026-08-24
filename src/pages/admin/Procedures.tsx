import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { brl } from '@/lib/crm';

type Procedure = {
  id: string; name: string; description: string | null; duration_minutes: number; base_price: number; active: boolean;
};

const empty = { name: '', description: '', duration_minutes: '60', base_price: '0', active: true };

const Procedures = () => {
  const { profile } = useAuth();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Procedure | null>(null);
  const [form, setForm] = useState({ ...empty });

  const { data: procedures = [] } = useQuery({
    queryKey: ['procedures'],
    queryFn: async () => ((await supabase.from('procedures').select('*').order('name')).data ?? []) as Procedure[],
  });

  const openNew = () => { setEditing(null); setForm({ ...empty }); setOpen(true); };
  const openEdit = (p: Procedure) => {
    setEditing(p);
    setForm({
      name: p.name, description: p.description ?? '', duration_minutes: String(p.duration_minutes),
      base_price: String(p.base_price), active: p.active,
    });
    setOpen(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.company_id) return;
    const payload = {
      company_id: profile.company_id,
      name: form.name.trim(),
      description: form.description.trim() || null,
      duration_minutes: Number(form.duration_minutes) || 60,
      base_price: Number(form.base_price) || 0,
      active: form.active,
    };
    const { error } = editing
      ? await supabase.from('procedures').update(payload as never).eq('id', editing.id)
      : await supabase.from('procedures').insert(payload as never);
    if (error) { toast.error(error.message); return; }
    toast.success('Procedimento salvo.');
    qc.invalidateQueries({ queryKey: ['procedures'] });
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Procedimentos</h1>
          <p className="text-sm text-muted-foreground">Catálogo de serviços da clínica</p>
        </div>
        <Button className="gap-2" onClick={openNew}><Plus className="h-4 w-4" /> Novo procedimento</Button>
      </div>

      <Card>
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Duração</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {procedures.map((p) => (
                <TableRow key={p.id} className="cursor-pointer" onClick={() => openEdit(p)}>
                  <TableCell>
                    <div className="font-medium">{p.name}</div>
                    {p.description && <div className="text-xs text-muted-foreground">{p.description}</div>}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{p.duration_minutes} min</TableCell>
                  <TableCell className="text-sm">{brl(p.base_price)}</TableCell>
                  <TableCell><Badge variant={p.active ? 'secondary' : 'outline'}>{p.active ? 'Ativo' : 'Inativo'}</Badge></TableCell>
                </TableRow>
              ))}
              {!procedures.length && (
                <TableRow><TableCell colSpan={4} className="py-8 text-center text-sm text-muted-foreground">Nenhum procedimento.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="crm">
          <DialogHeader><DialogTitle>{editing ? 'Editar procedimento' : 'Novo procedimento'}</DialogTitle></DialogHeader>
          <form onSubmit={save} className="space-y-3">
            <div className="space-y-1.5">
              <Label>Nome</Label>
              <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Descrição</Label>
              <Textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Duração (min)</Label>
                <Input type="number" value={form.duration_minutes} onChange={(e) => setForm({ ...form, duration_minutes: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Preço base</Label>
                <Input type="number" step="0.01" value={form.base_price} onChange={(e) => setForm({ ...form, base_price: e.target.value })} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} />
              <Label>Ativo</Label>
            </div>
            <Button type="submit" className="w-full">Salvar</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Procedures;
