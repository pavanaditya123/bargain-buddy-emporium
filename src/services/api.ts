
import { Product, User, Category } from '@/types';

// This would normally connect to your MongoDB backend through a Node.js Express API
// For now we're mocking the API calls

const mockCategories: Category[] = [
  'Clothing', 'Accessories', 'Home Goods', 'Electronics',
  'Books', 'Vintage', 'Collectibles', 'Art', 'Other'
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Vintage Leather Jacket',
    description: 'A beautiful brown leather jacket from the 70s in excellent condition. Perfect for fall weather.',
    price: 89.99,
    category: 'Clothing',
    condition: 'Good',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    sellerId: 'user1',
    createdAt: new Date('2023-10-15'),
  },
  {
    id: '2',
    name: 'Retro Record Player',
    description: 'Fully functional vintage record player from the 60s. Recently serviced and ready to play your vinyl collection.',
    price: 149.99,
    category: 'Electronics',
    condition: 'Fair',
    imageUrl: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    sellerId: 'user2',
    createdAt: new Date('2023-09-22'),
  },
  {
    id: '3',
    name: 'Mid-Century Coffee Table',
    description: 'Authentic mid-century modern coffee table with tapered legs and walnut finish. Minor scratches but overall great condition.',
    price: 199.99,
    category: 'Home Goods',
    condition: 'Good',
    imageUrl: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    sellerId: 'user3',
    createdAt: new Date('2023-11-05'),
  },
  {
    id: '4',
    name: 'Antique Brass Lamp',
    description: 'Beautiful antique brass table lamp with original glass shade. Rewired and safe to use.',
    price: 75.00,
    category: 'Home Goods',
    condition: 'Good',
    imageUrl: 'https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    sellerId: 'user2',
    createdAt: new Date('2023-10-30'),
  },
  {
    id: '5',
    name: 'Vintage Polaroid Camera',
    description: 'Working Polaroid camera from the 80s. Tested and works perfectly with new film.',
    price: 65.00,
    category: 'Electronics',
    condition: 'Like New',
    imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    sellerId: 'user4',
    createdAt: new Date('2023-11-10'),
  },
  {
    id: '6',
    name: 'Classic Novels Collection',
    description: 'Set of 10 classic novels including works by Dickens, Austen, and Tolstoy. Vintage hardcover editions.',
    price: 45.00,
    category: 'Books',
    condition: 'Good',
    imageUrl: 'https://images.unsplash.com/photo-1471970394675-613138e45da3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    sellerId: 'user5',
    createdAt: new Date('2023-10-25'),
  },
  {
    id: '7',
    name: 'Embroidered Denim Jacket',
    description: 'One-of-a-kind hand-embroidered vintage denim jacket. Size M, fits true to size.',
    price: 120.00,
    category: 'Clothing',
    condition: 'Good',
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    sellerId: 'user6',
    createdAt: new Date('2023-11-15'),
  },
  {
    id: '8',
    name: 'Vintage Ceramic Vase',
    description: 'Beautiful hand-painted ceramic vase from the 50s. Perfect for a mid-century modern interior.',
    price: 35.00,
    category: 'Home Goods',
    condition: 'Good',
    imageUrl: 'https://images.unsplash.com/photo-1612196808214-b7e239245b10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    sellerId: 'user1',
    createdAt: new Date('2023-11-02'),
  },
];

// Mock fetch products
export const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(mockProducts);
    }, 500);
  });
};

// Mock fetch product by ID
export const fetchProductById = async (id: string): Promise<Product | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = mockProducts.find(p => p.id === id) || null;
      resolve(product);
    }, 300);
  });
};

// Mock fetch products by category
export const fetchProductsByCategory = async (category: Category): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = mockProducts.filter(p => p.category === category);
      resolve(products);
    }, 500);
  });
};

// Mock fetch categories
export const fetchCategories = async (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCategories);
    }, 300);
  });
};

// Mock search products
export const searchProducts = async (query: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = mockProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.description.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 500);
  });
};

// Mock create product (for selling)
export const createProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'sellerId'>): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would be handled by the server
      const newProduct = {
        ...product,
        id: `mock-${Date.now()}`,
        sellerId: 'current-user',
        createdAt: new Date(),
      };
      
      // In a real app, this would be added to the database
      mockProducts.push(newProduct as Product);
      
      resolve(newProduct as Product);
    }, 800);
  });
};
