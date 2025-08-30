import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import { Button } from "@/components/ui/button";
import { ShinyButton } from "@/components/ui/shiny-button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MapPin, Users, Star, CheckCircle } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";
import chalet1 from "@/assets/chalet-1.jpg";
import chalet2 from "@/assets/chalet-2.jpg";
import chalet3 from "@/assets/chalet-3.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-cream max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Discover Jordan's
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Hidden Gems
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Experience luxury chalets in the most beautiful locations across Jordan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              Explore Chalets
            </Button>
            <ShinyButton className="text-emerald-800 border border-emerald-300/40 bg-emerald-50/40">
              Book Your Stay
            </ShinyButton>
          </div>
        </div>
      </section>

      {/* Featured Chalets */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Featured Chalets
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked luxury chalets in Jordan's most stunning locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                name: "Dead Sea Luxury Villa",
                location: "Dead Sea, Jordan",
                price: 180,
                guests: 4,
                rating: 4.8,
                reviews: 42,
                image: chalet1
              },
              {
                id: 2,
                name: "Petra Heritage House",
                location: "Wadi Musa, Petra",
                price: 120,
                guests: 6,
                rating: 4.9,
                reviews: 38,
                image: chalet2
              },
              {
                id: 3,
                name: "Wadi Rum Desert Camp",
                location: "Wadi Rum",
                price: 220,
                guests: 8,
                rating: 5.0,
                reviews: 56,
                image: chalet3
              }
            ].map((chalet) => (
              <Card key={chalet.id} className="group overflow-hidden hover:shadow-elegant transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={chalet.image}
                    alt={chalet.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-foreground">{chalet.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm font-semibold">{chalet.rating}</span>
                      <span className="ml-1 text-sm text-muted-foreground">({chalet.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin size={16} className="mr-2" />
                    <span>{chalet.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users size={16} className="mr-2 text-primary" />
                      <span>Up to {chalet.guests} guests</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-foreground">{chalet.price} JD</span>
                      <span className="text-muted-foreground">/night</span>
                    </div>
                  </div>
                  <Link to={`/chalet/${chalet.id}`}>
                    <Button variant="hero" className="w-full mt-4">
                      View Details
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/chalets">
              <Button variant="outline" size="lg">
                View All Chalets
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-nature">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Why Choose Reva Chalets?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience Jordan like never before with our exceptional service and unique locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <CheckCircle className="w-12 h-12 text-primary" />,
                title: "Verified Properties",
                description: "All our chalets are personally inspected and verified for quality and authenticity."
              },
              {
                icon: <Users className="w-12 h-12 text-primary" />,
                title: "Local Expertise",
                description: "Our team knows Jordan inside out and can guide you to the best experiences."
              },
              {
                icon: <Star className="w-12 h-12 text-primary" />,
                title: "5-Star Service",
                description: "Premium customer service from booking to checkout and everything in between."
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-card transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-wood text-cream">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready for Your Jordan Adventure?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Book your perfect chalet today and create memories that will last a lifetime
          </p>
          <div className="max-w-md mx-auto">
            <BookingForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;