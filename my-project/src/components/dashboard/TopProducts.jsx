import { TrendingUp, TrendingDown } from "lucide-react";

const TopProducts = ({ topProducts }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Top Selling Products</h3>
        <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
          View All
        </button>
      </div>
      <div className="space-y-3">
        {topProducts.map((product, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-800">{product.name}</span>
                {product.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
              </div>
              <p className="text-sm text-gray-600">
                {product.sold} sold • ${product.revenue} revenue
              </p>
              <p
                className={`text-xs mt-1 ${
                  product.stock < 5 ? "text-red-600 font-semibold" : "text-gray-500"
                }`}
              >
                Stock: {product.stock} {product.stock < 5 && "⚠️"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
