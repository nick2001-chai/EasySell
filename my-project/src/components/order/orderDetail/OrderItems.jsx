// components/Order/orderDetail/OrderItems.js
import { Package } from 'lucide-react';

const OrderItems = ({ fullOrderDetail }) => {
  if (!fullOrderDetail || !fullOrderDetail.items) {
    return <div className="bg-white p-6 rounded-lg shadow-md">Loading items...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Order Items</h3>
      <div className="space-y-4">
        {fullOrderDetail.items.map((item, index) => (
          <div 
            key={item._id || item.productId || `item-${index}`} 
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
          >
            {item.productImage ? (
              <img 
                src={item.productImage} 
                alt={item.productName || 'Product'} 
                className="w-20 h-20 object-cover rounded-lg" 
              />
            ) : (
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                <Package className="w-10 h-10 text-gray-400" />
              </div>
            )}
            <div className="flex-1">
              <h4 className="font-bold text-gray-800">{item.productName || 'Unknown Product'}</h4>
              <p className="text-sm text-gray-600">Quantity: {item.quantity || 0}</p>
              <p className="text-sm text-gray-600">${(item.price || 0).toFixed(2)} each</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-gray-800">${(item.total || 0).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItems;