import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Wifi, Car, Utensils, Flame, ChevronLeft, Star } from "lucide-react";
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
  images?: { image_url: string; is_primary: boolean }[];
  owner_email?: string;
}

const ChaletDetail = () => {
  const { id } = useParams();
  const [chalet, setChalet] = useState<Farm | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchChalet(id);
    }
  }, [id]);

  const fetchChalet = async (chaletId: string) => {
    try {
      const { data: farm, error } = await supabase
        .from('farms')
        .select(`
          *,
          farm_images (
            image_url,
            is_primary
          )
        `)
        .eq('id', chaletId)
        .single();

      if (error) throw error;

      // Fetch owner email separately
      const { data: profile } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', farm.owner_id)
        .single();

      setChalet({
        ...farm,
        images: farm.farm_images || [],
        owner_email: profile?.email
      });
    } catch (error) {
      console.error('Error fetching chalet:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImages = () => {
    if (!chalet?.images || chalet.images.length === 0) {
      return [chalet1, chalet1, chalet1]; // Default images
    }
    
    const images = chalet.images.map(img => img.image_url);
    // Ensure we have at least 3 images for the layout
    while (images.length < 3) {
      images.push(images[0] || chalet1);
    }
    return images;
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

  if (!chalet) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-20 text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Chalet Not Found</h1>
          <p className="text-muted-foreground mb-6">The chalet you're looking for doesn't exist.</p>
          <Link to="/chalets">
            <Button variant="hero">Back to Chalets</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = getImages();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/chalets">
            <Button variant="outline" className="mb-6">
              <ChevronLeft size={20} className="mr-2" />
              Back to Chalets
            </Button>
          </Link>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="h-96 md:h-full rounded-xl overflow-hidden">
              <img
                src={images[0]}
                alt={chalet.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {images.slice(1).map((image, index) => (
                <div key={index} className="h-44 md:h-48 rounded-xl overflow-hidden">
                  <img
                    src={image}
                    alt={`${chalet.name} ${index + 2}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl p-8 shadow-card">
                <div className="mb-6">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
                    {chalet.name}
                  </h1>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin size={20} className="mr-2" />
                    <span>{chalet.location || 'Location not specified'}</span>
                  </div>
                  {chalet.owner_email && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Owner: {chalet.owner_email}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center">
                    <Users size={20} className="mr-2 text-primary" />
                    <span>Up to {chalet.guests} guests</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-primary mr-2">🛏️</span>
                    <span>{chalet.bedrooms} bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="font-semibold">{chalet.rating}</span>
                    <span className="text-muted-foreground ml-1">({chalet.review_count} reviews)</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">About this chalet</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {chalet.description || 'No description available for this chalet.'}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['WiFi', 'Parking', 'Full Kitchen', 'Garden'].map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center p-3 bg-secondary rounded-lg"
                      >
                        {amenity === "WiFi" && <Wifi size={20} className="mr-2 text-primary" />}
                        {amenity === "Parking" && <Car size={20} className="mr-2 text-primary" />}
                        {amenity.includes("Kitchen") && <Utensils size={20} className="mr-2 text-primary" />}
                        {amenity.includes("Garden") && <Flame size={20} className="mr-2 text-primary" />}
                        <span className="text-secondary-foreground">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-gradient-wood rounded-xl p-6 mb-6">
                  <div className="text-3xl font-bold text-cream mb-2">
                    {chalet.price_per_night || 0} JD
                    <span className="text-lg font-normal text-cream/80">/night</span>
                  </div>
                  <p className="text-sm text-cream/80">Includes all amenities</p>
                </div>
                
                <BookingForm chaletName={chalet.name} />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ChaletDetail;