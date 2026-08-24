import { ReactNode, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, Menu, X, ExternalLink } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const nav = [
  { to: '/admin', end: true, label: 'Visão geral', icon: LayoutDashboard },
  { to: '/admin/leads', label: 'Leads', icon: Users },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { profile, company, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="crm min-h-screen bg-background text-foreground">
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-60 border-r border-border bg-card transition-transform lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          <span className="truncate text-sm font-semibold">{company?.name ?? 'CRM'}</span>
          <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Fechar menu">
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex flex-col gap-0.5 overflow-y-auto p-2" style={{ maxHeight: 'calc(100vh - 7.5rem)' }}>
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors',
                  isActive ? 'bg-primary/10 font-medium text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute inset-x-0 bottom-0 border-t border-border p-3">
          <a href="/" className="mb-2 flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <ExternalLink className="h-4 w-4" /> Voltar ao site
          </a>
          <div className="mb-2 truncate text-xs text-muted-foreground">{profile?.full_name || 'Usuário'}</div>
          <Button variant="outline" size="sm" className="w-full justify-start gap-2" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" /> Sair
          </Button>
        </div>
      </aside>

      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}

      <div className="lg:pl-60">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-card/90 px-4 backdrop-blur">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Abrir menu">
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-medium text-muted-foreground">Painel de gestão</span>
          <a href="/" className="ml-auto">
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="h-4 w-4" /> Voltar ao site
            </Button>
          </a>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
