// components/Order/orderDetail/OrderStatus.js
import { Clock, CheckCircle, Package, Truck, XCircle } from 'lucide-react';

const OrderStatus = ({ fullOrderDetail }) => {
  if (!fullOrderDetail) {
    return <div className="bg-white p-6 rounded-lg shadow-md">Loading...</div>;
  }

  const statuses = [
    { key: 'pending', label: 'Order Placed', icon: Clock },
    { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
    { key: 'processing', label: 'Processing', icon: Package },
    { key: 'shipped', label: 'Shipped', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle }
  ];

  const currentStatusIndex = statuses.findIndex(s => s.key === fullOrderDetail.status);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-6">Order Status</h3>
      <div className="relative">
        {statuses.map((status, index) => {
          const Icon = status.icon;
          const isCompleted = index <= currentStatusIndex;
          const isCurrent = index === currentStatusIndex;

          return (
            <div key={status.key} className="flex items-center mb-6 last:mb-0 relative">
              <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                isCompleted ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="ml-4 flex-1">
                <p className={`font-semibold ${isCurrent ? 'text-blue-600' : 'text-gray-800'}`}>
                  {status.label}
                </p>
                {isCurrent && <p className="text-sm text-gray-600">Current status</p>}
              </div>
              {index < statuses.length - 1 && (
                <div 
                  className={`absolute left-5 w-0.5 h-6 ${
                    isCompleted ? 'bg-blue-600' : 'bg-gray-200'
                  }`} 
                  style={{ top: '50px' }}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatus;