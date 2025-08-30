import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Chalets from "./pages/Chalets";
import ChaletDetail from "./pages/ChaletDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Testimonials from "./pages/Testimonials";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showSplash ? (
          <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-3 bg-background">
            <img
              src="/lovable-uploads/4767e45c-9364-4ef5-bc21-7ae89e684cb6.png"
              alt="Reva Chalets"
              className="h-16 w-16 animate-in fade-in-50 zoom-in-50 duration-[1300ms]"
            />
            <span className="text-lg font-semibold tracking-wide text-foreground animate-in fade-in-50 duration-700">
              Reva Chalets
            </span>
          </div>
        ) : null}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/chalets" element={<Chalets />} />
            <Route path="/chalet/:id" element={<ChaletDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/testimonials" element={<Testimonials />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
