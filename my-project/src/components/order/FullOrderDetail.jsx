// components/Order/FullOrderDetail.js
import { MessageSquare, Mail, Edit } from 'lucide-react';
import HeaderOfOrderDetail from './orderDetail/HeaderOfOrderDetail';
import OrderStatus from './orderDetail/OrderStatus';
import OrderItems from './orderDetail/OrderItems';
import PaymentInfo from './orderDetail/PaymentInfo';
import ShippingInfo from './orderDetail/ShippingInfo';
import CustomerInfo from './orderDetail/CustomerInfo';

const FullOrderDetail = ({ setView, fullOrderDetail, getStatusColor }) => {
    // Add loading check
    if (!fullOrderDetail) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading order details...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <HeaderOfOrderDetail setView={setView} fullOrderDetail={fullOrderDetail} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Status Timeline */}
                    <OrderStatus fullOrderDetail={fullOrderDetail} />

                    {/* Order Items */}
                    <OrderItems fullOrderDetail={fullOrderDetail} />

                    {/* Payment Info */}
                    <PaymentInfo fullOrderDetail={fullOrderDetail} getStatusColor={getStatusColor} />

                    {/* Shipping Info */}
                    <ShippingInfo fullOrderDetail={fullOrderDetail} />
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Customer Info */}
                    <CustomerInfo fullOrderDetail={fullOrderDetail} />

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
};

export default FullOrderDetail;