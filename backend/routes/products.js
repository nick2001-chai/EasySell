// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Middleware (make sure you import this from your auth file)
const authenticateToken = require('../middleware/authMiddleware');

// 1. CREATE PRODUCT
router.post('/', authenticateToken, async (req, res) => {
  try {
    console.log('Creating product for user:', req.user.id);
    console.log('Product data:', req.body);

    const productData = {
      ...req.body,
      userId: req.user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const newProduct = new Product(productData);
    await newProduct.save();

    console.log('Product created successfully:', newProduct._id);

    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct
    });

  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ 
      message: 'Failed to create product',
      error: error.message 
    });
  }
});

// 2. GET ALL PRODUCTS
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log('Fetching products for user:', req.user.id);

    const products = await Product.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    console.log(`Found ${products.length} products`);

    res.json({
      message: 'Products retrieved successfully',
      count: products.length,
      products
    });

  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ 
      message: 'Failed to retrieve products',
      error: error.message 
    });
  }
});

// 3. GET SINGLE PRODUCT
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const product = await Product.findOne({ 
      _id: req.params.id,
      userId: req.user.id
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      message: 'Product retrieved successfully',
      product
    });

  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ 
      message: 'Failed to retrieve product',
      error: error.message 
    });
  }
});

// 4. UPDATE PRODUCT
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    console.log('Updating product:', req.params.id);

    const product = await Product.findOne({ 
      _id: req.params.id,
      userId: req.user.id
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    Object.assign(product, req.body);
    product.updatedAt = new Date();
    
    await product.save();

    console.log('Product updated successfully');

    res.json({
      message: 'Product updated successfully',
      product
    });

  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ 
      message: 'Failed to update product',
      error: error.message 
    });
  }
});

// 5. DELETE PRODUCT
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    console.log('Deleting product:', req.params.id);

    const product = await Product.findOneAndDelete({ 
      _id: req.params.id,
      userId: req.user.id
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    console.log('Product deleted successfully');

    res.json({
      message: 'Product deleted successfully',
      product
    });

  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ 
      message: 'Failed to delete product',
      error: error.message 
    });
  }
});

module.exports = router;