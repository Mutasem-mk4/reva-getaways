import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShinyButton } from "@/components/ui/shiny-button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/lovable-uploads/4767e45c-9364-4ef5-bc21-7ae89e684cb6.png" alt="Reva Chalets" className="h-12 w-12 drop-shadow-md transition-transform hover:scale-105" />
            <span className="text-2xl font-bold bg-gradient-wood bg-clip-text text-transparent">
              Reva Chalets
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/chalets"
              className="text-foreground hover:text-primary transition-colors"
            >
              Chalets
            </Link>
            <Link
              to="/services"
              className="text-foreground hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              to="/gallery"
              className="text-foreground hover:text-primary transition-colors"
            >
              Gallery
            </Link>
            <Link
              to="/blog"
              className="text-foreground hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <ShinyButton className="text-emerald-800 dark:text-emerald-200 border border-emerald-300/40 bg-emerald-50/40 flex items-center gap-2">
              <img src="/lovable-uploads/4767e45c-9364-4ef5-bc21-7ae89e684cb6.png" alt="Reva Logo" className="h-5 w-5" />
              Book Now
            </ShinyButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              to="/"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/chalets"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Chalets
            </Link>
            <Link
              to="/services"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/gallery"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/blog"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <ShinyButton className="w-full text-emerald-800 dark:text-emerald-200 border border-emerald-300/40 bg-emerald-50/40 flex items-center justify-center gap-2">
              <img src="/lovable-uploads/4767e45c-9364-4ef5-bc21-7ae89e684cb6.png" alt="Reva Logo" className="h-5 w-5" />
              Book Now
            </ShinyButton>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;