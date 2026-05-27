// routes/orders.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import Models
const Product = require('../models/Product');
const Order = require('../models/Order');

// Import Middleware
const authenticateToken = require('../middleware/authMiddleware');

// ============================================
// HELPER FUNCTION - Generate Order Number
// ============================================
const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp}-${random}`;
};

// ============================================
// ORDER ROUTES
// ============================================

// 1. CREATE ORDER
router.post('/', authenticateToken, async (req, res) => {
  try {
    console.log('📦 Creating order...');
    console.log('User ID:', req.user.id);
    console.log('Request body:', req.body);

    const { customer, items, shippingCost, tax, discount, paymentMethod, customerNotes } = req.body;

    // Validation
    if (!customer || !customer.name || !customer.phone) {
      return res.status(400).json({ message: 'Customer information is required' });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must have at least one item' });
    }

    let subtotal = 0;
    const orderItems = [];

    // Process each item
    for (const item of items) {
      console.log('Processing item:', item);

      const product = await Product.findById(item.productId);
      
      if (!product) {
        return res.status(404).json({ 
          message: `Product not found: ${item.productId}` 
        });
      }

      console.log('Found product:', product.name);

      // Check stock for in-stock products
      if (product.sellingMode === 'in-stock' && product.stockQuantity < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}. Available: ${product.stockQuantity}, Requested: ${item.quantity}` 
        });
      }

      const itemTotal = product.regularPrice * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: product._id,
        productName: product.name,
        productImage: product.images?.[0] || '',
        quantity: item.quantity,
        price: product.regularPrice,
        total: itemTotal
      });

      // Update stock for in-stock products
      if (product.sellingMode === 'in-stock') {
        product.stockQuantity -= item.quantity;
        if (product.stockQuantity === 0) {
          product.status = 'out-of-stock';
        }
        await product.save();
        console.log(`Updated stock for ${product.name}: ${product.stockQuantity}`);
      }
    }

    const totalAmount = subtotal + (shippingCost || 0) + (tax || 0) - (discount || 0);

    // Create order
    const newOrder = new Order({
      sellerId: req.user.id,
      orderNumber: generateOrderNumber(),
      customer,
      items: orderItems,
      subtotal,
      shippingCost: shippingCost || 0,
      tax: tax || 0,
      discount: discount || 0,
      totalAmount,
      paymentMethod: paymentMethod || 'cash',
      customerNotes,
      status: 'pending',
      paymentStatus: 'pending'
    });

    await newOrder.save();

    console.log('✅ Order created:', newOrder.orderNumber);

    res.status(201).json({
      message: 'Order created successfully',
      order: newOrder
    });

  } catch (error) {
    console.error('❌ Create order error:', error);
    res.status(500).json({ 
      message: 'Failed to create order',
      error: error.message 
    });
  }
});

// 2. GET ALL ORDERS
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log('📋 Fetching orders for user:', req.user.id);

    const { status, paymentStatus } = req.query;
    
    const filter = { sellerId: req.user.id };
    
    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const orders = await Order.find(filter)
      .populate('items.productId', 'name images')
      .sort({ createdAt: -1 });

    console.log(`✅ Found ${orders.length} orders`);

    res.json({
      message: 'Orders retrieved successfully',
      count: orders.length,
      orders
    });

  } catch (error) {
    console.error('❌ Get orders error:', error);
    res.status(500).json({ 
      message: 'Failed to retrieve orders',
      error: error.message 
    });
  }
});

// 3. GET SINGLE ORDER
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    console.log('📄 Fetching order:', req.params.id);

    const order = await Order.findOne({ 
      _id: req.params.id,
      sellerId: req.user.id
    }).populate('items.productId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    console.log('✅ Order found:', order.orderNumber);

    res.json({
      message: 'Order retrieved successfully',
      order
    });

  } catch (error) {
    console.error('❌ Get order error:', error);
    res.status(500).json({ 
      message: 'Failed to retrieve order',
      error: error.message 
    });
  }
});

// 4. UPDATE ORDER STATUS
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    console.log('🔄 Updating order status:', req.params.id);

    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findOne({ 
      _id: req.params.id,
      sellerId: req.user.id
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    order.updatedAt = new Date();

    if (status === 'delivered') {
      order.deliveredAt = new Date();
      order.paymentStatus = 'paid';
    }

    await order.save();

    console.log('✅ Order status updated:', order.orderNumber, '->', status);

    res.json({
      message: 'Order status updated successfully',
      order
    });

  } catch (error) {
    console.error('❌ Update status error:', error);
    res.status(500).json({ 
      message: 'Failed to update order status',
      error: error.message 
    });
  }
});

// 5. UPDATE PAYMENT STATUS
router.patch('/:id/payment', authenticateToken, async (req, res) => {
  try {
    console.log('💳 Updating payment status:', req.params.id);

    const { paymentStatus } = req.body;

    const validStatuses = ['pending', 'paid', 'failed', 'refunded'];
    if (!validStatuses.includes(paymentStatus)) {
      return res.status(400).json({ message: 'Invalid payment status' });
    }

    const order = await Order.findOne({ 
      _id: req.params.id,
      sellerId: req.user.id
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.paymentStatus = paymentStatus;
    order.updatedAt = new Date();

    await order.save();

    console.log('✅ Payment status updated:', order.orderNumber, '->', paymentStatus);

    res.json({
      message: 'Payment status updated successfully',
      order
    });

  } catch (error) {
    console.error('❌ Update payment error:', error);
    res.status(500).json({ 
      message: 'Failed to update payment status',
      error: error.message 
    });
  }
});

// 6. DELETE ORDER
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    console.log('🗑️ Deleting order:', req.params.id);

    const order = await Order.findOneAndDelete({ 
      _id: req.params.id,
      sellerId: req.user.id
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    console.log('✅ Order deleted:', order.orderNumber);

    res.json({
      message: 'Order deleted successfully',
      order
    });

  } catch (error) {
    console.error('❌ Delete order error:', error);
    res.status(500).json({ 
      message: 'Failed to delete order',
      error: error.message 
    });
  }
});

// 7. GET ORDER STATISTICS
router.get('/stats/dashboard', authenticateToken, async (req, res) => {
  try {
    console.log('📊 Fetching order statistics');

    const orders = await Order.find({ sellerId: req.user.id });
    
    const stats = {
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      processingOrders: orders.filter(o => o.status === 'processing').length,
      shippedOrders: orders.filter(o => o.status === 'shipped').length,
      deliveredOrders: orders.filter(o => o.status === 'delivered').length,
      cancelledOrders: orders.filter(o => o.status === 'cancelled').length,
      totalRevenue: orders
        .filter(o => o.paymentStatus === 'paid')
        .reduce((sum, o) => sum + o.totalAmount, 0)
        .toFixed(2),
      pendingPayments: orders
        .filter(o => o.paymentStatus === 'pending')
        .reduce((sum, o) => sum + o.totalAmount, 0)
        .toFixed(2)
    };

    console.log('✅ Statistics:', stats);

    res.json(stats);

  } catch (error) {
    console.error('❌ Get stats error:', error);
    res.status(500).json({ 
      message: 'Failed to retrieve statistics',
      error: error.message 
    });
  }
});

module.exports = router;