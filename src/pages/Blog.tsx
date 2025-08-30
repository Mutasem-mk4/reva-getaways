import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Calendar, User, ArrowRight } from "lucide-react";
import chalet1 from "@/assets/chalet-1.jpg";
import chalet2 from "@/assets/chalet-2.jpg";
import chalet3 from "@/assets/chalet-3.jpg";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Ultimate Guide to Visiting Jordan's Dead Sea",
      excerpt: "Discover the therapeutic benefits and unique experiences awaiting you at the world's lowest point on Earth.",
      image: chalet1,
      author: "Sarah Ahmad",
      date: "December 15, 2024",
      category: "Travel Guide"
    },
    {
      id: 2,
      title: "Exploring Petra: Beyond the Treasury",
      excerpt: "Uncover the hidden gems and lesser-known wonders of Jordan's most famous archaeological site.",
      image: chalet2,
      author: "Omar Khalil",
      date: "December 10, 2024",
      category: "Culture"
    },
    {
      id: 3,
      title: "Wadi Rum: A Journey Through Mars on Earth",
      excerpt: "Experience the otherworldly beauty of Jordan's protected desert and its incredible stargazing opportunities.",
      image: chalet3,
      author: "Layla Hassan",
      date: "December 8, 2024",
      category: "Adventure"
    },
    {
      id: 4,
      title: "Traditional Jordanian Cuisine: A Culinary Adventure",
      excerpt: "From Mansaf to Knafeh, explore the rich flavors and cultural significance of Jordan's traditional dishes.",
      image: chalet1,
      author: "Chef Mohammed",
      date: "December 5, 2024",
      category: "Food & Culture"
    },
    {
      id: 5,
      title: "Best Time to Visit Jordan: A Seasonal Guide",
      excerpt: "Plan your perfect Jordan getaway with our comprehensive guide to the country's seasons and climate.",
      image: chalet2,
      author: "Travel Team",
      date: "December 1, 2024",
      category: "Travel Tips"
    },
    {
      id: 6,
      title: "Sustainable Tourism in Jordan: Our Commitment",
      excerpt: "Learn about our efforts to promote responsible tourism that benefits local communities and preserves Jordan's natural beauty.",
      image: chalet3,
      author: "Reva Team",
      date: "November 28, 2024",
      category: "Sustainability"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Travel Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights, tips, and stories from Jordan's most beautiful destinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group overflow-hidden hover:shadow-elegant transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <User size={14} className="mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                    <span>Read More</span>
                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-gradient-nature rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                Want to Share Your Story?
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                We'd love to hear about your Jordan experience! Share your photos and stories with us.
              </p>
              <a href="/contact">
                <Card className="inline-block p-4 hover:shadow-card transition-shadow bg-card/50 backdrop-blur">
                  <span className="text-primary font-semibold">Contact Us</span>
                </Card>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Blog;