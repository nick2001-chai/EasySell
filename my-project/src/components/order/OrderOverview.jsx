import { DollarSign, Eye, Printer, Plus, Search, X } from 'lucide-react';

const OrderOverview = ({ orders, viewOrderDetail, getStatusColor, onCreateNew, searchQuery, setSearchQuery, clearSearch, filteredOrders }) => {

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Orders</h2>
                    <p className="text-gray-600 mt-1">
                        {orders.length} total {orders.length === 1 ? 'order' : 'orders'}
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={onCreateNew}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Create New Order
                    </button>
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                        Export
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            {orders.length > 0 && (
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search by customer name, phone, order number, product name, or SKU..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        
                        {searchQuery && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition z-10"
                                title="Clear search"
                                type="button"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Search Results Info */}
                    {searchQuery && (
                        <div className="mt-3 flex items-center gap-2 text-sm">
                            <span className="text-gray-600">
                                Found <strong className="text-blue-600">{filteredOrders.length}</strong> {filteredOrders.length === 1 ? 'order' : 'orders'}
                            </span>
                            {filteredOrders.length < orders.length && (
                                <span className="text-gray-400">
                                    (out of {orders.length} total)
                                </span>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Order Cards */}
            <div className="grid grid-cols-1 gap-4">
                {orders.length === 0 ? (
                    <div className="bg-white p-12 rounded-lg shadow-md text-center">
                        <p className="text-gray-500">No orders found</p>
                        <button
                            onClick={onCreateNew}
                            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Create First Order
                        </button>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    // No search results
                    <div className="bg-white p-12 rounded-lg shadow-md text-center">
                        <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders found</h3>
                        <p className="text-gray-500 mb-6">
                            No orders match "<strong className="text-gray-700">{searchQuery}</strong>"
                        </p>
                        <p className="text-sm text-gray-400 mb-4">
                            Try searching by customer name, phone, order number, product name, or SKU
                        </p>
                        <button
                            onClick={clearSearch}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Clear Search
                        </button>
                    </div>
                ) : (
                    filteredOrders.map((order) => (
                        <div key={order._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <div className="flex items-start justify-between">
                                {/* Left - Order Info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <h3 className="text-xl font-bold text-gray-800">{order.orderNumber}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.paymentStatus === 'paid'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {order.paymentStatus === 'pending' ? 'Partial Payment' : order.paymentStatus}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                        <div>
                                            <p className="text-xs text-gray-600 mb-1">Customer</p>
                                            <p className="font-semibold text-gray-800">{order.customer?.name || 'N/A'}</p>
                                            {order.customer?.phone && (
                                                <p className="text-xs text-gray-500">{order.customer.phone}</p>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 mb-1">Product</p>
                                            <p className="font-semibold text-gray-800">
                                                {order.items?.[0]?.productName || 'Multiple Items'}
                                            </p>
                                            {order.items?.[0]?.sku && (
                                                <p className="text-xs text-gray-500">SKU: {order.items[0].sku}</p>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 mb-1">Payment Method</p>
                                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold capitalize">
                                                {order.paymentMethod || 'Cash'}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 mb-1">Time</p>
                                            <p className="text-sm text-gray-600">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div>
                                            <p className="text-xs text-gray-600">Total Amount</p>
                                            <p className="text-2xl font-bold text-gray-800">${order.totalAmount?.toFixed(2) || '0.00'}</p>
                                        </div>
                                        {order.paymentStatus === 'pending' && order.subtotal && (
                                            <>
                                                <div>
                                                    <p className="text-xs text-gray-600">Subtotal</p>
                                                    <p className="text-lg font-semibold text-green-600">${order.subtotal.toFixed(2)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-600">+ Shipping</p>
                                                    <p className="text-lg font-semibold text-orange-600">${order.shippingCost?.toFixed(2) || '0.00'}</p>
                                                </div>
                                            </>
                                        )}
                                        <div>
                                            <p className="text-xs text-gray-600">Items</p>
                                            <p className="text-lg font-semibold text-gray-800">{order.items?.length || 0}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right - Actions */}
                                <div className="flex flex-col gap-2 ml-6">
                                    <button
                                        onClick={() => viewOrderDetail(order._id)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 whitespace-nowrap"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View Details
                                    </button>

                                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                                        <Printer className="w-4 h-4" />
                                        Print
                                    </button>
                                    {order.paymentStatus === 'pending' && (
                                        <button className="px-4 py-2 bg-orange-50 border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-100 transition flex items-center gap-2">
                                            <DollarSign className="w-4 h-4" />
                                            Remind
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            {filteredOrders.length > 0 && (
                <div className="text-center text-sm text-gray-600">
                    {searchQuery ? (
                        <>Showing {filteredOrders.length} of {orders.length} orders</>
                    ) : (
                        <>Showing all {orders.length} {orders.length === 1 ? 'order' : 'orders'}</>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrderOverview;