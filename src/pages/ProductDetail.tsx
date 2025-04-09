
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchProductById } from "@/services/api";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { Heart, Share, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        toast({
          title: "Error",
          description: "Failed to load product details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, toast]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Add the specified quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const getConditionColor = (condition?: Product['condition']) => {
    switch (condition) {
      case 'New': return 'bg-green-500';
      case 'Like New': return 'bg-emerald-500';
      case 'Good': return 'bg-blue-500';
      case 'Fair': return 'bg-amber-500';
      case 'Used': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Skeleton */}
            <Skeleton className="aspect-square w-full rounded-lg" />
            
            {/* Content Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-4 w-1/3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="text-sm text-muted-foreground mb-6">
          <ol className="flex items-center space-x-2">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><span>/</span></li>
            <li><Link to="/shop" className="hover:text-primary">Shop</Link></li>
            <li><span>/</span></li>
            <li><Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-primary">{product.category}</Link></li>
            <li><span>/</span></li>
            <li>{product.name}</li>
          </ol>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-2xl font-semibold text-primary mb-2">
                ${product.price.toFixed(2)}
              </p>
              
              <div className="flex items-center space-x-2 mb-4">
                <Badge className={`${getConditionColor(product.condition)} hover:opacity-90`}>
                  {product.condition}
                </Badge>
                <Badge variant="outline">
                  {product.category}
                </Badge>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            
            {/* Add to Cart */}
            <div className="pt-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-r-none"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    -
                  </Button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-12 h-10 border-y text-center focus:outline-none"
                  />
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-l-none"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button 
                  onClick={handleAddToCart} 
                  className="flex-1 btn-secondary"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                
                <Button variant="outline" size="icon">
                  <Share className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Listed on: {new Date(product.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
