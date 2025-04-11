
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

// MongoDB models
export interface MongoProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair' | 'Used';
  imageUrl: string;
  sellerId: string;
  createdAt: string;
}

// Converter functions to transform MongoDB data to our app models
export const mongoProductToProduct = (mongoProduct: MongoProduct): Product => ({
  id: mongoProduct._id,
  name: mongoProduct.name,
  description: mongoProduct.description,
  price: mongoProduct.price,
  category: mongoProduct.category as Category,
  condition: mongoProduct.condition,
  imageUrl: mongoProduct.imageUrl,
  sellerId: mongoProduct.sellerId,
  createdAt: new Date(mongoProduct.createdAt)
});
