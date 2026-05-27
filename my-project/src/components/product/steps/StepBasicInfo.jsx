const StepBasicInfo = ({ formData, handleInputChange, sellingMode, setSellingMode, error, editingProduct }) => {

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleInputChange}
            placeholder="e.g., Summer Floral Dress"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500
      ${error?.name ? 'border-red-500' : 'border-gray-300'} `}
          />

          {error?.name && (
            <p className="text-red-500 text-sm mt-1">{error.name}</p>
          )}
        </div>


        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Code <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="sku"
            value={formData.sku || ''}
            onChange={handleInputChange}
            placeholder="e.g., DRS-001"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${error?.sku ? 'border-red-500' : 'border-gray-300'} ${editingProduct ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-black'}`}
            readOnly={!!editingProduct}
          />

          {error?.sku && (
            <p className="text-red-500 text-sm mt-1">{error.sku}</p>
          )}
        </div>


        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Category <span className="text-red-500">*</span></label>
          <select
            name="category"
            value={formData.category || ''}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${error?.category ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select Category</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
            <option value="Shoes">Shoes</option>
            <option value="Bags">Bags</option>
            <option value="Electronics">Electronics</option>
            <option value="Home & Living">Home & Living</option>
          </select>
          {error?.category && (
            <p className="text-red-500 text-sm mt-1">{error.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand || ''}
            onChange={handleInputChange}
            placeholder="Brand name (optional)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>


      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Product Description</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleInputChange}
          rows="5"
          placeholder="Describe your product in detail..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Selling Mode <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-2 gap-4">
          <label
            className={`border-2 rounded-lg p-4 cursor-pointer transition ${sellingMode === 'in-stock'
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
              }`}
          >
            <input
              type="radio"
              name="mode"
              value="in-stock"
              checked={sellingMode === 'in-stock'}
              onChange={(e) => setSellingMode(e.target.value)}
              className="mr-2"
            />
            <span className="font-semibold">In-Stock</span>
            <p className="text-sm text-gray-600 mt-1">Ready to ship immediately</p>
          </label>
          <label
            className={`border-2 rounded-lg p-4 cursor-pointer transition ${sellingMode === 'pre-order'
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
              }`}
          >
            <input
              type="radio"
              name="mode"
              value="pre-order"
              checked={sellingMode === 'pre-order'}
              onChange={(e) => setSellingMode(e.target.value)}
              className="mr-2"
            />
            <span className="font-semibold">Pre-Order</span>
            <p className="text-sm text-gray-600 mt-1">Product coming soon</p>
          </label>
        </div>
      </div>

      {/* Stock Quantity - Show only for In-Stock */}
      {sellingMode === 'in-stock' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Stock Quantity <span className="text-red-500">*</span> (Available units to sell)
          </label>
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity || ''}
            onChange={handleInputChange}
            placeholder="e.g., 50"
            min="0"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${error?.stockQuantity ? 'border-red-500' : 'border-gray-300'}`}
          />
          <p className="text-xs text-gray-600 mt-1">
            Enter the number of units available in stock
          </p>
          {error?.stockQuantity && (
            <p className="text-red-500 text-sm mt-1">{error.stockQuantity}</p>
          )}
        </div>
      )}

      {/* Pre-Order Settings - Show only for Pre-Order */}
      {sellingMode === 'pre-order' && (
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg space-y-4">
          <h3 className="font-semibold text-gray-800">Pre-Order Settings</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pre-Order Deadline
              </label>
              <input
                type="date"
                name="preOrderDeadline"
                value={formData.preOrderDeadline || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-600 mt-1">Last date to accept pre-orders</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expected Arrival Date
              </label>
              <input
                type="date"
                name="expectedArrivalDate"
                value={formData.expectedArrivalDate || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-600 mt-1">When product will be available</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pre-Order Quota (Optional)
            </label>
            <input
              type="number"
              name="preOrderQuota"
              value={formData.preOrderQuota || ''}
              onChange={handleInputChange}
              placeholder="e.g., 100"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-600 mt-1">
              Maximum number of pre-orders (leave empty for unlimited)
            </p>
          </div>

          <div className="bg-orange-100 p-3 rounded-lg">
            <p className="text-sm text-orange-800">
              ℹ️ <strong>Pre-Order Mode:</strong> Customers can order this product before it's available.
              No stock tracking required.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepBasicInfo;