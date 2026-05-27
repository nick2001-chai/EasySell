const RecentOrders = ({ recentOrders, getStatusColor, setCurrentScreen }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Recent Orders</h3>
        <button
          onClick={() => setCurrentScreen("orderDetail")}
          className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
        >
          View All
        </button>
      </div>
      <div className="space-y-3">
        {recentOrders.map((order, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-800">{order.id}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {order.customer} • {order.product}
              </p>
              <p className="text-xs text-gray-500 mt-1">{order.time}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800">${order.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
