const StepPublish = () => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">Select Platforms to Publish *</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center gap-3 p-4 border-2 border-blue-200 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition">
            <input type="checkbox" defaultChecked className="w-5 h-5" />
            <span className="font-semibold text-gray-800">Facebook</span>
          </label>
          <label className="flex items-center gap-3 p-4 border-2 border-pink-200 bg-pink-50 rounded-lg cursor-pointer hover:bg-pink-100 transition">
            <input type="checkbox" defaultChecked className="w-5 h-5" />
            <span className="font-semibold text-gray-800">Instagram</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Post Caption</label>
        <textarea rows="4" placeholder="Write an engaging caption..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Hashtags</label>
        <input type="text" placeholder="#fashion #sale" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>
    </div>
  );
};

export default StepPublish;
