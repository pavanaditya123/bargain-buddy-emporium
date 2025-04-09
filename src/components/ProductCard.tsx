
import { Product } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const getConditionColor = (condition: Product['condition']) => {
    switch (condition) {
      case 'New': return 'bg-green-500';
      case 'Like New': return 'bg-emerald-500';
      case 'Good': return 'bg-blue-500';
      case 'Fair': return 'bg-amber-500';
      case 'Used': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="product-card group h-full flex flex-col">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.imageUrl}
            alt={product.name}
            className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-white/70 hover:bg-white rounded-full"
        >
          <Heart className="h-5 w-5 text-gray-700" />
        </Button>
        <div className={`absolute bottom-2 left-2 ${getConditionColor(product.condition)} text-white text-xs px-2 py-1 rounded-full`}>
          {product.condition}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-medium text-lg mb-1 hover:text-secondary transition-colors">{product.name}</h3>
          </Link>
          <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <span className="bg-muted px-2 py-0.5 rounded-full text-xs">
              {product.category}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
          <Button 
            onClick={() => addToCart(product)} 
            size="sm" 
            className="btn-secondary"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
