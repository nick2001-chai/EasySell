import { Plus } from 'lucide-react';

const StepPricing = ({ formData, handleInputChange, variants, addVariant, removeVariant }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Regular Price *</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              name="regularPrice"
              value={formData.regularPrice}
              onChange={handleInputChange}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Sale Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              name="salePrice"
              value={formData.salePrice}
              onChange={handleInputChange}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-gray-700">Product Variants (Optional)</label>
          <button
            onClick={addVariant}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Variant
          </button>
        </div>
        <div className="space-y-3">
          {variants.map((variant, index) => (
            <div key={index} className="grid grid-cols-5 gap-3 p-3 border border-gray-200 rounded-lg">
              <input type="text" placeholder="Size" className="px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              <input type="text" placeholder="Color" className="px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              <input type="number" placeholder="Price" className="px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              <input type="number" placeholder="Stock" className="px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              <button onClick={() => removeVariant(index)} className="text-red-600 hover:text-red-700 font-semibold text-sm">
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepPricing;
