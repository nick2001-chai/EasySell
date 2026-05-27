// hooks/useOrder.js
import React, { useState, useEffect, useCallback } from 'react';

const API_URL = 'http://127.0.0.1:5000/api';

const useOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [toast, setToast] = useState(null);
  const [view, setView] = useState('overview'); // 'overview', 'detail', or 'create'
  const [fullOrderDetail, setFullOrderDetail] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  const closeToast = () => {
    setToast(null);
  };


  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  // Load orders on mount and when filter changes
  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const queryParam = filter !== 'all' ? `?status=${filter}` : '';
      const response = await fetch(`${API_URL}/orders${queryParam}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      const data = await response.json();

      if (response.ok) {
        setOrders(data.orders || []);
      } else {
        setError(data.message || 'Failed to load orders');
        showToast('error', data.message || 'Failed to load orders');
      }
    } catch (err) {
      console.error('Load orders error:', err);
      setError('Unable to connect to server');
      showToast('error', 'Unable to connect to server')
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // VIEW ORDER DETAIL
  const viewOrderDetail = async (orderId) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      const data = await response.json();

      if (response.ok) {
        setFullOrderDetail(data.order);
        setView('detail');
      } else {
        showToast('error', 'Failed to load order details: ' + data.message)
      }
    } catch (err) {
      console.error('Load order detail error:', err);
      showToast('error', 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  // UPDATE ORDER (Full Edit)
  const updateOrder = async (updatedOrder) => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${API_URL}/orders/${updatedOrder._id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedOrder)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Order updated:', data.order);
        
        // Update orders list
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === updatedOrder._id ? data.order : order
          )
        );

        // Update full detail view
        setFullOrderDetail(data.order);

        alert('Order updated successfully!');
        return { success: true, order: data.order };
      } else {
        alert('Failed to update order: ' + data.message);
        setError(data.message || 'Failed to update order');
        showToast('error', data.message || 'Failed to update order');
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Update order error:', err);
      alert('Failed to update order. Please try again.');
      setError('Unable to connect to server');
      showToast('error', 'Unable to connect to server');
      return { success: false, message: 'Connection error' };
    } finally {
      setLoading(false);
    }
  };

  // UPDATE ORDER STATUS
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Order status updated successfully!');
        loadOrders();

        // Update detail view if currently viewing this order
        if (fullOrderDetail && fullOrderDetail._id === orderId) {
          setFullOrderDetail({ ...fullOrderDetail, status: newStatus });
        }

        return { success: true };
      } else {
        alert('Failed to update status: ' + data.message);
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Update status error:', err);
      alert('Failed to update order status');
      return { success: false, message: 'Connection error' };
    } finally {
      setLoading(false);
    }
  };

  // UPDATE PAYMENT STATUS
  const updatePaymentStatus = async (orderId, paymentStatus) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/orders/${orderId}/payment`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ paymentStatus })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Payment status updated successfully!');
        loadOrders();

        // Update detail view if currently viewing this order
        if (fullOrderDetail && fullOrderDetail._id === orderId) {
          setFullOrderDetail({ ...fullOrderDetail, paymentStatus });
        }

        return { success: true };
      } else {
        alert('Failed to update payment: ' + data.message);
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Update payment error:', err);
      alert('Failed to update payment status');
      return { success: false, message: 'Connection error' };
    } finally {
      setLoading(false);
    }
  };

  // DELETE ORDER
  const deleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      return { success: false };
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      const data = await response.json();

      if (response.ok) {
        alert('Order deleted successfully!');
        
        // Remove from orders list
        setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));

        // If viewing this order, go back to overview
        if (fullOrderDetail && fullOrderDetail._id === orderId) {
          setView('overview');
          setFullOrderDetail(null);
        }

        return { success: true };
      } else {
        alert('Failed to delete order: ' + data.message);
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Delete order error:', err);
      alert('Failed to delete order');
      return { success: false, message: 'Connection error' };
    } finally {
      setLoading(false);
    }
  };

  // CREATE NEW ORDER
  const createOrder = async (orderData) => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Order created:', data.order);
        alert('Order created successfully!');
        
        // Reload orders to get the new one
        loadOrders();
        
        // Switch to overview
        setView('overview');
        
        return { success: true, order: data.order };
      } else {
        alert('Failed to create order: ' + data.message);
        setError(data.message || 'Failed to create order');
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Create order error:', err);
      alert('Failed to create order. Please try again.');
      setError('Unable to connect to server');
      return { success: false, message: 'Connection error' };
    } finally {
      setLoading(false);
    }
  };

  // GET ORDER STATISTICS
  const getOrderStats = async () => {
    try {
      const response = await fetch(`${API_URL}/orders/stats/dashboard`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      }
      return null;
    } catch (err) {
      console.error('Get stats error:', err);
      return null;
    }
  };

  // Filter orders based on search query
  const filteredOrders = React.useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      return orders;
    }

    const query = searchQuery.toLowerCase().trim();

    return orders.filter(order => {
      const customerName = (order.customer?.name || '').toLowerCase();
      const customerPhone = (order.customer?.phone || '').toLowerCase();
      const orderNumber = (order.orderNumber || '').toLowerCase();

      const skuMatch = order.items?.some(item =>
        (item.sku || '').toLowerCase().includes(query)
      );

      const productMatch = order.items?.some(item =>
        (item.productName || '').toLowerCase().includes(query)
      );

      return customerName.includes(query) ||
        customerPhone.includes(query) ||
        orderNumber.includes(query) ||
        skuMatch ||
        productMatch;
    });
  }, [orders, searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  // Go back to overview
  const goBackToOverview = () => {
    setView('overview');
    setFullOrderDetail(null);
  };

  return {
    // State
    orders,
    loading,
    error,
    view,
    setView,
    fullOrderDetail,
    setFullOrderDetail,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    toast,
    setError,

    // Functions
    loadOrders,
    viewOrderDetail,
    updateOrder,           // ✅ New: Full order update
    createOrder,           // ✅ New: Create order
    updateOrderStatus,
    updatePaymentStatus,
    deleteOrder,
    getOrderStats,
    filteredOrders,
    clearSearch,
    goBackToOverview,
    closeToast,
    showToast
  };
};

export default useOrder;