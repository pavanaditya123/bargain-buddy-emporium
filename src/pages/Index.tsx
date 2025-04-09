
import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";
import CategoriesSection from "@/components/CategoriesSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div>
      <Navbar />
      
      <main>
        <HeroSection />
        
        <FeaturedSection />
        
        <CategoriesSection />
        
        {/* How It Works Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-secondary text-white text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Browse & Discover</h3>
                <p className="text-muted-foreground">
                  Explore our curated collection of unique thrift items across various categories.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-secondary text-white text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Add to Cart</h3>
                <p className="text-muted-foreground">
                  Found something you love? Add it to your cart and proceed to secure checkout.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-secondary text-white text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Enjoy Your Finds</h3>
                <p className="text-muted-foreground">
                  Receive your items and enjoy your sustainable shopping experience!
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Sell Your Items CTA */}
        <section className="bg-muted py-16 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Have Items to Sell?</h2>
              <p className="text-lg mb-8">
                Turn your pre-loved items into cash. List them on our platform and reach thousands of potential buyers.
              </p>
              <Button size="lg" asChild>
                <Link to="/sell">Start Selling Today</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What Our Community Says</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="mb-4 text-secondary">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
                <p className="italic mb-4">
                  "I found a vintage leather jacket that I've been searching for everywhere! The quality and price were amazing. Highly recommend for unique finds!"
                </p>
                <p className="font-semibold">- Sarah T.</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="mb-4 text-secondary">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
                <p className="italic mb-4">
                  "As a seller, I appreciate how easy it is to list items. I've sold several pieces of furniture and the process has been seamless."
                </p>
                <p className="font-semibold">- Michael R.</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="mb-4 text-secondary">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i} className={(i < 4 ? "text-xl" : "text-xl text-muted")}>★</span>
                  ))}
                </div>
                <p className="italic mb-4">
                  "The customer service is excellent. When I had an issue with my order, they responded quickly and resolved it right away."
                </p>
                <p className="font-semibold">- Emma L.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
