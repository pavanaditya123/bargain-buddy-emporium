
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  condition: 'New' | 'Like New' | 'Good' | 'Fair' | 'Used';
  imageUrl: string;
  sellerId: string;
  createdAt: Date;
  _id?: string; // For MongoDB compatibility
}

export interface CartItem {
  product: Product;
  quantity: number;
  _id?: string; // For MongoDB compatibility
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  _id?: string; // For MongoDB compatibility
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
