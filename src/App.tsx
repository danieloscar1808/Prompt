import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import InstallButton from "@/components/pwa/InstallButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="prompt-builder-theme"
    >
      <TooltipProvider>
        <Sonner />  {/* Solo SONNER */}
        
        <BrowserRouter basename="/Prompt">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

        <InstallButton /> {/* Botón flotante */}
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;