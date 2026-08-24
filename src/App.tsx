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
import LeadDetail from "./pages/admin/LeadDetail";

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
            <Route path="/admin/leads/:id" element={admin(<LeadDetail />)} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>

  </QueryClientProvider>
);

export default App;
