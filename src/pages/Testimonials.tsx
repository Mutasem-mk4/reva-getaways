import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Emily Johnson",
      location: "London, UK",
      rating: 5,
      text: "Our stay at the Dead Sea Villa was absolutely magical. The private pool overlooking the Dead Sea was a dream come true. The staff arranged everything perfectly, from airport transfer to traditional Jordanian dinner. Highly recommend!",
      chalet: "Dead Sea Luxury Villa"
    },
    {
      id: 2,
      name: "Marcus Schmidt",
      location: "Berlin, Germany",
      rating: 5,
      text: "The Petra Heritage House exceeded all expectations. Waking up to the view of the rose-red mountains and being just minutes away from Petra was incredible. The authenticity combined with modern comfort was perfect.",
      chalet: "Petra Heritage House"
    },
    {
      id: 3,
      name: "Sophie Dubois",
      location: "Paris, France",
      rating: 5,
      text: "Wadi Rum Desert Camp was the highlight of our Jordan trip. The stargazing experience and traditional Zarb dinner were unforgettable. The luxury tents were surprisingly comfortable and the desert sunrise was breathtaking.",
      chalet: "Wadi Rum Desert Camp"
    },
    {
      id: 4,
      name: "David Park",
      location: "Seoul, South Korea",
      rating: 5,
      text: "Exceptional service from start to finish. The team's local knowledge and recommendations made our Jordan experience truly special. The chalets are beautifully maintained and the locations are stunning.",
      chalet: "Multiple Properties"
    },
    {
      id: 5,
      name: "Isabella Rodriguez",
      location: "Madrid, Spain",
      rating: 5,
      text: "As a solo female traveler, I felt completely safe and well taken care of. The booking process was smooth, and the 24/7 support gave me peace of mind. Jordan is now one of my favorite destinations!",
      chalet: "Petra Heritage House"
    },
    {
      id: 6,
      name: "James Thompson",
      location: "Sydney, Australia",
      rating: 5,
      text: "Our family vacation to Jordan was perfect thanks to Reva Chalets. The kids loved the pool at the Dead Sea Villa, and we all enjoyed learning about Jordanian culture. Professional service throughout.",
      chalet: "Dead Sea Luxury Villa"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Guest Testimonials
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Read what our guests say about their unforgettable Jordan experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6 hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-primary/30 mr-2" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-primary font-semibold">{testimonial.chalet}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-gradient-wood rounded-xl p-8 text-center text-cream">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Create Your Own Story?
            </h2>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Join thousands of satisfied guests who have discovered the magic of Jordan 
              through our exceptional chalet experiences.
            </p>
            <a href="/chalets">
              <Card className="inline-block p-4 hover:shadow-card transition-shadow bg-white/10 backdrop-blur border-white/20">
                <span className="text-cream font-semibold">Book Your Stay</span>
              </Card>
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Testimonials;