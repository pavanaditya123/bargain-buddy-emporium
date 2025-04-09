
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and About */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <h2 className="text-2xl font-bold">
                Bargain<span className="text-secondary">Buddy</span>
              </h2>
            </Link>
            <p className="text-primary-foreground/80 mb-6">
              Your destination for unique thrift finds at amazing prices. Shop sustainably and give items a second life.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-secondary">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-secondary">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-secondary">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-secondary">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="hover:text-secondary">Shop</Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-secondary">Categories</Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-secondary">Sell Items</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-secondary">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-secondary">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/faq" className="hover:text-secondary">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-secondary">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-secondary">Returns & Exchanges</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-secondary">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-secondary">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin size={18} />
                <span>123 Thrift Street, Vintage City</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} />
                <span>hello@bargainbuddy.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-6 text-center text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Bargain Buddy Emporium. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
