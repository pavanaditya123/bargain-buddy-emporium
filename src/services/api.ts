
import axios from 'axios';
import { Product, User, Category } from '@/types';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL
});

// Products
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const fetchProductsByCategory = async (category: Category): Promise<Product[]> => {
  const response = await api.get(`/products/category/${category}`);
  return response.data;
};

export const fetchCategories = async (): Promise<Category[]> => {
  // Categories are predefined in the Product model
  return [
    'Clothing', 'Accessories', 'Home Goods', 'Electronics',
    'Books', 'Vintage', 'Collectibles', 'Art', 'Other'
  ];
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const response = await api.get(`/products/search/${query}`);
  return response.data;
};

export const createProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'sellerId'>): Promise<Product> => {
  // In a real app, we'd get the sellerId from the authenticated user
  const mockSellerId = '60f1a5b3b9f1e026f8b4c123'; // This would come from auth context
  
  const productWithSellerId = {
    ...product,
    sellerId: mockSellerId
  };
  
  const response = await api.post('/products', productWithSellerId);
  return response.data;
};

// Users
export const registerUser = async (userData: { name: string; email: string; password: string; avatar?: string }): Promise<{ token: string; user: User }> => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const loginUser = async (credentials: { email: string; password: string }): Promise<{ token: string; user: User }> => {
  const response = await api.post('/users/login', credentials);
  return response.data;
};

// Cart
export const fetchUserCart = async (userId: string): Promise<{ items: { product: Product; quantity: number }[] }> => {
  const response = await api.get(`/cart/${userId}`);
  return response.data;
};

export const addToCart = async (userId: string, productId: string, quantity: number = 1): Promise<any> => {
  const response = await api.post('/cart/add', { userId, productId, quantity });
  return response.data;
};

export const updateCartItem = async (userId: string, productId: string, quantity: number): Promise<any> => {
  const response = await api.put('/cart/update', { userId, productId, quantity });
  return response.data;
};

export const removeFromCart = async (userId: string, productId: string): Promise<any> => {
  const response = await api.delete('/cart/remove', { data: { userId, productId } });
  return response.data;
};

export const clearCart = async (userId: string): Promise<any> => {
  const response = await api.delete(`/cart/clear/${userId}`);
  return response.data;
};
