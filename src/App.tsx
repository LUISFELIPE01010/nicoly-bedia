import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "@/hooks/useAuth";
import AuthGuard from "@/components/admin/AuthGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Leads from "./pages/admin/Leads";
import Pipeline from "./pages/admin/Pipeline";
import FollowUps from "./pages/admin/FollowUps";
import Agenda from "./pages/admin/Agenda";
import Clients from "./pages/admin/Clients";
import Procedures from "./pages/admin/Procedures";
import Sales from "./pages/admin/Sales";
import Reports from "./pages/admin/Reports";
import Reactivation from "./pages/admin/Reactivation";
import SettingsPage from "./pages/admin/SettingsPage";

const queryClient = new QueryClient();

const admin = (element: JSX.Element) => (
  <AuthGuard>
    <AdminLayout>{element}</AdminLayout>
  </AuthGuard>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={admin(<Dashboard />)} />
            <Route path="/admin/leads" element={admin(<Leads />)} />
            <Route path="/admin/pipeline" element={admin(<Pipeline />)} />
            <Route path="/admin/follow-ups" element={admin(<FollowUps />)} />
            <Route path="/admin/agenda" element={admin(<Agenda />)} />
            <Route path="/admin/clientes" element={admin(<Clients />)} />
            <Route path="/admin/procedimentos" element={admin(<Procedures />)} />
            <Route path="/admin/vendas" element={admin(<Sales />)} />
            <Route path="/admin/relatorios" element={admin(<Reports />)} />
            <Route path="/admin/reativacao" element={admin(<Reactivation />)} />
            <Route path="/admin/configuracoes" element={admin(<SettingsPage />)} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>

  </QueryClientProvider>
);

export default App;
