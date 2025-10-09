import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import Introduction from "./pages/Introduction";
import Objectives from "./pages/Objectives";
import Theory from "./pages/Theory";
import RsaSimulation from "./pages/RsaSimulation";
import Code from "./pages/Code";
import Conclusion from "./pages/Conclusion";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <main className="flex-1 flex flex-col">
              <header className="h-14 border-b border-border flex items-center px-4 bg-background sticky top-0 z-10">
                <SidebarTrigger />
                <h1 className="ml-4 text-lg font-semibold text-foreground">RSA Digital Signatures</h1>
              </header>
              <div className="flex-1 overflow-auto">
                <Routes>
                  <Route path="/" element={<Navigate to="/introduction" replace />} />
                  <Route path="/introduction" element={<Introduction />} />
                  <Route path="/objectives" element={<Objectives />} />
                  <Route path="/theory" element={<Theory />} />
                  <Route path="/simulation" element={<RsaSimulation />} />
                  <Route path="/code" element={<Code />} />
                  <Route path="/conclusion" element={<Conclusion />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
