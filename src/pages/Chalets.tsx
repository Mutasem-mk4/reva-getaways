import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { MapPin, Users, Star, Filter } from "lucide-react";
import { useState } from "react";
import chalet1 from "@/assets/chalet-1.jpg";
import chalet2 from "@/assets/chalet-2.jpg";
import chalet3 from "@/assets/chalet-3.jpg";

const Chalets = () => {
  const [filters, setFilters] = useState({
    guests: "",
    city: "",
    priceRange: [0, 300]
  });
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

  const cities = ["All Cities", "Dead Sea", "Wadi Musa", "Wadi Rum"];

  const filteredChalets = chalets.filter((chalet) => {
    const matchesGuests = !filters.guests || chalet.guests >= parseInt(filters.guests);
    const matchesCity = !filters.city || filters.city === "All Cities" || chalet.location.includes(filters.city);
    const matchesPrice = chalet.price >= filters.priceRange[0] && chalet.price <= filters.priceRange[1];
    return matchesGuests && matchesCity && matchesPrice;
  });

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

          {/* Filters Section */}
          <div className="bg-card rounded-xl p-6 mb-8 shadow-card">
            <div className="flex items-center mb-4">
              <Filter className="w-5 h-5 mr-2 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Filter Chalets</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Guests Filter */}
              <div className="space-y-2">
                <Label htmlFor="guests">Number of Guests</Label>
                <Select value={filters.guests} onValueChange={(value) => setFilters({...filters, guests: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any number</SelectItem>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}+ guests
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* City Filter */}
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Select value={filters.city} onValueChange={(value) => setFilters({...filters, city: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-2 md:col-span-2">
                <Label>Price Range: {filters.priceRange[0]} JD - {filters.priceRange[1]} JD / night</Label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters({...filters, priceRange: value})}
                  max={300}
                  min={0}
                  step={10}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredChalets.map((chalet) => (
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