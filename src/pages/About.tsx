import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Users, Heart, Award, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              About Reva Chalets
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the story behind Jordan's premier chalet rental experience
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <Card className="p-8 shadow-card">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in 2020, Reva Chalets was born from a passion for showcasing Jordan's 
                natural beauty and rich cultural heritage. Our founders, native Jordanians with 
                extensive hospitality experience, recognized the need for authentic, luxury 
                accommodations that would allow visitors to truly connect with Jordan's landscapes.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From the therapeutic waters of the Dead Sea to the ancient wonders of Petra and 
                the otherworldly desert of Wadi Rum, we carefully select and maintain properties 
                that offer both comfort and authentic Jordanian experiences. Each chalet in our 
                collection represents our commitment to excellence and our love for this remarkable country.
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: <Users className="w-12 h-12 text-primary" />,
                title: "Expert Team",
                description: "Local hospitality professionals with deep knowledge of Jordan"
              },
              {
                icon: <Heart className="w-12 h-12 text-primary" />,
                title: "Passionate Service",
                description: "We genuinely care about creating unforgettable experiences"
              },
              {
                icon: <Award className="w-12 h-12 text-primary" />,
                title: "Quality Assured",
                description: "Every property meets our rigorous standards for luxury and comfort"
              },
              {
                icon: <Globe className="w-12 h-12 text-primary" />,
                title: "Sustainable Tourism",
                description: "Supporting local communities and preserving Jordan's natural beauty"
              }
            ].map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-card transition-shadow">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-nature rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              To provide exceptional chalet experiences that showcase Jordan's natural wonders 
              while supporting local communities and preserving the environment for future generations. 
              We believe that travel should be transformative, sustainable, and deeply connected to place.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;