import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import InstallButton from "@/components/pwa/InstallButton";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner"; // reemplazo limpio

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster position="top-center" richColors /> {/* más liviano que Sonner custom */}

        <BrowserRouter basename="/Prompt">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

        <InstallButton />
      </TooltipProvider>
    </QueryClientProvider>
  );
}