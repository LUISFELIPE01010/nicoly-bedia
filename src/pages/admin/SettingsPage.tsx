import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const SettingsPage = () => {
  const { profile, company, roles, refresh } = useAuth();
  const qc = useQueryClient();
  const isAdmin = roles.includes('owner') || roles.includes('admin');

  const [companyForm, setCompanyForm] = useState({ name: '', document: '', phone: '', email: '', address: '' });
  const [profileForm, setProfileForm] = useState({ full_name: '', phone: '' });
  const [newSource, setNewSource] = useState('');
  const [newStage, setNewStage] = useState('');

  useEffect(() => {
    if (company) {
      setCompanyForm({
        name: company.name ?? '', document: company.document ?? '', phone: company.phone ?? '',
        email: company.email ?? '', address: company.address ?? '',
      });
    }
  }, [company]);

  useEffect(() => {
    if (profile) setProfileForm({ full_name: profile.full_name ?? '', phone: profile.phone ?? '' });
  }, [profile]);

  const { data: sources = [] } = useQuery({
    queryKey: ['lead_sources'],
    queryFn: async () => (await supabase.from('lead_sources').select('id, name, active').order('name')).data ?? [],
  });
  const { data: stages = [] } = useQuery({
    queryKey: ['pipeline_stages'],
    queryFn: async () => (await supabase.from('pipeline_stages').select('*').order('position')).data ?? [],
  });
  const { data: team = [] } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const [profiles, rolesRows] = await Promise.all([
        supabase.from('profiles').select('id, full_name, phone'),
        supabase.from('user_roles').select('user_id, role'),
      ]);
      return (profiles.data ?? []).map((p) => ({
        ...p,
        roles: (rolesRows.data ?? []).filter((r) => r.user_id === p.id).map((r) => r.role),
      }));
    },
  });

  const saveCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;
    const { error } = await supabase.from('companies').update({
      name: companyForm.name.trim(),
      document: companyForm.document.trim() || null,
      phone: companyForm.phone.trim() || null,
      email: companyForm.email.trim() || null,
      address: companyForm.address.trim() || null,
    } as never).eq('id', company.id);
    if (error) { toast.error(error.message); return; }
    toast.success('Dados da clínica atualizados.');
    refresh();
  };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    const { error } = await supabase.from('profiles').update({
      full_name: profileForm.full_name.trim(),
      phone: profileForm.phone.trim() || null,
    } as never).eq('id', profile.id);
    if (error) { toast.error(error.message); return; }
    toast.success('Perfil atualizado.');
    refresh();
  };

  const addSource = async () => {
    if (!newSource.trim() || !profile?.company_id) return;
    const { error } = await supabase.from('lead_sources').insert({ company_id: profile.company_id, name: newSource.trim() } as never);
    if (error) { toast.error(error.message); return; }
    setNewSource('');
    qc.invalidateQueries({ queryKey: ['lead_sources'] });
  };

  const removeSource = async (id: string) => {
    const { error } = await supabase.from('lead_sources').delete().eq('id', id);
    if (error) { toast.error(error.message); return; }
    qc.invalidateQueries({ queryKey: ['lead_sources'] });
  };

  const addStage = async () => {
    if (!newStage.trim() || !profile?.company_id) return;
    const { error } = await supabase.from('pipeline_stages').insert({
      company_id: profile.company_id, name: newStage.trim(), position: stages.length + 1,
    } as never);
    if (error) { toast.error(error.message); return; }
    setNewStage('');
    qc.invalidateQueries({ queryKey: ['pipeline_stages'] });
  };

  const removeStage = async (id: string) => {
    const { error } = await supabase.from('pipeline_stages').delete().eq('id', id);
    if (error) { toast.error(error.message); return; }
    qc.invalidateQueries({ queryKey: ['pipeline_stages'] });
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Configurações</h1>
        <p className="text-sm text-muted-foreground">Dados da clínica, equipe e personalização do CRM</p>
      </div>

      <Tabs defaultValue="clinica">
        <TabsList className="flex-wrap">
          <TabsTrigger value="clinica">Clínica</TabsTrigger>
          <TabsTrigger value="perfil">Meu perfil</TabsTrigger>
          <TabsTrigger value="origens">Origens</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="equipe">Equipe</TabsTrigger>
        </TabsList>

        <TabsContent value="clinica">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={saveCompany} className="max-w-md space-y-3">
                <div className="space-y-1.5"><Label>Nome</Label><Input value={companyForm.name} onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })} /></div>
                <div className="space-y-1.5"><Label>CNPJ/CPF</Label><Input value={companyForm.document} onChange={(e) => setCompanyForm({ ...companyForm, document: e.target.value })} /></div>
                <div className="space-y-1.5"><Label>Telefone</Label><Input value={companyForm.phone} onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })} /></div>
                <div className="space-y-1.5"><Label>E-mail</Label><Input type="email" value={companyForm.email} onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })} /></div>
                <div className="space-y-1.5"><Label>Endereço</Label><Input value={companyForm.address} onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })} /></div>
                <Button type="submit" disabled={!isAdmin}>Salvar</Button>
                {!isAdmin && <p className="text-xs text-muted-foreground">Apenas donos e administradores podem editar.</p>}
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="perfil">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={saveProfile} className="max-w-md space-y-3">
                <div className="space-y-1.5"><Label>Nome</Label><Input value={profileForm.full_name} onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })} /></div>
                <div className="space-y-1.5"><Label>Telefone</Label><Input value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} /></div>
                <Button type="submit">Salvar</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="origens">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Origens de lead</CardTitle></CardHeader>
            <CardContent className="max-w-md space-y-2">
              <div className="flex gap-2">
                <Input placeholder="Nova origem" value={newSource} onChange={(e) => setNewSource(e.target.value)} />
                <Button type="button" onClick={addSource} className="gap-1"><Plus className="h-4 w-4" /></Button>
              </div>
              {sources.map((s) => (
                <div key={s.id} className="flex items-center justify-between rounded-md border border-border p-2 text-sm">
                  <span>{s.name}</span>
                  <Button size="icon" variant="ghost" onClick={() => removeSource(s.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Estágios do pipeline</CardTitle></CardHeader>
            <CardContent className="max-w-md space-y-2">
              <div className="flex gap-2">
                <Input placeholder="Novo estágio" value={newStage} onChange={(e) => setNewStage(e.target.value)} />
                <Button type="button" onClick={addStage} className="gap-1"><Plus className="h-4 w-4" /></Button>
              </div>
              {stages.map((s) => (
                <div key={s.id} className="flex items-center justify-between rounded-md border border-border p-2 text-sm">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                    {s.name}
                  </span>
                  <Button size="icon" variant="ghost" onClick={() => removeStage(s.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipe">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Equipe</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {team.map((m) => (
                <div key={m.id} className="flex items-center justify-between rounded-md border border-border p-3 text-sm">
                  <span>{m.full_name || 'Sem nome'}</span>
                  <div className="flex gap-1">
                    {m.roles.map((r) => <Badge key={r} variant="secondary">{r}</Badge>)}
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground">
                Para adicionar alguém à equipe, peça que a pessoa crie a conta e informe o e-mail para vinculá-la à clínica.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
