import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
        {showSplash ? (
          <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200 dark:from-emerald-900 dark:via-emerald-800 dark:to-emerald-700">
            <img
              src="/lovable-uploads/4767e45c-9364-4ef5-bc21-7ae89e684cb6.png"
              alt="Reva Chalets"
              className="h-24 w-24 animate-in fade-in-0 zoom-in-95 duration-[1300ms] ease-out drop-shadow-lg"
            />
            <span className="text-xl font-bold tracking-wide text-emerald-800 dark:text-emerald-100 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-300">
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
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
