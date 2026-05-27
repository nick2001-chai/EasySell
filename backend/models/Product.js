// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // User who created the product
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Basic Info
  name: {
    type: String,
    required: true,
    trim: true
  },
  sku: {
    type: String,
    unique: true,
    immutable: true, // 🔒 cannot be changed after creation
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: true
  },

  // Selling Mode
  sellingMode: {
    type: String,
    enum: ['in-stock', 'pre-order'],
    default: 'in-stock'
  },

  // Pricing
  regularPrice: {
    type: Number,
    required: true,
    min: 0
  },
  salePrice: {
    type: Number,
    min: 0
  },

  // Stock
  stockQuantity: {
    type: Number,
    default: 0,
    min: 0
  },

  // Images - store as array of base64 strings or URLs
  images: [{
    type: String
  }],

  // Variants
  variants: [{
    size: String,
    color: String,
    price: Number,
    stock: Number
  }],

  // Publishing platforms
  platforms: {
    facebook: { type: Boolean, default: false },
    instagram: { type: Boolean, default: false },
    tiktok: { type: Boolean, default: false },
    whatsapp: { type: Boolean, default: false }
  },

  // Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'out-of-stock'],
    default: 'active'
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);