
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/thrift-store';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
let db;

const connectToMongoDB = async () => {
  try {
    const client = await MongoClient.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    db = client.db();
    
    // Create indexes for better search performance
    await db.collection('products').createIndex({ name: 'text', description: 'text' });
    
    // Check if we have categories collection, if not create it
    const categoriesCount = await db.collection('categories').countDocuments();
    if (categoriesCount === 0) {
      const defaultCategories = [
        'Clothing', 'Accessories', 'Home Goods', 'Electronics',
        'Books', 'Vintage', 'Collectibles', 'Art', 'Other'
      ];
      await db.collection('categories').insertMany(
        defaultCategories.map(category => ({ name: category }))
      );
    }
    
    // Check if we have products, if not add sample products
    const productsCount = await db.collection('products').countDocuments();
    if (productsCount === 0) {
      await seedSampleProducts();
    }
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Seed sample products
const seedSampleProducts = async () => {
  const sampleProducts = [
    {
      name: 'Vintage Leather Jacket',
      description: 'A beautiful brown leather jacket from the 70s in excellent condition. Perfect for fall weather.',
      price: 89.99,
      category: 'Clothing',
      condition: 'Good',
      imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      sellerId: 'user1',
      createdAt: new Date().toISOString(),
    },
    {
      name: 'Retro Record Player',
      description: 'Fully functional vintage record player from the 60s. Recently serviced and ready to play your vinyl collection.',
      price: 149.99,
      category: 'Electronics',
      condition: 'Fair',
      imageUrl: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      sellerId: 'user2',
      createdAt: new Date().toISOString(),
    },
    // Add the rest of the sample products here
    {
      name: 'Mid-Century Coffee Table',
      description: 'Authentic mid-century modern coffee table with tapered legs and walnut finish. Minor scratches but overall great condition.',
      price: 199.99,
      category: 'Home Goods',
      condition: 'Good',
      imageUrl: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      sellerId: 'user3',
      createdAt: new Date().toISOString(),
    },
    {
      name: 'Antique Brass Lamp',
      description: 'Beautiful antique brass table lamp with original glass shade. Rewired and safe to use.',
      price: 75.00,
      category: 'Home Goods',
      condition: 'Good',
      imageUrl: 'https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      sellerId: 'user2',
      createdAt: new Date().toISOString(),
    },
    {
      name: 'Vintage Polaroid Camera',
      description: 'Working Polaroid camera from the 80s. Tested and works perfectly with new film.',
      price: 65.00,
      category: 'Electronics',
      condition: 'Like New',
      imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      sellerId: 'user4',
      createdAt: new Date().toISOString(),
    },
  ];

  await db.collection('products').insertMany(sampleProducts);
  console.log('Sample products seeded');
};

// API Routes

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await db.collection('products').find().toArray();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await db.collection('products').findOne({
      _id: new ObjectId(req.params.id)
    });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get products by category
app.get('/api/products/category/:category', async (req, res) => {
  try {
    const products = await db.collection('products').find({
      category: req.params.category
    }).toArray();
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search products
app.get('/api/products/search', async (req, res) => {
  try {
    const query = req.query.q || '';
    
    let products;
    if (query) {
      products = await db.collection('products').find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ]
      }).toArray();
    } else {
      products = await db.collection('products').find().toArray();
    }
    
    res.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create product
app.post('/api/products', async (req, res) => {
  try {
    const { name, description, price, category, condition, imageUrl, sellerId } = req.body;
    
    // Validate required fields
    if (!name || !description || !price || !category || !condition) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const newProduct = {
      name,
      description,
      price,
      category,
      condition,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1613338027484-57b8061f3d09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=646&q=80',
      sellerId: sellerId || 'current-user',
      createdAt: new Date().toISOString()
    };
    
    const result = await db.collection('products').insertOne(newProduct);
    const insertedProduct = await db.collection('products').findOne({ _id: result.insertedId });
    
    res.status(201).json(insertedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await db.collection('categories').find().toArray();
    res.json(categories.map(cat => cat.name));
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
const startServer = async () => {
  await connectToMongoDB();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
