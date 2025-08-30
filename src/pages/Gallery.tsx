import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import chalet1 from "@/assets/chalet-1.jpg";
import chalet2 from "@/assets/chalet-2.jpg";
import chalet3 from "@/assets/chalet-3.jpg";
import heroBackground from "@/assets/hero-bg.jpg";

const Gallery = () => {
  const galleryImages = [
    { src: chalet1, title: "Dead Sea Luxury Villa", category: "Dead Sea" },
    { src: chalet2, title: "Petra Heritage House", category: "Petra" },
    { src: chalet3, title: "Wadi Rum Desert Camp", category: "Wadi Rum" },
    { src: heroBackground, title: "Jordan Landscape", category: "Scenery" },
    { src: chalet1, title: "Villa Interior", category: "Interior" },
    { src: chalet2, title: "Traditional Architecture", category: "Architecture" },
    { src: chalet3, title: "Desert Views", category: "Scenery" },
    { src: heroBackground, title: "Sunset Views", category: "Scenery" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the beauty of our chalets and the stunning landscapes of Jordan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl aspect-square bg-card hover:shadow-elegant transition-all duration-300"
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-lg font-semibold">{image.title}</p>
                    <p className="text-sm text-white/80">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Gallery;