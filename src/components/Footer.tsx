import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-wood text-cream">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/reva-logo.svg" alt="Reva Chalets" className="h-8 w-8" />
              <span className="text-2xl font-bold">Reva Chalets</span>
            </div>
            <p className="text-cream/80 leading-relaxed">
              Discover the beauty of Jordan through our unique chalet experiences. 
              From the Dead Sea to Wadi Rum, create unforgettable memories.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cream/80 hover:text-cream transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-cream/80 hover:text-cream transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-cream/80 hover:text-cream transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-cream/80 hover:text-cream transition-colors">
                Home
              </Link>
              <Link to="/chalets" className="block text-cream/80 hover:text-cream transition-colors">
                Our Chalets
              </Link>
              <Link to="/services" className="block text-cream/80 hover:text-cream transition-colors">
                Services
              </Link>
              <Link to="/gallery" className="block text-cream/80 hover:text-cream transition-colors">
                Gallery
              </Link>
            </div>
          </div>

          {/* Destinations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Destinations</h3>
            <div className="space-y-2">
              <a href="#" className="block text-cream/80 hover:text-cream transition-colors">
                Dead Sea
              </a>
              <a href="#" className="block text-cream/80 hover:text-cream transition-colors">
                Petra
              </a>
              <a href="#" className="block text-cream/80 hover:text-cream transition-colors">
                Wadi Rum
              </a>
              <a href="#" className="block text-cream/80 hover:text-cream transition-colors">
                Amman
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-cream/80" />
                <span className="text-cream/80">info@revachalets.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-cream/80" />
                <span className="text-cream/80">+962 6 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-cream/80" />
                <span className="text-cream/80">Amman, Jordan</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/20 mt-8 pt-8 text-center text-cream/60">
          <p>&copy; 2024 Reva Chalets. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;