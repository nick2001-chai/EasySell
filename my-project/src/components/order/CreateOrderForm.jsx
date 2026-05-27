// components/Order/CreateOrderForm.js
import React, { useState, useEffect } from 'react';
import Toast from '../common/Toast';
import { Plus, Trash2, ShoppingCart, User, Package, DollarSign, X, Search, CheckCircle } from 'lucide-react';

const API_URL = 'http://127.0.0.1:5000/api';

const CreateOrderForm = ({ onOrderCreated, onViewOrders, error, showToast, toast, closeToast, setError }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdOrderNumber, setCreatedOrderNumber] = useState('');

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    shipping: {
      service: '',  // e.g., dropdown for courier service
      branch: '',   // input or dropdown for branch
      province: ''  // input or dropdown for province
    }
  });

  const [orderItems, setOrderItems] = useState([]);

  const [orderDetails, setOrderDetails] = useState({
    shippingCost: '0',
    tax: '0',
    discount: '0',
    paymentMethod: 'cash',
    customerNotes: ''
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`, {
          headers: getAuthHeaders()
        });
        const data = await response.json();
        if (response.ok) {
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error('Load products error:', error);
      }
    };

    fetchProducts();
  }, []); // ✅ no dependencies, warning gone

  const addProductToOrder = (product) => {
    const existingItem = orderItems.find(item => item.productId === product._id);

    if (existingItem) {
      setOrderItems(orderItems.map(item =>
        item.productId === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setOrderItems([...orderItems, {
        productId: product._id,
        productName: product.name,
        productImage: product.images?.[0] || '',
        quantity: 1,
        price: product.regularPrice,
        total: product.regularPrice
      }]);
    }
  };

  const updateItemQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }

    setOrderItems(orderItems.map(item =>
      item.productId === productId
        ? { ...item, quantity, total: item.price * quantity }
        : item
    ));
  };

  const removeItem = (productId) => {
    setOrderItems(orderItems.filter(item => item.productId !== productId));
  };

  const calculateTotals = () => {
    const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
    const shipping = parseFloat(orderDetails.shippingCost) || 0;
    const tax = parseFloat(orderDetails.tax) || 0;
    const discount = parseFloat(orderDetails.discount) || 0;
    const total = subtotal + shipping + tax - discount;

    return { subtotal, shipping, tax, discount, total };
  };

  const handleSubmit = async () => {
    // Validation
    if (!customer.name || !customer.phone) {
      showToast('error', 'Please fill in all customer information');
      return;
    }

    if (orderItems.length === 0) {
      showToast('error', 'Please add at least one product');
      return;
    }

    // Check token
    const token = localStorage.getItem('token');
    if (!token) {
      showToast('error', 'You are not logged in. Please login first.');
      return;
    }
    setLoading(true);

    try {
      const orderData = {
        customer,
        items: orderItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        shippingCost: parseFloat(orderDetails.shippingCost) || 0,
        tax: parseFloat(orderDetails.tax) || 0,
        discount: parseFloat(orderDetails.discount) || 0,
        paymentMethod: orderDetails.paymentMethod,
        customerNotes: orderDetails.customerNotes
      };

      console.log('🔵 Sending order data:', orderData);

      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(orderData)
      });

      console.log('🔵 Response status:', response.status);

      const data = await response.json();
      console.log('🔵 Response data:', data);

      if (response.ok) {
        console.log('✅ Order created successfully!');
        setCreatedOrderNumber(data.order.orderNumber);
        setShowSuccessModal(true);

        // Reset form
        setCustomer({
          name: '',
          phone: '',
          shipping: { service: '', branch: '', province: '' }
        });
        setOrderItems([]);
        setOrderDetails({
          shippingCost: '0',
          tax: '0',
          discount: '0',
          paymentMethod: 'cash',
          customerNotes: ''
        });
        setCurrentStep(1);
        setError({});

        setTimeout(() => {
          setShowSuccessModal(false);
          onOrderCreated();
        }, 2000);
      } else {
        console.error('❌ Server error:', data);
        showToast('error', '❌ Failed to create order: ' + data.message);
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      showToast('error', '❌ Failed to create order. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totals = calculateTotals();

  const steps = [
    { id: 1, name: 'Customer Info', icon: User },
    { id: 2, name: 'Select Products', icon: Package },
    { id: 3, name: 'Order Details', icon: DollarSign },
    { id: 4, name: 'Review', icon: ShoppingCart }
  ];

  // Validation for customer info step
  const validateStep1 = () => {
    const newErrors = {};

    // Validate name and phone
    if (!customer.name.trim()) newErrors.name = 'Customer name is required';
    if (!customer.phone.trim()) newErrors.phone = 'Customer phone is required';

    // Validate shipping info
    if (!customer.shipping.service.trim()) newErrors.service = 'Transport service is required';
    if (!customer.shipping.branch.trim()) newErrors.branch = 'Branch is required';
    if (!customer.shipping.province.trim()) newErrors.province = 'Province is required';

    setError(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  // Validation for Step 2: Products
  const validateStep2 = () => {
    if (orderItems.length === 0) {
      showToast('warning', '⚠️ Please add at least one product to the order');
      return false;
    }
    return true;
  };

  // Validation for Step 3: Order Details
  const validateStep3 = () => {
    const newErrors = {};

    // Validate shipping cost (must be a valid number, can be 0)
    const shipping = parseFloat(orderDetails.shippingCost);
    if (isNaN(shipping) || shipping < 0) {
      newErrors.shippingCost = 'Shipping cost must be 0 or greater';
    }

    // Validate tax (must be a valid number, can be 0)
    const tax = parseFloat(orderDetails.tax);
    if (isNaN(tax) || tax < 0) {
      newErrors.tax = 'Tax must be 0 or greater';
    }

    // Validate discount (must be a valid number, can be 0)
    const discount = parseFloat(orderDetails.discount);
    if (isNaN(discount) || discount < 0) {
      newErrors.discount = 'Discount must be 0 or greater';
    }

    // Validate payment method
    if (!orderDetails.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }

    setError(newErrors);

    if (Object.keys(newErrors).length > 0) {
      showToast('error', '⚠️ Please fix the errors in order details');
      return false;
    }

    return true;
  };

  // Handle Step Navigation with Validation
  const handleStepClick = (targetStep) => {
    // Allow going back to previous steps
    if (targetStep <= currentStep) {
      setCurrentStep(targetStep);
      return;
    }

    // Validate before moving forward
    let isValid = true;
    let currentValidationStep = currentStep;

    // Validate all steps between current and target
    while (currentValidationStep < targetStep) {
      switch (currentValidationStep) {
        case 1:
          isValid = validateStep1();
          if (!isValid) {
            showToast('warning', '⚠️ Please complete customer info before proceeding');
            return;
          }
          break;
        case 2:
          isValid = validateStep2();
          if (!isValid) {
            return;
          }
          break;
        case 3:
          isValid = validateStep3();
          if (!isValid) {
            return;
          }
          break;
        default:
          break;
      }
      currentValidationStep++;
    }

    // If all validations pass, allow navigation
    if (isValid) {
      setCurrentStep(targetStep);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={closeToast}
          duration={5000}
        />
      )}

      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Order</h1>
            <p className="text-gray-600">Fill in the details to create a new order</p>
          </div>
          <button
            onClick={onViewOrders}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            View All Orders
          </button>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition ${
                      currentStep >= step.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                    onClick={() => handleStepClick(step.id)}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs mt-2 font-semibold ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* Step 1: Customer Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Customer Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={customer.name}
                        onChange={(e) => {
                          setCustomer({ ...customer, name: e.target.value });
                          // Clear error when user starts typing
                          if (error?.name) {
                            setError({ ...error, name: undefined });
                          }
                        }}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          error?.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="John Doe"
                      />
                      {error?.name && (
                        <p className="text-red-500 text-sm mt-1">{error.name}</p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={customer.phone}
                        onChange={(e) => {
                          setCustomer({ ...customer, phone: e.target.value });
                          // Clear error when user starts typing
                          if (error?.phone) {
                            setError({ ...error, phone: undefined });
                          }
                        }}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          error?.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="020 xxxxxxxx"
                      />
                      {error?.phone && (
                        <p className="text-red-500 text-sm mt-1">{error.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Shipping Service */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Transport Service <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={customer.shipping.service}
                      onChange={(e) => {
                        setCustomer({ ...customer, shipping: { ...customer.shipping, service: e.target.value } });
                        // Clear error when user selects
                        if (error?.service) {
                          setError({ ...error, service: undefined });
                        }
                      }}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        error?.service ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select service</option>
                      <option value="LaoPost">LaoPost</option>
                      <option value="DHL">DHL</option>
                      <option value="FedEx">FedEx</option>
                    </select>
                    {error?.service && (
                      <p className="text-red-500 text-sm mt-1">{error.service}</p>
                    )}
                  </div>

                  {/* Branch */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Branch <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={customer.shipping.branch}
                      onChange={(e) => {
                        setCustomer({ ...customer, shipping: { ...customer.shipping, branch: e.target.value } });
                        // Clear error when user starts typing
                        if (error?.branch) {
                          setError({ ...error, branch: undefined });
                        }
                      }}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        error?.branch ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter branch name"
                    />
                    {error?.branch && (
                      <p className="text-red-500 text-sm mt-1">{error.branch}</p>
                    )}
                  </div>

                  {/* Province */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Province <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={customer.shipping.province}
                      onChange={(e) => {
                        setCustomer({ ...customer, shipping: { ...customer.shipping, province: e.target.value } });
                        // Clear error when user starts typing
                        if (error?.province) {
                          setError({ ...error, province: undefined });
                        }
                      }}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        error?.province ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter province"
                    />
                    {error?.province && (
                      <p className="text-red-500 text-sm mt-1">{error.province}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Select Products */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Select Products</h2>

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Search products..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {filteredProducts.map(product => (
                      <div
                        key={product._id}
                        onClick={() => addProductToOrder(product)}
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition"
                      >
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded" />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                            <Package className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.category}</p>
                          <p className="text-lg font-bold text-blue-600">${product.regularPrice}</p>
                        </div>
                        <Plus className="w-5 h-5 text-blue-600" />
                      </div>
                    ))}
                  </div>

                  {filteredProducts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No products found
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Order Details */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Order Details</h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Shipping Cost ($) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={orderDetails.shippingCost}
                        onChange={(e) => {
                          setOrderDetails({ ...orderDetails, shippingCost: e.target.value });
                          // Clear error when user types
                          if (error?.shippingCost) {
                            setError({ ...error, shippingCost: undefined });
                          }
                        }}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          error?.shippingCost ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="0.00"
                      />
                      {error?.shippingCost && (
                        <p className="text-red-500 text-sm mt-1">{error.shippingCost}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tax ($) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={orderDetails.tax}
                        onChange={(e) => {
                          setOrderDetails({ ...orderDetails, tax: e.target.value });
                          // Clear error when user types
                          if (error?.tax) {
                            setError({ ...error, tax: undefined });
                          }
                        }}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          error?.tax ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="0.00"
                      />
                      {error?.tax && (
                        <p className="text-red-500 text-sm mt-1">{error.tax}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Discount ($) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={orderDetails.discount}
                        onChange={(e) => {
                          setOrderDetails({ ...orderDetails, discount: e.target.value });
                          // Clear error when user types
                          if (error?.discount) {
                            setError({ ...error, discount: undefined });
                          }
                        }}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          error?.discount ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="0.00"
                      />
                      {error?.discount && (
                        <p className="text-red-500 text-sm mt-1">{error.discount}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Payment Method <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={orderDetails.paymentMethod}
                      onChange={(e) => {
                        setOrderDetails({ ...orderDetails, paymentMethod: e.target.value });
                        // Clear error when user selects
                        if (error?.paymentMethod) {
                          setError({ ...error, paymentMethod: undefined });
                        }
                      }}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        error?.paymentMethod ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select payment method</option>
                      <option value="cash">Cash</option>
                      <option value="card">Card</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="online">Online Payment</option>
                    </select>
                    {error?.paymentMethod && (
                      <p className="text-red-500 text-sm mt-1">{error.paymentMethod}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Notes (Optional)</label>
                    <textarea
                      rows="4"
                      value={orderDetails.customerNotes}
                      onChange={(e) => setOrderDetails({ ...orderDetails, customerNotes: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Any special instructions..."
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Review Order</h2>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-bold text-gray-800 mb-2">Customer</h3>
                    <p className="text-gray-700">{customer.name}</p>
                    <p className="text-gray-600 text-sm">{customer.phone}</p>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Service:</span> {customer.shipping.service}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Branch:</span> {customer.shipping.branch}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Province:</span> {customer.shipping.province}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Order Items ({orderItems.length})</h3>
                    <div className="space-y-2">
                      {orderItems.map(item => (
                        <div key={item.productId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-semibold">{item.productName}</span>
                          <span className="text-gray-600">x{item.quantity} = ${item.total.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span>Payment Method:</span>
                      <span className="font-semibold capitalize">{orderDetails.paymentMethod}</span>
                    </div>
                    {orderDetails.customerNotes && (
                      <div className="mt-2">
                        <span className="font-semibold">Notes:</span>
                        <p className="text-sm text-gray-600 mt-1">{orderDetails.customerNotes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {currentStep < steps.length ? (
                  <button
                    onClick={() => {
                      // Validate Step 1
                      if (currentStep === 1) {
                        const isValid = validateStep1();
                        if (!isValid) {
                          showToast('error', '⚠️ Please fill in all required fields');
                          return;
                        }
                      }

                      // Validate Step 2
                      if (currentStep === 2) {
                        const isValid = validateStep2();
                        if (!isValid) {
                          return;
                        }
                      }

                      // Validate Step 3
                      if (currentStep === 3) {
                        const isValid = validateStep3();
                        if (!isValid) {
                          return;
                        }
                      }

                      setCurrentStep(Math.min(steps.length, currentStep + 1));
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !customer.name || !customer.phone || orderItems.length === 0}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    title={
                      !customer.name || !customer.phone
                        ? 'Please fill customer information'
                        : orderItems.length === 0
                          ? 'Please add products'
                          : 'Create order'
                    }
                  >
                    {loading ? 'Creating...' : 'Create Order'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>

              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {orderItems.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">No items added</p>
                ) : (
                  orderItems.map(item => (
                    <div key={item.productId} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                      {item.productImage && (
                        <img src={item.productImage} alt={item.productName} className="w-12 h-12 object-cover rounded" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-800 truncate">{item.productName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => updateItemQuantity(item.productId, item.quantity - 1)}
                            className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="text-sm font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateItemQuantity(item.productId, item.quantity + 1)}
                            className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="ml-auto text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="font-bold text-sm">${item.total.toFixed(2)}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">${totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-semibold">${totals.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-semibold">${totals.tax.toFixed(2)}</span>
                </div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount:</span>
                    <span className="font-semibold">-${totals.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span className="text-green-600">${totals.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Created Successfully!</h2>
              <p className="text-gray-600 mb-4">
                Order Number: <span className="font-bold text-blue-600">{createdOrderNumber}</span>
              </p>
              <p className="text-sm text-gray-500">Redirecting to orders list...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateOrderForm;