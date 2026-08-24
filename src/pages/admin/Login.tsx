import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Login = () => {
  const { signIn, signUp, session, loading } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    if (!loading && session) navigate('/admin', { replace: true });
  }, [session, loading, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await signIn(email.trim(), password);
    setBusy(false);
    if (error) {
      toast.error(error === 'Invalid login credentials' ? 'E-mail ou senha incorretos.' : error);
      return;
    }
    navigate('/admin', { replace: true });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error('A senha precisa ter ao menos 6 caracteres.');
      return;
    }
    setBusy(true);
    const { error } = await signUp(email.trim(), password, fullName.trim(), companyName.trim());
    setBusy(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success('Conta criada! Você já pode acessar o painel.');
    navigate('/admin', { replace: true });
  };

  return (
    <div className="crm flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <CardTitle className="text-xl">CRM da Clínica</CardTitle>
          <CardDescription>Acesse o painel de gestão</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="entrar">
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="entrar">Entrar</TabsTrigger>
              <TabsTrigger value="criar">Criar clínica</TabsTrigger>
            </TabsList>

            <TabsContent value="entrar">
              <form onSubmit={handleSignIn} className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password">Senha</Label>
                  <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full" disabled={busy}>
                  {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Entrar
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="criar">
              <form onSubmit={handleSignUp} className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="company">Nome da clínica</Label>
                  <Input id="company" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="name">Seu nome</Label>
                  <Input id="name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email2">E-mail</Label>
                  <Input id="email2" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password2">Senha</Label>
                  <Input id="password2" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full" disabled={busy}>
                  {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Criar conta
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
