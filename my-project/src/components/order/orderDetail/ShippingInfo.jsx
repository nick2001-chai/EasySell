// components/Order/orderDetail/ShippingInfo.js
import { Truck, MapPin, Calendar, Package } from 'lucide-react';

const ShippingInfo = ({ fullOrderDetail }) => {
  if (!fullOrderDetail) {
    return <div className="bg-white p-6 rounded-lg shadow-md">Loading shipping info...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Shipping Information</h3>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Truck className="w-5 h-5 text-gray-600 mt-1" />
          <div>
            <p className="text-sm text-gray-600">Shipping Method</p>
            <p className="font-semibold capitalize">{fullOrderDetail.shippingMethod || 'Standard'}</p>
          </div>
        </div>

        {fullOrderDetail.trackingNumber && (
          <div className="flex items-start gap-3">
            <Package className="w-5 h-5 text-gray-600 mt-1" />
            <div>
              <p className="text-sm text-gray-600">Tracking Number</p>
              <p className="font-semibold">{fullOrderDetail.trackingNumber}</p>
            </div>
          </div>
        )}

        {fullOrderDetail.customer?.address && (
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-600 mt-1" />
            <div>
              <p className="text-sm text-gray-600">Delivery Address</p>
              <p className="font-semibold">
                {fullOrderDetail.customer.address.street && `${fullOrderDetail.customer.address.street}, `}
                {fullOrderDetail.customer.address.city}
                {fullOrderDetail.customer.address.state && `, ${fullOrderDetail.customer.address.state}`}
              </p>
            </div>
          </div>
        )}

        {fullOrderDetail.deliveredAt && (
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-600 mt-1" />
            <div>
              <p className="text-sm text-gray-600">Delivered On</p>
              <p className="font-semibold">
                {new Date(fullOrderDetail.deliveredAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>

      {fullOrderDetail.customerNotes && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm font-semibold text-gray-700 mb-1">Customer Notes:</p>
          <p className="text-sm text-gray-600">{fullOrderDetail.customerNotes}</p>
        </div>
      )}
    </div>
  );
};

export default ShippingInfo;