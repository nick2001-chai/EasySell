// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    // Simplified address for shipping
    shipping: {
      service: { type: String, required: true }, // e.g., "LaoPost", "DHL"
      branch: { type: String, required: true },  // branch or office name
      province: { type: String, required: true } // province or city
    }
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true }
    }
  ],
  shippingCost: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  paymentMethod: { type: String, enum: ['cash', 'card', 'bank_transfer', 'online'], default: 'cash' },
  customerNotes: { type: String, default: '' },
  orderNumber: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
