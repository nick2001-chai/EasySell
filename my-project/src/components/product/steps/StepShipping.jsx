const StepShipping = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (kg)</label>
          <input type="number" step="0.1" placeholder="0.0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Length (cm)</label>
          <input type="number" placeholder="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Width (cm)</label>
          <input type="number" placeholder="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
      </div>
      {/* Shipping Options */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Shipping Options</label>
        <div className="space-y-2">
          <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input type="checkbox" defaultChecked />
            <span>Standard Shipping - $5.00 (3-5 days)</span>
          </label>
          <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input type="checkbox" />
            <span>Express Shipping - $12.00 (1-2 days)</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default StepShipping;
