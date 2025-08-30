import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Wifi, Car, Utensils, Flame, ChevronLeft, Star } from "lucide-react";
import chalet1 from "@/assets/chalet-1.jpg";
import chalet2 from "@/assets/chalet-2.jpg";
import chalet3 from "@/assets/chalet-3.jpg";

const chaletDetails = {
  1: {
    name: "Dead Sea Luxury Villa",
    location: "Dead Sea, Jordan",
    price: 180,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    images: [chalet1, chalet2, chalet3],
    description: "Experience ultimate relaxation at our Dead Sea Luxury Villa. Located near the lowest point on Earth, this stunning property offers breathtaking views of the Dead Sea and the surrounding mountains. The villa combines modern luxury with traditional Jordanian hospitality, featuring a private pool, spa facilities, and direct access to the therapeutic waters of the Dead Sea.",
    amenities: ["WiFi", "Parking", "Full Kitchen", "Pool", "Dead Sea Access", "Spa", "BBQ Grill", "Smart TV"],
    rating: 4.8,
    reviews: 42,
  },
  2: {
    name: "Petra Heritage House",
    location: "Wadi Musa, Petra",
    price: 120,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    images: [chalet2, chalet3, chalet1],
    description: "Stay in the heart of history at our Petra Heritage House. Just minutes away from the ancient city of Petra, this authentic Jordanian house has been carefully restored to provide modern comfort while preserving its traditional character. Wake up to stunning views of the rose-red mountains and enjoy easy access to one of the Seven Wonders of the World.",
    amenities: ["WiFi", "Parking", "Garden", "BBQ", "Petra Tours", "Traditional Breakfast", "Rooftop Terrace", "Local Guide"],
    rating: 4.9,
    reviews: 38,
  },
  3: {
    name: "Wadi Rum Desert Camp",
    location: "Wadi Rum",
    price: 220,
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    images: [chalet3, chalet1, chalet2],
    description: "Immerse yourself in the magic of the Jordanian desert at our Wadi Rum Desert Camp. This luxury camp offers an authentic Bedouin experience with modern amenities. Watch stunning sunsets over the Mars-like landscape, enjoy traditional Zarb dinners under the stars, and explore the dramatic desert scenery where Lawrence of Arabia was filmed.",
    amenities: ["WiFi", "Parking", "Desert Tours", "Traditional Meals", "Camel Rides", "Stargazing", "4x4 Tours", "Bedouin Experiences"],
    rating: 5.0,
    reviews: 56,
  },
};

const ChaletDetail = () => {
  const { id } = useParams();
  const chalet = chaletDetails[Number(id) as keyof typeof chaletDetails] || chaletDetails[1];

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
                src={chalet.images[0]}
                alt={chalet.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {chalet.images.slice(1).map((image, index) => (
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
                    <span>{chalet.location}</span>
                  </div>
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
                    <span className="text-primary mr-2">🚿</span>
                    <span>{chalet.bathrooms} bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="font-semibold">{chalet.rating}</span>
                    <span className="text-muted-foreground ml-1">({chalet.reviews} reviews)</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">About this chalet</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {chalet.description}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {chalet.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center p-3 bg-secondary rounded-lg"
                      >
                        {amenity === "WiFi" && <Wifi size={20} className="mr-2 text-primary" />}
                        {amenity === "Parking" && <Car size={20} className="mr-2 text-primary" />}
                        {amenity.includes("Kitchen") && <Utensils size={20} className="mr-2 text-primary" />}
                        {amenity === "Fireplace" && <Flame size={20} className="mr-2 text-primary" />}
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
                    {chalet.price} JD
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