
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair' | 'Used';
  imageUrl: string;
  sellerId: string;
  createdAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export type Category = 
  | 'Clothing'
  | 'Accessories'
  | 'Home Goods'
  | 'Electronics'
  | 'Books'
  | 'Vintage'
  | 'Collectibles'
  | 'Art'
  | 'Other';
