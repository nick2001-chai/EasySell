const PlatformPerformance = ({ platformStats, getPlatformColor }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Platform Performance</h3>
        <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
          Details
        </button>
      </div>
      <div className="space-y-3">
        {platformStats.map((platform, index) => (
          <div
            key={index}
            className="p-4 rounded-lg"
            style={{
              background: "linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-800">{platform.platform}</span>
              <span className="text-sm text-gray-600">{platform.orders} orders</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full ${getPlatformColor(platform.color)}`}
                style={{ width: `${(platform.orders / 50) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm font-semibold text-gray-700">${platform.revenue}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformPerformance;
