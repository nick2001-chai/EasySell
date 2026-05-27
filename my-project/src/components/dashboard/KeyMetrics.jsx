import { ShoppingCart, Clock, DollarSign, AlertCircle, TrendingUp } from 'lucide-react';

const KeyMetrics = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-600 text-sm font-semibold">Today's Orders</h3>
          <ShoppingCart className="w-5 h-5 text-blue-500" />
        </div>
        <p className="text-3xl font-bold text-gray-800">{stats.todayOrders}</p>
        <div className="flex items-center gap-1 mt-2 text-sm">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="text-green-600 font-semibold">+50%</span>
          <span className="text-gray-500">vs yesterday</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-600 text-sm font-semibold">Pending Payments</h3>
          <Clock className="w-5 h-5 text-orange-500" />
        </div>
        <p className="text-3xl font-bold text-gray-800">{stats.pendingPayments}</p>
        <div className="flex items-center gap-1 mt-2 text-sm">
          <span className="text-orange-600 font-semibold">${stats.pendingPayments * 45}</span>
          <span className="text-gray-500">to collect</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-600 text-sm font-semibold">Total Revenue</h3>
          <DollarSign className="w-5 h-5 text-green-500" />
        </div>
        <p className="text-3xl font-bold text-gray-800">${stats.totalSales}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-600 text-sm font-semibold">Low Stock Alerts</h3>
          <AlertCircle className="w-5 h-5 text-red-500" />
        </div>
        <p className="text-3xl font-bold text-gray-800">{stats.lowStock}</p>
        <div className="flex items-center gap-1 mt-2 text-sm">
          <span className="text-red-600 font-semibold">Action needed</span>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;
