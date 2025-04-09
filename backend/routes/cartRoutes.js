
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get user's cart
router.get('/:userId', async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.params.userId }).populate({
      path: 'items.product',
      model: 'Product'
    });
    
    if (!cart) {
      cart = { user: req.params.userId, items: [], total: 0 };
    }
    
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add item to cart
router.post('/add', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    
    // Find user's cart or create if it doesn't exist
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: []
      });
    }
    
    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );
    
    if (existingItemIndex > -1) {
      // Update quantity if product already in cart
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.items.push({
        product: productId,
        quantity
      });
    }
    
    // Save cart
    await cart.save();
    
    // Populate product details and return updated cart
    const updatedCart = await Cart.findById(cart._id).populate({
      path: 'items.product',
      model: 'Product'
    });
    
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update item quantity
router.put('/update', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    
    // Find user's cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Find item in cart
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    // Remove item if quantity is 0, otherwise update quantity
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }
    
    // Save cart
    await cart.save();
    
    // Populate product details and return updated cart
    const updatedCart = await Cart.findById(cart._id).populate({
      path: 'items.product',
      model: 'Product'
    });
    
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove item from cart
router.delete('/remove', async (req, res) => {
  try {
    const { userId, productId } = req.body;
    
    // Find user's cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Remove item from cart
    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );
    
    // Save cart
    await cart.save();
    
    // Populate product details and return updated cart
    const updatedCart = await Cart.findById(cart._id).populate({
      path: 'items.product',
      model: 'Product'
    });
    
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Clear cart
router.delete('/clear/:userId', async (req, res) => {
  try {
    // Find and remove cart
    await Cart.findOneAndDelete({ user: req.params.userId });
    res.json({ message: 'Cart cleared successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
