import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Users, Star } from "lucide-react";
import chalet1 from "@/assets/chalet-1.jpg";
import chalet2 from "@/assets/chalet-2.jpg";
import chalet3 from "@/assets/chalet-3.jpg";

const Chalets = () => {
  const chalets = [
    {
      id: 1,
      name: "Dead Sea Luxury Villa",
      location: "Dead Sea, Jordan",
      price: 180,
      guests: 4,
      bedrooms: 2,
      rating: 4.8,
      reviews: 42,
      image: chalet1,
      description: "Experience ultimate relaxation at our Dead Sea Luxury Villa with private pool and spa facilities."
    },
    {
      id: 2,
      name: "Petra Heritage House",
      location: "Wadi Musa, Petra",
      price: 120,
      guests: 6,
      bedrooms: 3,
      rating: 4.9,
      reviews: 38,
      image: chalet2,
      description: "Stay in the heart of history just minutes away from the ancient city of Petra."
    },
    {
      id: 3,
      name: "Wadi Rum Desert Camp",
      location: "Wadi Rum",
      price: 220,
      guests: 8,
      bedrooms: 4,
      rating: 5.0,
      reviews: 56,
      image: chalet3,
      description: "Immerse yourself in the magic of the Jordanian desert with luxury camping experience."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Our Premium Chalets
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our collection of handpicked luxury chalets across Jordan's most stunning destinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chalets.map((chalet) => (
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
                  <div className="flex items-center text-muted-foreground mb-3">
                    <MapPin size={16} className="mr-2" />
                    <span>{chalet.location}</span>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm">{chalet.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Users size={16} className="mr-2 text-primary" />
                      <span className="text-sm">Up to {chalet.guests} guests</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-muted-foreground mr-2">🛏️</span>
                      <span className="text-sm">{chalet.bedrooms} bedrooms</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <span className="text-2xl font-bold text-foreground">{chalet.price} JD</span>
                      <span className="text-muted-foreground">/night</span>
                    </div>
                    <Link to={`/chalet/${chalet.id}`}>
                      <Button variant="hero">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Chalets;