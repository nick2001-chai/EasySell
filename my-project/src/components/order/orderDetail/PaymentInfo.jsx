// components/Order/orderDetail/PaymentInfo.js
import { CreditCard } from 'lucide-react';

const PaymentInfo = ({ fullOrderDetail }) => {
  if (!fullOrderDetail) {
    return <div className="bg-white p-6 rounded-lg shadow-md">Loading payment info...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Information</h3>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-semibold">${(fullOrderDetail.subtotal || 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping:</span>
          <span className="font-semibold">${(fullOrderDetail.shippingCost || 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax:</span>
          <span className="font-semibold">${(fullOrderDetail.tax || 0).toFixed(2)}</span>
        </div>
        {fullOrderDetail.discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount:</span>
            <span className="font-semibold">-${fullOrderDetail.discount.toFixed(2)}</span>
          </div>
        )}
        <div className="border-t pt-3 flex justify-between text-lg">
          <span className="font-bold">Total:</span>
          <span className="font-bold text-green-600">${(fullOrderDetail.totalAmount || 0).toFixed(2)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-600" />
          <span className="font-semibold capitalize">{fullOrderDetail.paymentMethod || 'cash'}</span>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          fullOrderDetail.paymentStatus === 'paid' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-yellow-100 text-yellow-700'
        }`}>
          {fullOrderDetail.paymentStatus || 'pending'}
        </span>
      </div>
    </div>
  );
};

export default PaymentInfo;