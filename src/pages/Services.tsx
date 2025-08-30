import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Car, Utensils, Camera, Compass, Sunset, Users } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Car className="w-12 h-12 text-primary" />,
      title: "Airport Transfer",
      description: "Comfortable and reliable transportation from Queen Alia International Airport to your chalet.",
      features: ["Professional drivers", "Modern vehicles", "24/7 availability", "Competitive rates"]
    },
    {
      icon: <Utensils className="w-12 h-12 text-primary" />,
      title: "Traditional Meals",
      description: "Authentic Jordanian cuisine prepared by local chefs using fresh, regional ingredients.",
      features: ["Mansaf & Zarb", "Vegetarian options", "Fresh ingredients", "Cooking classes"]
    },
    {
      icon: <Camera className="w-12 h-12 text-primary" />,
      title: "Photography Tours",
      description: "Capture Jordan's beauty with professional photography guides who know the best spots.",
      features: ["Professional guides", "Best locations", "Equipment provided", "Photo editing tips"]
    },
    {
      icon: <Compass className="w-12 h-12 text-primary" />,
      title: "Desert Adventures",
      description: "Explore Wadi Rum's otherworldly landscape with camel rides, 4x4 tours, and hiking.",
      features: ["Camel trekking", "4x4 adventures", "Hiking trails", "Bedouin experiences"]
    },
    {
      icon: <Sunset className="w-12 h-12 text-primary" />,
      title: "Stargazing",
      description: "Experience the magic of Jordan's clear night skies with guided astronomy sessions.",
      features: ["Clear desert skies", "Professional telescopes", "Expert guides", "Best viewing spots"]
    },
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "Cultural Experiences",
      description: "Immerse yourself in Jordan's rich culture with local community visits and workshops.",
      features: ["Local communities", "Cultural workshops", "Traditional crafts", "Historical tours"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Our Services
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enhance your Jordan experience with our carefully curated services and activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-elegant transition-all duration-300 group">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground text-center">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-center">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-gradient-nature rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Need Something Else?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're here to make your Jordan experience unforgettable. Contact us for 
              custom services and personalized recommendations.
            </p>
            <a href="/contact" className="inline-block">
              <Card className="p-4 hover:shadow-card transition-shadow bg-card/50 backdrop-blur">
                <span className="text-primary font-semibold">Get in Touch</span>
              </Card>
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;