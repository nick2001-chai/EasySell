import { AlertCircle, ArrowLeft, BarChart3, Bell, Calendar, Check, CheckCheck, CheckCircle, Clock, DollarSign, Download, Edit, Eye, Filter, Image, Mail, MapPin, MessageSquare, MoreVertical, Package, Paperclip, Phone, Plus, Printer, RefreshCw, Search, Send, Settings, ShoppingBag, ShoppingCart, Smile, Star, Trash2, TrendingDown, TrendingUp, Truck, Upload, Video, X } from 'lucide-react';
import React, { useState } from 'react';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Login');
  const [selectedChat, setSelectedChat] = useState(null);

  const screens = {
    login: 'Login',
    dashboard: 'Dashboard',
    createProduct: 'Create Product',
    chatInbox: 'Chat Inbox',
    orderDetail: 'Order Detail',
    inventory: 'Inventory',
    notification: 'Notification'
  };

  //***********************************Create product and detail of list product***********************************
  const [viewProduct, setviewProduct] = useState('list'); // 'list' or 'create'
  const [currentStep, setCurrentStep] = useState(1);
  const [sellingMode, setSellingMode] = useState('in-stock');
  const [images, setImages] = useState([]);
  // const [variants, setVariants] = useState([{ size: '', color: '', price: '', stock: '' }]);
  const [variants, setVariants] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    brand: '',
    description: '',
    regularPrice: '',
    salePrice: '',
    stockQuantity: '',
    platforms: { facebook: true, instagram: true, tiktok: false, whatsapp: false }
  });

  // const steps = [
  //   { id: 1, name: 'Basic Info', icon: Package },
  //   { id: 2, name: 'Images & Media', icon: Image },
  //   { id: 3, name: 'Pricing & Variants', icon: DollarSign },
  //   { id: 4, name: 'Shipping & Settings', icon: Truck },
  //   { id: 5, name: 'Publish', icon: Settings }
  // ];

  const steps = [
    { id: 1, name: 'Basic Info', icon: Package },
    { id: 2, name: 'Images', icon: Image },
    { id: 3, name: 'Pricing', icon: DollarSign },
    { id: 4, name: 'Shipping', icon: Truck },
    { id: 5, name: 'Publish', icon: Send },
  ];

  const addVariant = () => {
    setVariants([...variants, { size: '', color: '', price: '', stock: '' }]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  // const handleImageUpload = (e) => {
  //   const files = Array.from(e.target.files);
  //   const newImages = files.map(file => URL.createObjectURL(file));
  //   setImages([...images, ...newImages]);
  // };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateProduct = () => {
    const newProduct = {
      id: Date.now(),
      ...formData,
      sellingMode,
      images,
      variants,
      createdAt: new Date().toISOString()
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...newProduct, id: editingProduct.id } : p));
      setEditingProduct(null);
    } else {
      setProducts(prev => [...prev, newProduct]);
    }

    // Reset form
    setFormData({
      name: '',
      sku: '',
      category: '',
      brand: '',
      description: '',
      regularPrice: '',
      salePrice: '',
      stockQuantity: '',
      platforms: { facebook: true, instagram: true, tiktok: false, whatsapp: false }
    });
    setImages([]);
    setVariants([]);
    setCurrentStep(1);
    setSellingMode('in-stock');
    setviewProduct('list');
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      category: product.category,
      brand: product.brand,
      description: product.description,
      regularPrice: product.regularPrice,
      salePrice: product.salePrice,
      stockQuantity: product.stockQuantity,
      platforms: product.platforms
    });
    setSellingMode(product.sellingMode);
    setImages(product.images);
    setVariants(product.variants);
    setviewProduct('create');
  };

  const handleDeleteProduct = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  //********************************************************************************

  const [timeRange, setTimeRange] = useState('today');

  // Sample data - in real app, fetch from API
  const stats = {
    todayOrders: 12,
    pendingPayments: 5,
    lowStock: 3,
    totalSales: 1240,
    yesterdayOrders: 8,
    weekRevenue: 8540,
    monthRevenue: 32450,
    conversionRate: 24.5,
    avgOrderValue: 103.33
  };

  const recentOrders = [
    { id: '#1045', customer: 'Anna Lee', product: 'Summer Dress', amount: 45, status: 'pending', time: '5 min ago' },
    { id: '#1044', customer: 'John Doe', product: 'Casual Shirt', amount: 32, status: 'processing', time: '15 min ago' },
    { id: '#1043', customer: 'Sarah Kim', product: 'Floral Skirt', amount: 58, status: 'shipped', time: '1 hour ago' },
    { id: '#1042', customer: 'Mike Chen', product: 'Sports Jacket', amount: 120, status: 'delivered', time: '2 hours ago' }
  ];

  const recentMessages = [
    { platform: 'FB', customer: 'Lisa Wong', message: 'Is this still available?', time: '2m ago', unread: true },
    { platform: 'IG', customer: 'Tom Baker', message: 'Can I get a discount?', time: '10m ago', unread: true },
    { platform: 'WA', customer: 'Emma Stone', message: 'When will you ship?', time: '25m ago', unread: false }
  ];

  const topProducts = [
    { name: 'Summer Dress A', sold: 45, revenue: 2250, stock: 12, trend: 'up' },
    { name: 'Casual Shirt B', sold: 38, revenue: 1900, stock: 8, trend: 'up' },
    { name: 'Floral Skirt C', sold: 32, revenue: 1856, stock: 3, trend: 'down' },
    { name: 'Sports Jacket D', sold: 28, revenue: 3360, stock: 15, trend: 'up' }
  ];

  const platformStats = [
    { platform: 'Facebook', orders: 45, revenue: 4680, color: 'blue' },
    { platform: 'Instagram', orders: 38, revenue: 3920, color: 'pink' },
    { platform: 'WhatsApp', orders: 22, revenue: 2280, color: 'green' },
    { platform: 'TikTok', orders: 15, revenue: 1560, color: 'purple' }
  ];

  const orderPipeline = [
    { status: 'Pending', count: 8, color: 'yellow' },
    { status: 'Processing', count: 12, color: 'blue' },
    { status: 'Shipped', count: 15, color: 'purple' },
    { status: 'Delivered', count: 45, color: 'green' }
  ];

  const [_selectedChat, _setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const conversations = [
    {
      id: 1,
      platform: 'FB',
      platformColor: 'blue',
      customerName: 'Anna Lee',
      customerId: 'anna.lee.123',
      lastMessage: 'Is this dress still available?',
      timestamp: '2m ago',
      unread: 3,
      status: 'inquiry',
      avatar: 'AL',
      online: true,
      messages: [
        { id: 1, sender: 'customer', text: 'Hi! I saw your Summer Dress on Facebook', time: '10:30 AM', read: true },
        { id: 2, sender: 'customer', text: 'Is this still available?', time: '10:31 AM', read: true },
        { id: 3, sender: 'seller', text: 'Yes! We have it in stock 😊', time: '10:32 AM', read: true },
        { id: 4, sender: 'customer', text: 'What sizes do you have?', time: '10:35 AM', read: false }
      ]
    },
    {
      id: 2,
      platform: 'IG',
      platformColor: 'pink',
      customerName: 'John Doe',
      customerId: '@johndoe',
      lastMessage: 'Can I get a discount for 2 items?',
      timestamp: '15m ago',
      unread: 1,
      status: 'interested',
      avatar: 'JD',
      online: true,
      messages: [
        { id: 1, sender: 'customer', text: 'I want to buy 2 dresses', time: '9:45 AM', read: true },
        { id: 2, sender: 'customer', text: 'Can I get a discount for 2 items?', time: '9:46 AM', read: false }
      ]
    },
    {
      id: 3,
      platform: 'WA',
      platformColor: 'green',
      customerName: 'Sarah Kim',
      customerId: '+1234567890',
      lastMessage: 'When will you ship my order?',
      timestamp: '1h ago',
      unread: 0,
      status: 'confirmed',
      avatar: 'SK',
      online: false,
      messages: [
        { id: 1, sender: 'customer', text: 'I just completed the payment', time: '8:30 AM', read: true },
        { id: 2, sender: 'seller', text: 'Great! I received it. Will ship today.', time: '8:35 AM', read: true },
        { id: 3, sender: 'customer', text: 'When will you ship my order?', time: '9:15 AM', read: true }
      ]
    },
    {
      id: 4,
      platform: 'TT',
      platformColor: 'purple',
      customerName: 'Mike Chen',
      customerId: '@mikechen',
      lastMessage: 'How much is the shipping?',
      timestamp: '2h ago',
      unread: 2,
      status: 'inquiry',
      avatar: 'MC',
      online: false,
      messages: [
        { id: 1, sender: 'customer', text: 'I love this product!', time: '7:20 AM', read: true },
        { id: 2, sender: 'customer', text: 'How much is the shipping?', time: '7:22 AM', read: false }
      ]
    }
  ];

  const messageTemplates = [
    { id: 1, title: 'Greeting', text: 'Hi! Thank you for your message. How can I help you today? 😊' },
    { id: 2, title: 'Product Available', text: 'Yes, this product is still available! Would you like to place an order?' },
    { id: 3, title: 'Pricing Info', text: 'The price is $XX. Free shipping for orders above $50!' },
    { id: 4, title: 'Payment Details', text: 'You can pay via bank transfer or cash on delivery. Please confirm your order and I will send you the details.' },
    { id: 5, title: 'Shipping Time', text: 'We ship within 1-2 business days. Delivery takes 3-5 days depending on your location.' },
    { id: 6, title: 'Order Confirmed', text: 'Your order has been confirmed! I will notify you once it ships. Thank you! 🎉' }
  ];

  const quickActions = [
    { icon: Package, label: 'Create Order', color: 'blue' },
    { icon: DollarSign, label: 'Send Invoice', color: 'green' },
    { icon: Calendar, label: 'Schedule', color: 'purple' },
    { icon: Star, label: 'Mark VIP', color: 'yellow' }
  ];

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || conv.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getPlatformColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-700',
      pink: 'bg-pink-100 text-pink-700',
      green: 'bg-green-100 text-green-700',
      purple: 'bg-purple-100 text-purple-700'
    };
    return colors[color];
  };

  const getStatusBadge = (status) => {
    const badges = {
      inquiry: 'bg-yellow-100 text-yellow-700',
      interested: 'bg-blue-100 text-blue-700',
      confirmed: 'bg-green-100 text-green-700'
    };
    return badges[status];
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Add message logic here
      console.log('Sending:', messageInput);
      setMessageInput('');
    }
  };

  const insertTemplate = (template) => {
    setMessageInput(template.text);
    setShowTemplates(false);
  };

  // Notification
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      icon: ShoppingCart,
      color: 'blue',
      title: 'New Order Received',
      message: 'Anna Lee placed an order for Summer Dress - Order #1045',
      time: '2 minutes ago',
      read: false,
      priority: 'high',
      actionText: 'View Order',
      actionLink: 'order-detail'
    },
    {
      id: 2,
      type: 'payment',
      icon: DollarSign,
      color: 'green',
      title: 'Payment Received',
      message: 'John Doe completed payment of $32 for Order #1044',
      time: '15 minutes ago',
      read: false,
      priority: 'medium',
      actionText: 'View Payment',
      actionLink: 'payment-detail'
    },
    {
      id: 3,
      type: 'message',
      icon: MessageSquare,
      color: 'purple',
      title: 'New Message',
      message: 'Lisa Wong: "Is this still available?"',
      time: '20 minutes ago',
      read: false,
      priority: 'high',
      actionText: 'Reply',
      actionLink: 'messages'
    },
    {
      id: 4,
      type: 'stock',
      icon: AlertCircle,
      color: 'red',
      title: 'Low Stock Alert',
      message: 'Floral Skirt C is running low - Only 3 units left',
      time: '1 hour ago',
      read: true,
      priority: 'high',
      actionText: 'Restock',
      actionLink: 'inventory'
    },
    {
      id: 5,
      type: 'shipping',
      icon: Package,
      color: 'orange',
      title: 'Ready to Ship',
      message: 'Order #1043 is packed and ready for shipping',
      time: '2 hours ago',
      read: true,
      priority: 'medium',
      actionText: 'Ship Now',
      actionLink: 'shipping'
    },
    {
      id: 6,
      type: 'order',
      icon: CheckCheck,
      color: 'green',
      title: 'Order Delivered',
      message: 'Order #1042 has been delivered to Mike Chen',
      time: '3 hours ago',
      read: true,
      priority: 'low',
      actionText: 'View Details',
      actionLink: 'order-detail'
    },
    {
      id: 7,
      type: 'message',
      icon: MessageSquare,
      color: 'purple',
      title: 'New Message',
      message: 'Tom Baker: "Can I get a discount?"',
      time: '4 hours ago',
      read: false,
      priority: 'medium',
      actionText: 'Reply',
      actionLink: 'messages'
    },
    {
      id: 8,
      type: 'payment',
      icon: Clock,
      color: 'yellow',
      title: 'Payment Pending',
      message: 'Reminder: Emma Wilson has not completed payment for Order #1041',
      time: '5 hours ago',
      read: true,
      priority: 'high',
      actionText: 'Send Reminder',
      actionLink: 'payment-reminder'
    },
    {
      id: 9,
      type: 'system',
      icon: TrendingUp,
      color: 'blue',
      title: 'Sales Milestone',
      message: 'Congratulations! You reached $10,000 in total sales this month',
      time: '1 day ago',
      read: true,
      priority: 'low',
      actionText: 'View Stats',
      actionLink: 'dashboard'
    },
    {
      id: 10,
      type: 'stock',
      icon: AlertCircle,
      color: 'red',
      title: 'Out of Stock',
      message: 'Winter Coat E is now out of stock',
      time: '1 day ago',
      read: true,
      priority: 'high',
      actionText: 'Restock',
      actionLink: 'inventory'
    }
  ]);

  const getIconColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      red: 'bg-red-100 text-red-600',
      orange: 'bg-orange-100 text-orange-600',
      yellow: 'bg-yellow-100 text-yellow-600'
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-gray-100 text-gray-700'
    };
    return badges[priority];
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;


  // // Order detail page
  const [view, setView] = useState('overview'); // 'overview' or 'detail'
  const [_selectedOrder, setSelectedOrder] = useState(null);
  const [_showStatusModal, _setShowStatusModal] = useState(false);

  // Sample orders data
  const orders = [
    {
      id: '#1045',
      customer: 'Anna Lee',
      product: 'Summer Dress',
      amount: 45,
      status: 'processing',
      paymentStatus: 'partial',
      paidAmount: 20,
      remainingAmount: 25,
      time: '5 min ago',
      platform: 'Facebook',
      itemCount: 2
    },
    {
      id: '#1044',
      customer: 'John Doe',
      product: 'Casual Shirt',
      amount: 32,
      status: 'pending',
      paymentStatus: 'paid',
      paidAmount: 32,
      remainingAmount: 0,
      time: '15 min ago',
      platform: 'Instagram',
      itemCount: 1
    },
    {
      id: '#1043',
      customer: 'Sarah Kim',
      product: 'Floral Skirt',
      amount: 58,
      status: 'shipped',
      paymentStatus: 'paid',
      paidAmount: 58,
      remainingAmount: 0,
      time: '1 hour ago',
      platform: 'WhatsApp',
      itemCount: 1
    },
    {
      id: '#1042',
      customer: 'Mike Chen',
      product: 'Sports Jacket',
      amount: 120,
      status: 'delivered',
      paymentStatus: 'paid',
      paidAmount: 120,
      remainingAmount: 0,
      time: '2 hours ago',
      platform: 'TikTok',
      itemCount: 1
    }
  ];

  // Full order detail data
  const fullOrderDetail = {
    id: '#1045',
    orderDate: '2024-01-20 10:30 AM',
    customer: {
      name: 'Anna Lee',
      email: 'anna.lee@email.com',
      phone: '+1 (234) 567-8900',
      address: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    platform: 'Facebook',
    items: [
      {
        id: 1,
        name: 'Summer Floral Dress',
        sku: 'DRS-001',
        variant: 'Size M, Blue',
        quantity: 2,
        price: 45,
        image: '🌸'
      }
    ],
    pricing: {
      subtotal: 90,
      shipping: 10,
      tax: 7.20,
      discount: 0,
      total: 107.20
    },
    payment: {
      method: 'Bank Transfer',
      status: 'Partial',
      paidAmount: 50,
      remainingAmount: 57.20,
      transactionId: 'TXN-2024-001234',
      paidDate: '2024-01-20 11:00 AM'
    },
    shipping: {
      method: 'Standard Shipping',
      carrier: 'FedEx',
      trackingNumber: '1234567890',
      estimatedDelivery: '2024-01-25',
      shippingDate: null
    },
    timeline: [
      { status: 'Order Placed', date: '2024-01-20 10:30 AM', completed: true },
      { status: 'Payment Confirmed', date: '2024-01-20 11:00 AM', completed: true },
      { status: 'Processing', date: '2024-01-20 11:30 AM', completed: true, current: true },
      { status: 'Shipped', date: null, completed: false },
      { status: 'Delivered', date: null, completed: false }
    ],
    notes: [
      { id: 1, author: 'Seller', text: 'Customer requested gift wrapping', time: '2024-01-20 10:35 AM' },
      { id: 2, author: 'System', text: 'Payment received via bank transfer', time: '2024-01-20 11:00 AM' }
    ]
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      processing: 'bg-blue-100 text-blue-700',
      shipped: 'bg-purple-100 text-purple-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
      paid: 'bg-green-100 text-green-700',
      partial: 'bg-orange-100 text-orange-700',
      unpaid: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const viewOrderDetail = (order) => {
    setSelectedOrder(order);
    setView('detail');
  };

  // ORDER OVERVIEW (Card/List View)
  const OrderOverview = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Orders</h2>
          <p className="text-gray-600 mt-1">{orders.length} total orders</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            Filter
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Export
          </button>
        </div>
      </div>

      {/* Order Cards */}
      <div className="grid grid-cols-1 gap-4">
        {orders.map((order, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="flex items-start justify-between">
              {/* Left - Order Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{order.id}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus === 'partial' ? 'Partial Payment' : 'Paid'}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Customer</p>
                    <p className="font-semibold text-gray-800">{order.customer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Product</p>
                    <p className="font-semibold text-gray-800">{order.product}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Platform</p>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                      {order.platform}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Time</p>
                    <p className="text-sm text-gray-600">{order.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-gray-800">${order.amount}</p>
                  </div>
                  {order.paymentStatus === 'partial' && (
                    <>
                      <div>
                        <p className="text-xs text-gray-600">Paid</p>
                        <p className="text-lg font-semibold text-green-600">${order.paidAmount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Remaining</p>
                        <p className="text-lg font-semibold text-orange-600">${order.remainingAmount}</p>
                      </div>
                    </>
                  )}
                  <div>
                    <p className="text-xs text-gray-600">Items</p>
                    <p className="text-lg font-semibold text-gray-800">{order.itemCount}</p>
                  </div>
                </div>
              </div>

              {/* Right - Actions */}
              <div className="flex flex-col gap-2 ml-6">
                <button
                  onClick={() => viewOrderDetail(order)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 whitespace-nowrap"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                  <Printer className="w-4 h-4" />
                  Print
                </button>
                {order.paymentStatus === 'partial' && (
                  <button className="px-4 py-2 bg-orange-50 border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-100 transition flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Remind
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // FULL ORDER DETAIL (Expanded View)
  const FullOrderDetail = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView('overview')}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Order {fullOrderDetail.id}</h2>
            <p className="text-gray-600 mt-1">Placed on {fullOrderDetail.orderDate}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
            <Download className="w-4 h-4" />
            Invoice
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Update Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status Timeline */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Order Status</h3>
            <div className="relative">
              {fullOrderDetail.timeline.map((step, index) => (
                <div key={index} className="flex gap-4 pb-8 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-500 text-white' : step.current ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'
                      }`}>
                      {step.completed ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                    </div>
                    {index < fullOrderDetail.timeline.length - 1 && (
                      <div className={`w-0.5 h-full mt-2 ${step.completed ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <h4 className={`font-semibold ${step.current ? 'text-blue-600' : 'text-gray-800'}`}>{step.status}</h4>
                    {step.date && <p className="text-sm text-gray-600 mt-1">{step.date}</p>}
                    {step.current && (
                      <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        Current Step
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Order Items</h3>
            <div className="space-y-4">
              {fullOrderDetail.items.map(item => (
                <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-4xl">
                    {item.image}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">SKU: {item.sku}</p>
                    <p className="text-sm text-gray-600">{item.variant}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                      <span className="text-sm font-semibold text-gray-800">${item.price} each</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800 text-lg">${item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${fullOrderDetail.pricing.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${fullOrderDetail.pricing.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${fullOrderDetail.pricing.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-800 font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>${fullOrderDetail.pricing.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                <p className="font-semibold text-gray-800">{fullOrderDetail.payment.method}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getStatusColor('partial')}`}>
                  Partial Payment
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Paid Amount</p>
                <p className="font-semibold text-green-600">${fullOrderDetail.payment.paidAmount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Remaining</p>
                <p className="font-semibold text-orange-600">${fullOrderDetail.payment.remainingAmount.toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm font-semibold text-orange-800 mb-2">Payment Pending</p>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm font-semibold">
                Send Payment Reminder
              </button>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Shipping Information</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Method</p>
                <p className="font-semibold text-gray-800">{fullOrderDetail.shipping.method}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Carrier</p>
                <p className="font-semibold text-gray-800">{fullOrderDetail.shipping.carrier}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                <p className="font-mono text-sm text-blue-600">{fullOrderDetail.shipping.trackingNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Est. Delivery</p>
                <p className="font-semibold text-gray-800">{fullOrderDetail.shipping.estimatedDelivery}</p>
              </div>
            </div>
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2">
              <Truck className="w-5 h-5" />
              Mark as Shipped
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Customer Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Name</p>
                <p className="font-semibold text-gray-800">{fullOrderDetail.customer.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  Email
                </p>
                <a href={`mailto:${fullOrderDetail.customer.email}`} className="text-blue-600 hover:underline">
                  {fullOrderDetail.customer.email}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  Phone
                </p>
                <a href={`tel:${fullOrderDetail.customer.phone}`} className="text-blue-600 hover:underline">
                  {fullOrderDetail.customer.phone}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Address
                </p>
                <p className="text-gray-800">
                  {fullOrderDetail.customer.address}<br />
                  {fullOrderDetail.customer.city}, {fullOrderDetail.customer.state} {fullOrderDetail.customer.zipCode}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Contact Customer
              </button>
              <button className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Send Invoice
              </button>
              <button className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" />
                Edit Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <div className="text-center mb-8">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">EasySell</h1>
              <p className="text-gray-600 mt-2">Seller Dashboard</p>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Email or Phone"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Login
              </button>
              <div className="flex justify-between text-sm">
                <a href="#" className="text-blue-600 hover:underline">Register</a>
                <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
              </div>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
                <p className="text-gray-600 mt-1">Welcome back! Here's your business overview</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
                <button onClick={() => setCurrentScreen('notification')} className="relative p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    5
                  </span>
                </button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 text-sm font-semibold">Today's Orders</h3>
                  <ShoppingCart className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800">{stats.todayOrders}</p>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-semibold">+50%</span>
                  <span className="text-gray-500">vs yesterday</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 text-sm font-semibold">Pending Payments</h3>
                  <Clock className="w-5 h-5 text-orange-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800">{stats.pendingPayments}</p>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <span className="text-orange-600 font-semibold">${stats.pendingPayments * 45}</span>
                  <span className="text-gray-500">to collect</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 text-sm font-semibold">Total Revenue</h3>
                  <DollarSign className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800">${stats.totalSales}</p>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-semibold">+18%</span>
                  <span className="text-gray-500">this week</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 text-sm font-semibold">Low Stock Alerts</h3>
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800">{stats.lowStock}</p>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <span className="text-red-600 font-semibold">Action needed</span>
                </div>
              </div>
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-linear-to-r from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg text-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold opacity-90">Conversion Rate</h3>
                  <BarChart3 className="w-5 h-5 opacity-75" />
                </div>
                <p className="text-3xl font-bold">{stats.conversionRate}%</p>
                <p className="text-sm opacity-75 mt-1">Inquiries to sales</p>
              </div>

              <div className="bg-linear-to-r from-purple-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold opacity-90">Avg Order Value</h3>
                  <DollarSign className="w-5 h-5 opacity-75" />
                </div>
                <p className="text-3xl font-bold">${stats.avgOrderValue}</p>
                <p className="text-sm opacity-75 mt-1">Per transaction</p>
              </div>

              <div className="bg-linear-to-r from-green-500 to-green-600 p-6 rounded-lg shadow-lg text-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold opacity-90">Customer Satisfaction</h3>
                  <Star className="w-5 h-5 opacity-75" />
                </div>
                <p className="text-3xl font-bold">4.8</p>
                <p className="text-sm opacity-75 mt-1">Average rating</p>
              </div>
            </div>

            {/* Order Pipeline */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Order Pipeline</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {orderPipeline.map((stage, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-full h-24 rounded-lg bg-${stage.color}-100 border-2 border-${stage.color}-300 flex items-center justify-center mb-2`}>
                      <span className={`text-4xl font-bold text-${stage.color}-600`}>{stage.count}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">{stage.status}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Recent Orders</h3>
                  <button onClick={() => setCurrentScreen('orderDetail')} className="text-blue-600 hover:text-blue-700 font-semibold text-sm">View All</button>
                </div>
                <div className="space-y-3">
                  {recentOrders.map((order, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-800">{order.id}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{order.customer} • {order.product}</p>
                        <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">${order.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Messages */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Recent Messages</h3>
                  <button onClick={() => setCurrentScreen('chatInbox')} className="text-blue-600 hover:text-blue-700 font-semibold text-sm">Open Inbox</button>
                </div>
                <div className="space-y-3">
                  {recentMessages.map((msg, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-sm">
                        {msg.platform}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-800">{msg.customer}</span>
                          {msg.unread && (
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{msg.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Top Selling Products</h3>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">View All</button>
                </div>
                <div className="space-y-3">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-800">{product.name}</span>
                          {product.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{product.sold} sold • ${product.revenue} revenue</p>
                        <p className={`text-xs mt-1 ${product.stock < 5 ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
                          Stock: {product.stock} {product.stock < 5 && '⚠️'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platform Performance */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Platform Performance</h3>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">Details</button>
                </div>
                <div className="space-y-3">
                  {platformStats.map((platform, index) => (
                    <div key={index} className="p-4 rounded-lg bg-linear-to-r" style={{ background: `linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))` }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-800">{platform.platform}</span>
                        <span className="text-sm text-gray-600">{platform.orders} orders</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className={`h-2 rounded-full bg-linear-to-r ${getPlatformColor(platform.color)}`}
                          style={{ width: `${(platform.orders / 50) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-sm font-semibold text-gray-700">${platform.revenue}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button onClick={() => setCurrentScreen('chatInbox')} className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition text-center">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-800">Reply Messages</span>
                </button>
                <button className="p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition text-center">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <span className="text-sm font-semibold text-gray-800">Process Orders</span>
                </button>
                <button onClick={() => setCurrentScreen('createProduct')} className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition text-center">
                  <Package className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <span className="text-sm font-semibold text-gray-800">Add Product</span>
                </button>
                <button className="p-4 border-2 border-orange-200 rounded-lg hover:bg-orange-50 transition text-center">
                  <DollarSign className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                  <span className="text-sm font-semibold text-gray-800">Create Invoice</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'createProduct':
        if (viewProduct === 'list') {
          return (
            <div className="max-w-6xl mx-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">My Products</h1>
                  <p className="text-gray-600 mt-1">Manage your product listings</p>
                </div>
                <button
                  onClick={() => setviewProduct('create')}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                >
                  <Plus className="w-5 h-5" />
                  Create New Product
                </button>
              </div>

              {products.length === 0 ? (
                <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                  <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No products yet</h3>
                  <p className="text-gray-500 mb-6">Get started by creating your first product listing</p>
                  <button
                    onClick={() => setviewProduct('create')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Create First Product
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                      <div className="relative h-48 bg-gray-200">
                        {product.images[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-16 h-16 text-gray-400" />
                          </div>
                        )}
                        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${product.sellingMode === 'in-stock'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                          }`}>
                          {product.sellingMode === 'in-stock' ? 'In Stock' : 'Pre-Order'}
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-800 mb-1">{product.name || 'Untitled Product'}</h3>
                        <p className="text-sm text-gray-500 mb-2">{product.category || 'No category'}</p>
                        <div className="flex items-center gap-2 mb-3">
                          {product.salePrice ? (
                            <>
                              <span className="text-xl font-bold text-green-600">${product.salePrice}</span>
                              <span className="text-sm text-gray-400 line-through">${product.regularPrice}</span>
                            </>
                          ) : (
                            <span className="text-xl font-bold text-gray-800">${product.regularPrice || '0.00'}</span>
                          )}
                        </div>
                        {product.sellingMode === 'in-stock' && (
                          <p className="text-sm text-gray-600 mb-4">
                            Stock: {product.stockQuantity || 0} units
                          </p>
                        )}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        }

        return (
          <div className="max-w-5xl mx-auto p-6">
            <button
              onClick={() => {
                setviewProduct('list');
                setEditingProduct(null);
              }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Products
            </button>

            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Product</h2> */}
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {editingProduct ? 'Edit Product' : 'Create New Product'}
              </h2>
              <p className="text-gray-600 mb-6">Fill in all the details to create a professional listing</p>

              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                      <div className="flex flex-col items-center flex-1">
                        <div
                          onClick={() => setCurrentStep(step.id)}
                          className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition ${currentStep >= step.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                            }`}
                        >
                          <step.icon className="w-6 h-6" />
                        </div>
                        <span className={`text-xs mt-2 font-semibold ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                          }`}>
                          {step.name}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`flex-1 h-1 mx-2 ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                          }`}></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Summer Floral Dress"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">SKU / Product Code</label>
                      <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        placeholder="e.g., DRS-001"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Select Category</option>
                      <option>Clothing</option>
                      <option>Accessories</option>
                      <option>Shoes</option>
                      <option>Bags</option>
                      <option>Electronics</option>
                      <option>Home & Living</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      placeholder="Brand name (optional)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="5"
                      placeholder="Describe your product in detail..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Selling Mode *</label>
                    <div className="grid grid-cols-2 gap-4">
                      <label
                        className={`border-2 rounded-lg p-4 cursor-pointer transition ${sellingMode === 'in-stock'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                          }`}
                      >
                        <input
                          type="radio"
                          name="mode"
                          value="in-stock"
                          checked={sellingMode === 'in-stock'}
                          onChange={(e) => setSellingMode(e.target.value)}
                          className="mr-2"
                        />
                        <span className="font-semibold">In-Stock</span>
                        <p className="text-sm text-gray-600 mt-1">Ready to ship immediately</p>
                      </label>
                      <label
                        className={`border-2 rounded-lg p-4 cursor-pointer transition ${sellingMode === 'pre-order'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                          }`}
                      >
                        <input
                          type="radio"
                          name="mode"
                          value="pre-order"
                          checked={sellingMode === 'pre-order'}
                          onChange={(e) => setSellingMode(e.target.value)}
                          className="mr-2"
                        />
                        <span className="font-semibold">Pre-Order</span>
                        <p className="text-sm text-gray-600 mt-1">Product coming soon</p>
                      </label>
                    </div>
                  </div>

                  {sellingMode === 'pre-order' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Pre-Order Deadline *</label>
                        <input
                          type="date"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Arrival Date *</label>
                        <input
                          type="date"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Images & Media */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product Images * (Min 3 images recommended)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-600 font-semibold">Click to upload images</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB each</p>
                      </label>
                    </div>
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                      {images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img src={img} alt={`Product ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          {index === 0 && (
                            <span className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                              Primary
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product Video (Optional)</label>
                    <input
                      type="file"
                      accept="video/*"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <p className="text-xs text-gray-500 mt-1">MP4, MOV up to 50MB</p>
                  </div>
                </div>
              )}

              {/* Step 3: Pricing & Variants */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Regular Price *</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          name="regularPrice"
                          value={formData.regularPrice}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Sale Price</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          name="salePrice"
                          value={formData.salePrice}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    {sellingMode === 'pre-order' && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Deposit Amount *</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <input
                            type="number"
                            name="depositAmount"
                            value={formData.depositAmount}
                            onChange={handleInputChange}
                            placeholder="0.00"
                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {sellingMode === 'in-stock' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity *</label>
                        <input
                          type="number"
                          name="stockQuantity"
                          value={formData.stockQuantity}
                          onChange={handleInputChange}
                          placeholder="0"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Low Stock Alert (Optional)</label>
                        <input
                          type="number"
                          placeholder="e.g., 5"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}

                  {sellingMode === 'pre-order' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Pre-Order Quota</label>
                      <input
                        type="number"
                        placeholder="Maximum number of pre-orders"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-semibold text-gray-700">Product Variants (Optional)</label>
                      <button
                        onClick={addVariant}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        Add Variant
                      </button>
                    </div>
                    <div className="space-y-3">
                      {variants.map((variant, index) => (
                        <div key={index} className="grid grid-cols-5 gap-3 p-3 border border-gray-200 rounded-lg">
                          <input
                            type="text"
                            placeholder="Size (e.g., S)"
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Color"
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                          <input
                            type="number"
                            placeholder="Price"
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                          <input
                            type="number"
                            placeholder="Stock"
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                          <button
                            onClick={() => removeVariant(index)}
                            className="text-red-600 hover:text-red-700 font-semibold text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Shipping & Settings */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (kg)</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="0.0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Length (cm)</label>
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Width (cm)</label>
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Shipping Options</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input type="checkbox" defaultChecked />
                        <span>Standard Shipping - $5.00 (3-5 days)</span>
                      </label>
                      <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input type="checkbox" />
                        <span>Express Shipping - $12.00 (1-2 days)</span>
                      </label>
                      <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input type="checkbox" />
                        <span>Free Shipping - Orders above $50</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Return Policy</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>No Returns</option>
                      <option>7 Days Return</option>
                      <option>14 Days Return</option>
                      <option>30 Days Return</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tax Settings</label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        <span>Apply Tax</span>
                      </label>
                      <input
                        type="number"
                        placeholder="Tax %"
                        className="w-32 px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Publish */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Select Platforms to Publish *</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="flex items-center gap-3 p-4 border-2 border-blue-200 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition">
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                        <div>
                          <span className="font-semibold text-gray-800">Facebook</span>
                          <p className="text-xs text-gray-600">Post to your Facebook page</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-4 border-2 border-pink-200 bg-pink-50 rounded-lg cursor-pointer hover:bg-pink-100 transition">
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                        <div>
                          <span className="font-semibold text-gray-800">Instagram</span>
                          <p className="text-xs text-gray-600">Post to your Instagram feed</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                        <input type="checkbox" className="w-5 h-5" />
                        <div>
                          <span className="font-semibold text-gray-800">TikTok</span>
                          <p className="text-xs text-gray-600">Post to your TikTok shop</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-4 border-2 border-green-200 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition">
                        <input type="checkbox" className="w-5 h-5" />
                        <div>
                          <span className="font-semibold text-gray-800">WhatsApp</span>
                          <p className="text-xs text-gray-600">Share via WhatsApp Status</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Post Caption</label>
                    <textarea
                      rows="4"
                      placeholder="Write an engaging caption for social media..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Hashtags</label>
                    <input
                      type="text"
                      placeholder="#fashion #dress #sale"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Publish Schedule</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Publish Now</option>
                        <option>Schedule for Later</option>
                        <option>Save as Draft</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Schedule Date & Time</label>
                      <input
                        type="datetime-local"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
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

                <div className="text-sm text-gray-600">
                  Step {currentStep} of {steps.length}
                </div>

                {currentStep < steps.length ? (
                  <button
                    onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={handleCreateProduct}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                  >
                    {editingProduct ? 'Update Product' : 'Create & Publish Product'}
                  </button>
                )}
              </div>
            </div>
          </div>
        );

      case 'chatInbox':
        // return (
        //   <div className="bg-white rounded-lg shadow-lg">
        //     <div className="p-4 border-b">
        //       <div className="relative">
        //         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        //         <input
        //           type="text"
        //           placeholder="Search chats..."
        //           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
        //         />
        //       </div>
        //     </div>

        //     <div className="divide-y">
        //       {chats.map(chat => (
        //         <div
        //           key={chat.id}
        //           onClick={() => {
        //             setSelectedChat(chat);
        //             setCurrentScreen('chatDetail');
        //           }}
        //           className="p-4 hover:bg-gray-50 cursor-pointer transition"
        //         >
        //           <div className="flex items-center justify-between">
        //             <div className="flex items-center gap-3">
        //               <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
        //                 <span className="text-sm font-semibold text-blue-600">{chat.platform}</span>
        //               </div>
        //               <div>
        //                 <h4 className="font-semibold text-gray-800">{chat.name}</h4>
        //                 <p className="text-sm text-gray-600">{chat.message}</p>
        //               </div>
        //             </div>
        //             <span className={`text-xs px-3 py-1 rounded-full ${chat.status === 'Inquiry' ? 'bg-yellow-100 text-yellow-700' :
        //               chat.status === 'Interested' ? 'bg-blue-100 text-blue-700' :
        //                 'bg-green-100 text-green-700'
        //               }`}>
        //               {chat.status}
        //             </span>
        //           </div>
        //         </div>
        //       ))}
        //     </div>
        //   </div>
        // );
        return (
          <div className="flex h-[calc(100vh-8rem)] bg-gray-50 rounded-lg shadow-lg overflow-hidden">
            {/* Conversations List */}
            <div className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Messages</h2>

                {/* Search */}
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Filter */}
                <div className="flex gap-2">
                  {['all', 'inquiry', 'interested', 'confirmed'].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setFilterStatus(filter)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition ${filterStatus === filter
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map(conv => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedChat(conv)}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition ${selectedChat?.id === conv.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-full ${getPlatformColor(conv.platformColor)} flex items-center justify-center font-bold text-sm`}>
                          {conv.avatar}
                        </div>
                        {conv.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                        <div className={`absolute -top-1 -left-1 w-5 h-5 ${getPlatformColor(conv.platformColor)} rounded-full flex items-center justify-center text-xs font-bold`}>
                          {conv.platform}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-800 truncate">{conv.customerName}</h4>
                          <span className="text-xs text-gray-500">{conv.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate mb-1">{conv.lastMessage}</p>
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(conv.status)}`}>
                            {conv.status}
                          </span>
                          {conv.unread > 0 && (
                            <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            {selectedChat ? (
              <div className="flex-1 flex flex-col bg-white">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-linear-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className={`w-10 h-10 rounded-full ${getPlatformColor(selectedChat.platformColor)} flex items-center justify-center font-bold text-sm`}>
                          {selectedChat.avatar}
                        </div>
                        {selectedChat.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{selectedChat.customerName}</h3>
                        <p className="text-xs text-gray-600">{selectedChat.customerId}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPlatformColor(selectedChat.platformColor)}`}>
                        {selectedChat.platform}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-white rounded-lg transition">
                        <Phone className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-lg transition">
                        <Video className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-lg transition">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Bar */}
                <div className="p-3 border-b border-gray-200 bg-gray-50">
                  <div className="flex gap-2 overflow-x-auto">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        className={`flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:shadow-md transition whitespace-nowrap text-sm`}
                      >
                        <action.icon className={`w-4 h-4 text-${action.color}-600`} />
                        <span className="font-semibold text-gray-700">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {selectedChat.messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'seller' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs md:max-w-md ${msg.sender === 'seller' ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`px-4 py-3 rounded-2xl ${msg.sender === 'seller'
                            ? 'bg-blue-600 text-white rounded-tr-sm'
                            : 'bg-white text-gray-800 rounded-tl-sm shadow-md'
                            }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                        </div>
                        <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'seller' ? 'justify-end' : 'justify-start'}`}>
                          <span className="text-xs text-gray-500">{msg.time}</span>
                          {msg.sender === 'seller' && (
                            msg.read ? (
                              <CheckCheck className="w-3 h-3 text-blue-600" />
                            ) : (
                              <Check className="w-3 h-3 text-gray-400" />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Templates Panel */}
                {showTemplates && (
                  <div className="p-3 border-t border-gray-200 bg-white max-h-48 overflow-y-auto">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800 text-sm">Quick Templates</h4>
                      <button onClick={() => setShowTemplates(false)} className="text-gray-500 hover:text-gray-700">
                        ×
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {messageTemplates.map(template => (
                        <button
                          key={template.id}
                          onClick={() => insertTemplate(template)}
                          className="text-left p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition"
                        >
                          <p className="font-semibold text-sm text-gray-800 mb-1">{template.title}</p>
                          <p className="text-xs text-gray-600 line-clamp-2">{template.text}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-end gap-2">
                    <button
                      onClick={() => setShowTemplates(!showTemplates)}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Quick Templates"
                    >
                      <Clock className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                      <Image className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                      <Paperclip className="w-5 h-5" />
                    </button>

                    <div className="flex-1 relative">
                      <textarea
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        placeholder="Type your message..."
                        rows="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                      <Smile className="w-5 h-5" />
                    </button>

                    <button
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose a chat from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        );

      case 'orderDetail':
        // return (
        //   <div className="max-w-7xl mx-auto space-y-6">
        //     {/* Header */}
        //     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        //       <div className="flex items-center gap-3">
        //         <button
        //           onClick={() => window.history.back()}
        //           className="p-2 hover:bg-gray-100 rounded-lg transition"
        //         >
        //           <ArrowLeft className="w-5 h-5" />
        //         </button>
        //         <div>
        //           <h2 className="text-3xl font-bold text-gray-800">Order {order.id}</h2>
        //           <p className="text-gray-600 mt-1">Placed on {order.orderDate}</p>
        //         </div>
        //       </div>
        //       <div className="flex gap-2">
        //         <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
        //           <Printer className="w-4 h-4" />
        //           Print
        //         </button>
        //         <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
        //           <Download className="w-4 h-4" />
        //           Download Invoice
        //         </button>
        //         <button
        //           onClick={() => setShowStatusModal(true)}
        //           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        //         >
        //           <RefreshCw className="w-4 h-4" />
        //           Update Status
        //         </button>
        //       </div>
        //     </div>

        //     {/* Status Update Modal */}
        //     {showStatusModal && (
        //       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        //         <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        //           <h3 className="text-xl font-bold text-gray-800 mb-4">Update Order Status</h3>
        //           <div className="space-y-2 mb-6">
        //             {statusOptions.map(option => (
        //               <button
        //                 key={option.value}
        //                 onClick={() => updateOrderStatus(option.value)}
        //                 className={`w-full p-4 rounded-lg border-2 text-left font-semibold transition ${orderStatus === option.value
        //                   ? getStatusColorOrderDetail(option.value)
        //                   : 'border-gray-200 hover:border-gray-300'
        //                   }`}
        //               >
        //                 {option.label}
        //               </button>
        //             ))}
        //           </div>
        //           <button
        //             onClick={() => setShowStatusModal(false)}
        //             className="w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        //           >
        //             Cancel
        //           </button>
        //         </div>
        //       </div>
        //     )}

        //     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        //       {/* Left Column - Main Content */}
        //       <div className="lg:col-span-2 space-y-6">
        //         {/* Order Status Card */}
        //         <div className="bg-white p-6 rounded-lg shadow-md">
        //           <div className="flex items-center justify-between mb-6">
        //             <h3 className="text-lg font-bold text-gray-800">Order Status</h3>
        //             <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getStatusColor(orderStatus)}`}>
        //               {orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)}
        //             </span>
        //           </div>

        //           {/* Timeline */}
        //           <div className="relative">
        //             {order.timeline.map((step, index) => (
        //               <div key={index} className="flex gap-4 pb-8 last:pb-0">
        //                 <div className="flex flex-col items-center">
        //                   <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.completed
        //                     ? 'bg-green-500 text-white'
        //                     : step.current
        //                       ? 'bg-blue-500 text-white'
        //                       : 'bg-gray-200 text-gray-400'
        //                     }`}>
        //                     {step.completed ? (
        //                       <CheckCircle className="w-5 h-5" />
        //                     ) : (
        //                       <Clock className="w-5 h-5" />
        //                     )}
        //                   </div>
        //                   {index < order.timeline.length - 1 && (
        //                     <div className={`w-0.5 h-full mt-2 ${step.completed ? 'bg-green-500' : 'bg-gray-200'
        //                       }`}></div>
        //                   )}
        //                 </div>
        //                 <div className="flex-1 pb-4">
        //                   <h4 className={`font-semibold ${step.current ? 'text-blue-600' : 'text-gray-800'}`}>
        //                     {step.status}
        //                   </h4>
        //                   {step.date && (
        //                     <p className="text-sm text-gray-600 mt-1">{step.date}</p>
        //                   )}
        //                   {step.current && (
        //                     <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
        //                       Current Step
        //                     </span>
        //                   )}
        //                 </div>
        //               </div>
        //             ))}
        //           </div>
        //         </div>

        //         {/* Order Items */}
        //         <div className="bg-white p-6 rounded-lg shadow-md">
        //           <h3 className="text-lg font-bold text-gray-800 mb-4">Order Items</h3>
        //           <div className="space-y-4">
        //             {order.items.map(item => (
        //               <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
        //                 <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-4xl">
        //                   {item.image}
        //                 </div>
        //                 <div className="flex-1">
        //                   <h4 className="font-bold text-gray-800">{item.name}</h4>
        //                   <p className="text-sm text-gray-600 mt-1">SKU: {item.sku}</p>
        //                   <p className="text-sm text-gray-600">{item.variant}</p>
        //                   <div className="flex items-center gap-4 mt-2">
        //                     <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
        //                     <span className="text-sm font-semibold text-gray-800">${item.price} each</span>
        //                   </div>
        //                 </div>
        //                 <div className="text-right">
        //                   <p className="font-bold text-gray-800 text-lg">${item.price * item.quantity}</p>
        //                 </div>
        //               </div>
        //             ))}
        //           </div>

        //           {/* Pricing Breakdown */}
        //           <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
        //             <div className="flex justify-between text-gray-600">
        //               <span>Subtotal</span>
        //               <span>${order.pricing.subtotal.toFixed(2)}</span>
        //             </div>
        //             <div className="flex justify-between text-gray-600">
        //               <span>Shipping</span>
        //               <span>${order.pricing.shipping.toFixed(2)}</span>
        //             </div>
        //             <div className="flex justify-between text-gray-600">
        //               <span>Tax</span>
        //               <span>${order.pricing.tax.toFixed(2)}</span>
        //             </div>
        //             {order.pricing.discount > 0 && (
        //               <div className="flex justify-between text-green-600">
        //                 <span>Discount</span>
        //                 <span>-${order.pricing.discount.toFixed(2)}</span>
        //               </div>
        //             )}
        //             <div className="flex justify-between text-gray-800 font-bold text-lg pt-2 border-t border-gray-200">
        //               <span>Total</span>
        //               <span>${order.pricing.total.toFixed(2)}</span>
        //             </div>
        //           </div>
        //         </div>

        //         {/* Payment Information */}
        //         <div className="bg-white p-6 rounded-lg shadow-md">
        //           <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Information</h3>
        //           <div className="grid grid-cols-2 gap-4">
        //             <div>
        //               <p className="text-sm text-gray-600 mb-1">Payment Method</p>
        //               <p className="font-semibold text-gray-800">{order.payment.method}</p>
        //             </div>
        //             <div>
        //               <p className="text-sm text-gray-600 mb-1">Payment Status</p>
        //               <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${order.payment.remainingAmount > 0 ? getStatusColor('partial') : getStatusColor('paid')
        //                 }`}>
        //                 {order.payment.remainingAmount > 0 ? 'Partial Payment' : 'Fully Paid'}
        //               </span>
        //             </div>
        //             <div>
        //               <p className="text-sm text-gray-600 mb-1">Paid Amount</p>
        //               <p className="font-semibold text-green-600">${order.payment.paidAmount.toFixed(2)}</p>
        //             </div>
        //             {order.payment.remainingAmount > 0 && (
        //               <div>
        //                 <p className="text-sm text-gray-600 mb-1">Remaining Balance</p>
        //                 <p className="font-semibold text-orange-600">${order.payment.remainingAmount.toFixed(2)}</p>
        //               </div>
        //             )}
        //             <div>
        //               <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
        //               <p className="font-mono text-sm text-gray-800">{order.payment.transactionId}</p>
        //             </div>
        //             <div>
        //               <p className="text-sm text-gray-600 mb-1">Payment Date</p>
        //               <p className="font-semibold text-gray-800">{order.payment.paidDate}</p>
        //             </div>
        //           </div>

        //           {order.payment.remainingAmount > 0 && (
        //             <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-3">
        //               <AlertCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
        //               <div className="flex-1">
        //                 <p className="text-sm font-semibold text-orange-800">Payment Pending</p>
        //                 <p className="text-sm text-orange-700 mt-1">
        //                   Customer still owes ${order.payment.remainingAmount.toFixed(2)}. Send a payment reminder?
        //                 </p>
        //                 <button className="mt-3 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm font-semibold">
        //                   Send Payment Reminder
        //                 </button>
        //               </div>
        //             </div>
        //           )}
        //         </div>

        //         {/* Shipping Information */}
        //         <div className="bg-white p-6 rounded-lg shadow-md">
        //           <h3 className="text-lg font-bold text-gray-800 mb-4">Shipping Information</h3>
        //           <div className="grid grid-cols-2 gap-4">
        //             <div>
        //               <p className="text-sm text-gray-600 mb-1">Shipping Method</p>
        //               <p className="font-semibold text-gray-800">{order.shipping.method}</p>
        //             </div>
        //             <div>
        //               <p className="text-sm text-gray-600 mb-1">Carrier</p>
        //               <p className="font-semibold text-gray-800">{order.shipping.carrier}</p>
        //             </div>
        //             <div>
        //               <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
        //               <p className="font-mono text-sm text-blue-600 cursor-pointer hover:underline">
        //                 {order.shipping.trackingNumber}
        //               </p>
        //             </div>
        //             <div>
        //               <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
        //               <p className="font-semibold text-gray-800">{order.shipping.estimatedDelivery}</p>
        //             </div>
        //           </div>

        //           {!order.shipping.shippingDate && (
        //             <button className="mt-4 w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2">
        //               <Truck className="w-5 h-5" />
        //               Mark as Shipped
        //             </button>
        //           )}
        //         </div>

        //         {/* Order Notes */}
        //         <div className="bg-white p-6 rounded-lg shadow-md">
        //           <h3 className="text-lg font-bold text-gray-800 mb-4">Order Notes</h3>
        //           <div className="space-y-3 mb-4">
        //             {order.notes.map(note => (
        //               <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
        //                 <div className="flex items-center justify-between mb-1">
        //                   <span className="text-sm font-semibold text-gray-800">{note.author}</span>
        //                   <span className="text-xs text-gray-500">{note.time}</span>
        //                 </div>
        //                 <p className="text-sm text-gray-600">{note.text}</p>
        //               </div>
        //             ))}
        //           </div>
        //           <div className="flex gap-2">
        //             <input
        //               type="text"
        //               placeholder="Add a note..."
        //               className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        //             />
        //             <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        //               Add Note
        //             </button>
        //           </div>
        //         </div>
        //       </div>

        //       {/* Right Column - Customer & Actions */}
        //       <div className="space-y-6">
        //         {/* Customer Information */}
        //         <div className="bg-white p-6 rounded-lg shadow-md">
        //           <h3 className="text-lg font-bold text-gray-800 mb-4">Customer Details</h3>
        //           <div className="space-y-4">
        //             <div>
        //               <p className="text-sm text-gray-600 mb-1">Name</p>
        //               <p className="font-semibold text-gray-800">{order.customer.name}</p>
        //             </div>
        //             <div>
        //               <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
        //                 <Mail className="w-4 h-4" />
        //                 Email
        //               </p>
        //               <a href={`mailto:${order.customer.email}`} className="text-blue-600 hover:underline">
        //                 {order.customer.email}
        //               </a>
        //             </div>
        //             <div>
        //               <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
        //                 <Phone className="w-4 h-4" />
        //                 Phone
        //               </p>
        //               <a href={`tel:${order.customer.phone}`} className="text-blue-600 hover:underline">
        //                 {order.customer.phone}
        //               </a>
        //             </div>
        //             <div>
        //               <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
        //                 <MapPin className="w-4 h-4" />
        //                 Shipping Address
        //               </p>
        //               <p className="text-gray-800">
        //                 {order.customer.address}<br />
        //                 {order.customer.city}, {order.customer.state} {order.customer.zipCode}<br />
        //                 {order.customer.country}
        //               </p>
        //             </div>
        //             <div>
        //               <p className="text-sm text-gray-600 mb-1">Platform</p>
        //               <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
        //                 {order.platform}
        //               </span>
        //             </div>
        //           </div>
        //         </div>

        //         {/* Quick Actions */}
        //         <div className="bg-white p-6 rounded-lg shadow-md">
        //           <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
        //           <div className="space-y-2">
        //             <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
        //               <MessageSquare className="w-4 h-4" />
        //               Contact Customer
        //             </button>
        //             <button className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
        //               <Mail className="w-4 h-4" />
        //               Send Invoice
        //             </button>
        //             <button className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
        //               <Edit className="w-4 h-4" />
        //               Edit Order
        //             </button>
        //             <button className="w-full px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition flex items-center justify-center gap-2">
        //               <AlertCircle className="w-4 h-4" />
        //               Cancel Order
        //             </button>
        //           </div>
        //         </div>

        //         {/* Order Summary */}
        //         <div className="bg-linear-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
        //           <h3 className="text-lg font-bold mb-4">Order Summary</h3>
        //           <div className="space-y-3">
        //             <div className="flex justify-between">
        //               <span className="opacity-90">Order ID</span>
        //               <span className="font-bold">{order.id}</span>
        //             </div>
        //             <div className="flex justify-between">
        //               <span className="opacity-90">Total Amount</span>
        //               <span className="font-bold text-xl">${order.pricing.total.toFixed(2)}</span>
        //             </div>
        //             <div className="flex justify-between">
        //               <span className="opacity-90">Items</span>
        //               <span className="font-bold">{order.items.reduce((acc, item) => acc + item.quantity, 0)} items</span>
        //             </div>
        //             <div className="flex justify-between">
        //               <span className="opacity-90">Order Date</span>
        //               <span className="font-bold">{order.orderDate.split(' ')[0]}</span>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // );
        return (
          <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
              {view === 'overview' ? <OrderOverview /> : <FullOrderDetail />}
            </div>
          </div>
        );

      case 'inventory':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Inventory & Pre-Orders</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-700 font-semibold">Product</th>
                    <th className="text-left py-3 px-4 text-gray-700 font-semibold">Stock / Orders</th>
                    <th className="text-left py-3 px-4 text-gray-700 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">Dress A</td>
                    <td className="py-3 px-4">3 units</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm flex items-center gap-1 w-fit">
                        Low Stock ⚠️
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">Dress B</td>
                    <td className="py-3 px-4">10 pre-orders</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                        Pre-Order Ending Soon
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">Dress C</td>
                    <td className="py-3 px-4">25 units</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        In Stock
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'notification':
        // return (
        //   <div className="bg-white rounded-lg shadow-lg p-6">
        //     <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications & Automation</h2>

        //     {/* Auto-Reminder Toggle Section */}
        //     <div className="mb-8">
        //       <h3 className="text-lg font-semibold text-gray-700 mb-4">Auto-Reminder Settings</h3>
        //       <div className="space-y-3">
        //         <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
        //           <span className="text-gray-700">Payment Reminders</span>
        //           <label className="relative inline-block w-12 h-6 cursor-pointer">
        //             <input type="checkbox" defaultChecked className="sr-only peer" />
        //             <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all"></div>
        //             <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
        //           </label>
        //         </div>
        //         <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
        //           <span className="text-gray-700">Order Status Updates</span>
        //           <label className="relative inline-block w-12 h-6 cursor-pointer">
        //             <input type="checkbox" defaultChecked className="sr-only peer" />
        //             <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all"></div>
        //             <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
        //           </label>
        //         </div>
        //         <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
        //           <span className="text-gray-700">New Product Announcements</span>
        //           <label className="relative inline-block w-12 h-6 cursor-pointer">
        //             <input type="checkbox" className="sr-only peer" />
        //             <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all"></div>
        //             <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
        //           </label>
        //         </div>
        //       </div>
        //     </div>

        //     {/* Message Templates Section */}
        //     <div className="mb-8">
        //       <h3 className="text-lg font-semibold text-gray-700 mb-4">Message Templates</h3>
        //       <div className="overflow-x-auto">
        //         <table className="w-full">
        //           <thead>
        //             <tr className="border-b-2 border-gray-200">
        //               <th className="text-left py-3 px-4 text-gray-700 font-semibold">Template Name</th>
        //               <th className="text-left py-3 px-4 text-gray-700 font-semibold">Message</th>
        //               <th className="text-left py-3 px-4 text-gray-700 font-semibold">Action</th>
        //             </tr>
        //           </thead>
        //           <tbody className="divide-y">
        //             <tr className="hover:bg-gray-50">
        //               <td className="py-3 px-4 font-medium">Order Arrived</td>
        //               <td className="py-3 px-4 text-sm text-gray-600">"Your order has arrived."</td>
        //               <td className="py-3 px-4">
        //                 <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">Edit</button>
        //               </td>
        //             </tr>
        //             <tr className="hover:bg-gray-50">
        //               <td className="py-3 px-4 font-medium">Payment Reminder</td>
        //               <td className="py-3 px-4 text-sm text-gray-600">"Please complete your deposit."</td>
        //               <td className="py-3 px-4">
        //                 <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">Edit</button>
        //               </td>
        //             </tr>
        //             <tr className="hover:bg-gray-50">
        //               <td className="py-3 px-4 font-medium">New Product</td>
        //               <td className="py-3 px-4 text-sm text-gray-600">"New product just posted, check it out!"</td>
        //               <td className="py-3 px-4">
        //                 <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">Edit</button>
        //               </td>
        //             </tr>
        //           </tbody>
        //         </table>
        //       </div>
        //     </div>

        //     {/* Scheduled Posts Section */}
        //     <div>
        //       <h3 className="text-lg font-semibold text-gray-700 mb-4">Scheduled Posts Notifications</h3>
        //       <div className="overflow-x-auto">
        //         <table className="w-full">
        //           <thead>
        //             <tr className="border-b-2 border-gray-200">
        //               <th className="text-left py-3 px-4 text-gray-700 font-semibold">Platform</th>
        //               <th className="text-left py-3 px-4 text-gray-700 font-semibold">Post Title</th>
        //               <th className="text-left py-3 px-4 text-gray-700 font-semibold">Scheduled Time</th>
        //               <th className="text-left py-3 px-4 text-gray-700 font-semibold">Status</th>
        //             </tr>
        //           </thead>
        //           <tbody className="divide-y">
        //             <tr className="hover:bg-gray-50">
        //               <td className="py-3 px-4">
        //                 <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
        //                   Facebook
        //                 </span>
        //               </td>
        //               <td className="py-3 px-4">Summer Collection Launch</td>
        //               <td className="py-3 px-4 text-sm text-gray-600">Today, 6:00 PM</td>
        //               <td className="py-3 px-4">
        //                 <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
        //                   Pending
        //                 </span>
        //               </td>
        //             </tr>
        //             <tr className="hover:bg-gray-50">
        //               <td className="py-3 px-4">
        //                 <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold">
        //                   Instagram
        //                 </span>
        //               </td>
        //               <td className="py-3 px-4">Flash Sale Announcement</td>
        //               <td className="py-3 px-4 text-sm text-gray-600">Tomorrow, 10:00 AM</td>
        //               <td className="py-3 px-4">
        //                 <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
        //                   Pending
        //                 </span>
        //               </td>
        //             </tr>
        //             <tr className="hover:bg-gray-50">
        //               <td className="py-3 px-4">
        //                 <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
        //                   TikTok
        //                 </span>
        //               </td>
        //               <td className="py-3 px-4">Dress Restock Alert</td>
        //               <td className="py-3 px-4 text-sm text-gray-600">2 hours ago</td>
        //               <td className="py-3 px-4">
        //                 <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
        //                   Posted
        //                 </span>
        //               </td>
        //             </tr>
        //           </tbody>
        //         </table>
        //       </div>
        //     </div>
        //   </div>
        // );
        return (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.history.back()}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Notifications</h2>
                  <p className="text-gray-600 mt-1">
                    {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <CheckCheck className="w-4 h-4" />
                  Mark All Read
                </button>
                <button
                  onClick={clearAll}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-2 overflow-x-auto">
                <Filter className="w-5 h-5 text-gray-600 shrink-0" />
                {[
                  { key: 'all', label: 'All', count: notifications.length },
                  { key: 'unread', label: 'Unread', count: unreadCount },
                  { key: 'order', label: 'Orders', icon: ShoppingCart },
                  { key: 'payment', label: 'Payments', icon: DollarSign },
                  { key: 'message', label: 'Messages', icon: MessageSquare },
                  { key: 'stock', label: 'Inventory', icon: AlertCircle },
                  { key: 'shipping', label: 'Shipping', icon: Package }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition flex items-center gap-2 ${filter === tab.key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {tab.icon && <tab.icon className="w-4 h-4" />}
                    {tab.label}
                    {tab.count !== undefined && (
                      <span className={`px-2 py-0.5 rounded-full text-xs ${filter === tab.key ? 'bg-white/20' : 'bg-gray-200'
                        }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
              {filteredNotifications.length === 0 ? (
                <div className="bg-white p-12 rounded-lg shadow-md text-center">
                  <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No Notifications</h3>
                  <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
                </div>
              ) : (
                filteredNotifications.map(notif => (
                  <div
                    key={notif.id}
                    className={`bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition ${!notif.read ? 'border-l-4 border-blue-500' : ''
                      }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-full ${getIconColor(notif.color)} flex items-center justify-center shrink-0`}>
                        <notif.icon className="w-6 h-6" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className={`font-bold text-gray-800 ${!notif.read ? 'text-blue-600' : ''}`}>
                                {notif.title}
                              </h4>
                              {!notif.read && (
                                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                              )}
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityBadge(notif.priority)}`}>
                                {notif.priority}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{notif.message}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              {notif.time}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 ml-4">
                            {!notif.read && (
                              <button
                                onClick={() => markAsRead(notif.id)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                title="Mark as read"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notif.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Delete"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Action Button */}
                        <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold">
                          {notif.actionText} →
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Notification Settings */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-bold text-gray-800">Notification Preferences</h3>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  Manage →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">New Orders</span>
                  </div>
                  <label className="relative inline-block w-12 h-6 cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700">New Messages</span>
                  </div>
                  <label className="relative inline-block w-12 h-6 cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Payment Updates</span>
                  </div>
                  <label className="relative inline-block w-12 h-6 cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-gray-700">Stock Alerts</span>
                  </div>
                  <label className="relative inline-block w-12 h-6 cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">EasySell Wireframes</h1>
          <p className="text-gray-600">Navigate through different screens to explore the app flow</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {Object.entries(screens).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setCurrentScreen(key)}
                className={`px-4 py-2 rounded-lg font-medium transition ${currentScreen === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-6">
          {renderScreen()}
        </div>
      </div>
    </div>
  );
};

export default App;