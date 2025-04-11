
import { Product, Category, MongoProduct, mongoProductToProduct } from '@/types';

// API base URL - change this to your MongoDB backend URL when deployed
const API_BASE_URL = 'http://localhost:5000/api';

// Fetch products from MongoDB
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    
    const data = await response.json() as MongoProduct[];
    return data.map(mongoProductToProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Return empty array on error
  }
};

// Fetch product by ID from MongoDB
export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    
    const data = await response.json() as MongoProduct;
    return mongoProductToProduct(data);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
};

// Fetch products by category from MongoDB
export const fetchProductsByCategory = async (category: Category): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
    if (!response.ok) throw new Error('Failed to fetch products by category');
    
    const data = await response.json() as MongoProduct[];
    return data.map(mongoProductToProduct);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
};

// Fetch categories from MongoDB
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    
    const data = await response.json() as string[];
    return data as Category[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Fallback to default categories
    return [
      'Clothing', 'Accessories', 'Home Goods', 'Electronics',
      'Books', 'Vintage', 'Collectibles', 'Art', 'Other'
    ];
  }
};

// Search products from MongoDB
export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search products');
    
    const data = await response.json() as MongoProduct[];
    return data.map(mongoProductToProduct);
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};

// Create product (for selling) in MongoDB
export const createProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'sellerId'>): Promise<Product> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...product,
        sellerId: 'current-user', // Replace with actual user ID from auth when implemented
      }),
    });
    
    if (!response.ok) throw new Error('Failed to create product');
    
    const data = await response.json() as MongoProduct;
    return mongoProductToProduct(data);
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};
