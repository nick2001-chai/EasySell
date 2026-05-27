import { Bell } from 'lucide-react';

const Header = ({ timeRange, setTimeRange, setCurrentScreen }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-600 mt-1">Welcome back! Here's your business overview</p>
      </div>
      <div className="flex items-center gap-3">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
        <button
          onClick={() => setCurrentScreen('notification')}
          className="relative p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            5
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;
