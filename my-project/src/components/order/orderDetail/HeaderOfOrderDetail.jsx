// components/Order/orderDetail/HeaderOfOrderDetail.js
import { ArrowLeft } from 'lucide-react';

const HeaderOfOrderDetail = ({ setView, fullOrderDetail }) => {
  // Add loading check
  if (!fullOrderDetail) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <button
          onClick={() => setView('overview')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Orders
        </button>
        <div className="text-center py-4">
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <button
        onClick={() => setView('overview')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Orders
      </button>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{fullOrderDetail.orderNumber}</h2>
          <p className="text-gray-600 mt-1">
            Placed on {new Date(fullOrderDetail.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeaderOfOrderDetail;