// pages/Order.js - Shows Create Order first, then Order List
import React, { useState } from 'react';
import OrderOverview from '../components/order/OrderOverview';
import FullOrderDetail from '../components/order/FullOrderDetail';
import CreateOrderForm from '../components/order/CreateOrderForm';
import useOrder from '../hooks/useOrder';

const Order = ({ getStatusColor }) => {
    const { orders, setView, viewOrderDetail, fullOrderDetail, loadOrders, filteredOrders, setSearchQuery, clearSearch, searchQuery, showToast, closeToast, toast, error, setError } = useOrder();
    const [mainView, setMainView] = useState('list'); // 'create', 'list', or 'detail'

    const handleOrderCreated = () => {
        loadOrders(); // Reload orders
        setMainView('list'); // Switch to list view
    };

    const handleViewOrderDetail = (orderId) => {
        viewOrderDetail(orderId);  // This loads the order data
        setMainView('detail');     // Then switch to detail view
    };

    const handleBackToList = () => {
        setMainView('list');
        setView('overview');
    };

    const handleCreateNew = () => {
        setMainView('create');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {mainView === 'create' && (
                    <CreateOrderForm
                        onOrderCreated={handleOrderCreated}
                        onViewOrders={() => setMainView('list')}
                        loadOrders={loadOrders}
                        fullOrderDetail={fullOrderDetail}
                        showToast={showToast}
                        closeToast={closeToast}
                        toast={toast}
                        error={error}
                        setError={setError}
                    />
                )}

                {mainView === 'list' && (
                    <OrderOverview
                        orders={orders}
                        getStatusColor={getStatusColor}
                        viewOrderDetail={handleViewOrderDetail}
                        onCreateNew={handleCreateNew}
                        fullOrderDetail={fullOrderDetail}
                        filteredOrders={filteredOrders}
                        setSearchQuery={setSearchQuery}
                        clearSearch={clearSearch}
                        searchQuery={searchQuery}
                    />
                )}

                {mainView === 'detail' && (
                    <FullOrderDetail
                        fullOrderDetail={fullOrderDetail}
                        setView={handleBackToList}
                        getStatusColor={getStatusColor}
                    />
                )}
            </div>
        </div>
    );
};

export default Order;