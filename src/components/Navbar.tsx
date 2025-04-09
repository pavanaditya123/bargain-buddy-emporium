
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  ShoppingCart, 
  User, 
  LogIn, 
  Menu, 
  X, 
  Tag, 
  Heart 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Searching",
        description: `Looking for "${searchQuery}"...`
      });
      // In a real app, we would navigate to search results
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">
              Bargain<span className="text-secondary">Buddy</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/shop" className="nav-link font-medium">Shop</Link>
            <Link to="/categories" className="nav-link font-medium">Categories</Link>
            <Link to="/sell" className="nav-link font-medium">Sell</Link>
            <Link to="/about" className="nav-link font-medium">About</Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search items..."
                className="w-[200px] lg:w-[300px] rounded-full pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                size="icon" 
                variant="ghost" 
                className="absolute right-0 top-0 h-full"
              >
                <Search size={18} className="text-muted-foreground" />
              </Button>
            </form>
          </div>

          {/* Action Icons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/favorites">
                <Heart size={20} />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/cart">
                <ShoppingCart size={20} />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/login">
                <User size={20} />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-6 animate-fade-in">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Input
                type="text"
                placeholder="Search items..."
                className="w-full rounded-full pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                size="icon" 
                variant="ghost" 
                className="absolute right-0 top-0 h-full"
              >
                <Search size={18} className="text-muted-foreground" />
              </Button>
            </form>
            <nav className="flex flex-col space-y-4">
              <Link to="/shop" className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-muted">
                <Tag size={18} />
                Shop
              </Link>
              <Link to="/categories" className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-muted">
                <Tag size={18} />
                Categories
              </Link>
              <Link to="/sell" className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-muted">
                <Tag size={18} />
                Sell
              </Link>
              <Link to="/about" className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-muted">
                <Tag size={18} />
                About
              </Link>
              <hr className="border-t border-border" />
              <Link to="/favorites" className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-muted">
                <Heart size={18} />
                Favorites
              </Link>
              <Link to="/cart" className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-muted">
                <ShoppingCart size={18} />
                Cart
              </Link>
              <Link to="/login" className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-muted">
                <LogIn size={18} />
                Login
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
