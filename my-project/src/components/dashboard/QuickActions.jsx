import { MessageSquare, CheckCircle, Package, DollarSign } from "lucide-react";

const QuickActions = ({ setCurrentScreen }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => setCurrentScreen("chatInbox")}
          className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition text-center"
        >
          <MessageSquare className="w-8 h-8 mx-auto mb-2 text-blue-600" />
          <span className="text-sm font-semibold text-gray-800">Reply Messages</span>
        </button>

        <button className="p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition text-center">
          <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
          <span className="text-sm font-semibold text-gray-800">Process Orders</span>
        </button>

        <button className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition text-center">
          <Package className="w-8 h-8 mx-auto mb-2 text-purple-600" />
          <span className="text-sm font-semibold text-gray-800">Add Product</span>
        </button>

        <button className="p-4 border-2 border-orange-200 rounded-lg hover:bg-orange-50 transition text-center">
          <DollarSign className="w-8 h-8 mx-auto mb-2 text-orange-600" />
          <span className="text-sm font-semibold text-gray-800">Create Invoice</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
