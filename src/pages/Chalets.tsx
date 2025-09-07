import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Users, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import chalet1 from "@/assets/chalet-1.jpg";

interface Farm {
  id: string;
  name: string;
  description: string | null;
  location: string | null;
  price_per_night: number | null;
  guests: number;
  bedrooms: number;
  rating: number;
  review_count: number;
  created_at: string;
  owner_id: string;
  contact_email: string | null;
  images?: { image_url: string; is_primary: boolean }[];
}

const Chalets = () => {
  const [chalets, setChalets] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChalets();
  }, []);

  const fetchChalets = async () => {
    try {
      const { data: farms, error } = await supabase
        .from('farms')
        .select(`
          *,
          farm_images (
            image_url,
            is_primary
          )
        `);

      if (error) throw error;

      const farmsWithImages = farms?.map(farm => ({
        ...farm,
        images: farm.farm_images || []
      })) || [];

      setChalets(farmsWithImages);
    } catch (error) {
      console.error('Error fetching chalets:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (farm: Farm) => {
    // Find primary image first, then any image, fallback to default
    const primaryImage = farm.images?.find(img => img.is_primary);
    const anyImage = farm.images?.[0];
    return primaryImage?.image_url || anyImage?.image_url || chalet1;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

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

          {chalets.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-4 text-foreground">No Chalets Available</h3>
              <p className="text-muted-foreground mb-6">
                Be the first to add a chalet to our platform!
              </p>
              <Link to="/auth">
                <Button variant="hero">Add Your Chalet</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {chalets.map((chalet) => (
                <Card key={chalet.id} className="group overflow-hidden hover:shadow-elegant transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={getImageUrl(chalet)}
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
                        <span className="ml-1 text-sm text-muted-foreground">({chalet.review_count})</span>
                      </div>
                    </div>
                    <div className="flex items-center text-muted-foreground mb-3">
                      <MapPin size={16} className="mr-2" />
                      <span>{chalet.location || 'Location not specified'}</span>
                    </div>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {chalet.description || 'No description available'}
                    </p>
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
                        <span className="text-2xl font-bold text-foreground">
                          {chalet.price_per_night || 0} JD
                        </span>
                        <span className="text-muted-foreground">/night</span>
                      </div>
                      <Link to={`/chalet/${chalet.id}`}>
                        <Button variant="hero">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                    {chalet.contact_email && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Contact: {chalet.contact_email}
                      </p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Chalets;