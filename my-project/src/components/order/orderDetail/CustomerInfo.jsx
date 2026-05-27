// components/Order/orderDetail/CustomerInfo.js
import { User, Mail, Phone, MapPin } from 'lucide-react';

const CustomerInfo = ({ fullOrderDetail }) => {
  if (!fullOrderDetail || !fullOrderDetail.customer) {
    return <div className="bg-white p-6 rounded-lg shadow-md">Loading customer info...</div>;
  }

  const { customer } = fullOrderDetail;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Customer Information</h3>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <User className="w-5 h-5 text-gray-600 mt-1" />
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-semibold">{customer.name || 'N/A'}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-gray-600 mt-1" />
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-semibold">{customer.phone || 'N/A'}</p>
          </div>
        </div>

        {customer.address && (customer.address.street || customer.address.city) && (
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-600 mt-1" />
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <div className="font-semibold">
                {customer.address.street && <p>{customer.address.street}</p>}
                {customer.address.city && (
                  <p>
                    {customer.address.city}
                    {customer.address.state && `, ${customer.address.state}`}
                    {customer.address.zipCode && ` ${customer.address.zipCode}`}
                  </p>
                )}
                {customer.address.country && <p>{customer.address.country}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerInfo;