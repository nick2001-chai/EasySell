import { BarChart3, DollarSign, Star } from 'lucide-react';

const SecondaryMetrics = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Conversion Rate */}
      <div className="bg-linear-to-r from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg text-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold opacity-90">Conversion Rate</h3>
          <BarChart3 className="w-5 h-5 opacity-75" />
        </div>
        <p className="text-3xl font-bold">{stats.conversionRate}%</p>
        <p className="text-sm opacity-75 mt-1">Inquiries to sales</p>
      </div>

      {/* Average Order Value */}
      <div className="bg-linear-to-r from-purple-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold opacity-90">Avg Order Value</h3>
          <DollarSign className="w-5 h-5 opacity-75" />
        </div>
        <p className="text-3xl font-bold">${stats.avgOrderValue}</p>
        <p className="text-sm opacity-75 mt-1">Per transaction</p>
      </div>

      {/* Customer Satisfaction */}
      <div className="bg-linear-to-r from-green-500 to-green-600 p-6 rounded-lg shadow-lg text-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold opacity-90">Customer Satisfaction</h3>
          <Star className="w-5 h-5 opacity-75" />
        </div>
        <p className="text-3xl font-bold">4.8</p>
        <p className="text-sm opacity-75 mt-1">Average rating</p>
      </div>
    </div>
  );
};

export default SecondaryMetrics;
