
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart, updateCartItem, clearCart as apiClearCart, fetchUserCart } from '@/services/api';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  
  // Mock user ID - in a real app, this would come from authentication
  const mockUserId = "60f1a5b3b9f1e026f8b4c123";

  // Load cart from API on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await fetchUserCart(mockUserId);
        if (response && response.items) {
          setCartItems(response.items.map(item => ({
            product: item.product,
            quantity: item.quantity
          })));
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
        // Fallback to localStorage if API fails
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          try {
            setCartItems(JSON.parse(savedCart));
          } catch (error) {
            console.error('Failed to parse saved cart:', error);
          }
        }
      }
    };
    
    loadCart();
  }, []);

  // Save cart to localStorage as backup when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (product: Product) => {
    try {
      await apiAddToCart(mockUserId, product.id, 1);
      
      // Update local state
      setCartItems(prev => {
        const existingItem = prev.find(item => item.product.id === product.id);
        
        if (existingItem) {
          return prev.map(item => 
            item.product.id === product.id 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prev, { product, quantity: 1 }];
        }
      });
      
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      await apiRemoveFromCart(mockUserId, productId);
      
      // Update local state
      setCartItems(prev => prev.filter(item => item.product.id !== productId));
      
      toast({
        title: "Removed from Cart",
        description: "Item has been removed from your cart.",
      });
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    try {
      await updateCartItem(mockUserId, productId, quantity);
      
      // Update local state
      setCartItems(prev => 
        prev.map(item => 
          item.product.id === productId 
            ? { ...item, quantity }
            : item
        )
      );
    } catch (error) {
      console.error("Failed to update cart:", error);
      toast({
        title: "Error",
        description: "Failed to update cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    try {
      await apiClearCart(mockUserId);
      
      // Update local state
      setCartItems([]);
      
      toast({
        title: "Cart Cleared",
        description: "All items have been removed from your cart.",
      });
    } catch (error) {
      console.error("Failed to clear cart:", error);
      toast({
        title: "Error",
        description: "Failed to clear cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );

  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity, 
    0
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
