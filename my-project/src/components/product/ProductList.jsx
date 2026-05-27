// components/product/ProductList.js
import React, { useState } from 'react';
import { Package, Plus, Edit, Trash2, Search, X } from 'lucide-react';
import Toast from '../common/Toast';

const ProductList = ({
  setViewProduct,
  products,
  loading,
  error,
  deleteProduct,
  editProduct,
  toast,
  closeToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = async (productId, productName) => {
    if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      await deleteProduct(productId);
    }
  };

  // Filter products based on search query
  const filteredProducts = React.useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      return products; // Show all products if no search
    }
    
    const query = searchQuery.toLowerCase().trim();
    
    return products.filter(product => {
      const name = (product.name || '').toLowerCase();
      const sku = (product.sku || '').toLowerCase();
      const category = (product.category || '').toLowerCase();
      
      return name.includes(query) || sku.includes(query) || category.includes(query);
    });
  }, [products, searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="w-full p-4 sm:p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={closeToast}
          duration={5000}
        />
      )}

      <div className="w-full p-4 sm:p-6 lg:max-w-6xl lg:mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Products</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              {products.length} total {products.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          <button
            onClick={() => setViewProduct('create')}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Product</span>
          </button>
        </div>

        {/* Search Bar - Show if there are any products */}
        {products.length > 0 && (
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, SKU, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  title="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {/* Search Results Info */}
            {searchQuery && (
              <div className="mt-3 flex items-center gap-2 text-sm">
                <span className="text-gray-600">
                  Found <strong className="text-blue-600">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'product' : 'products'}
                </span>
                {filteredProducts.length < products.length && (
                  <span className="text-gray-400">
                    (out of {products.length} total)
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Error Message */}
        {error?.general && (
          <div className="mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm sm:text-base text-red-700">{error.general}</p>
          </div>
        )}

        {/* Content Based on State */}
        {products.length === 0 ? (
          // No products at all
          <div className="bg-white rounded-lg shadow-lg p-8 sm:p-12 text-center">
            <Package className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No products yet</h3>
            <p className="text-sm sm:text-base text-gray-500 mb-6">Get started by creating your first product listing</p>
            <button
              onClick={() => setViewProduct('create')}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Create First Product
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          // Has products but no search results
          <div className="bg-white rounded-lg shadow-lg p-8 sm:p-12 text-center">
            <Search className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-sm sm:text-base text-gray-500 mb-6">
              No products match "<strong className="text-gray-700">{searchQuery}</strong>"
            </p>
            <p className="text-sm text-gray-400 mb-4">
              Try searching by product name, SKU, or category
            </p>
            <button
              onClick={clearSearch}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Clear Search
            </button>
          </div>
        ) : (
          // Display filtered products
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map(product => (
                <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                  {/* Product Image */}
                  <div className="relative h-40 sm:h-48 bg-gray-200">
                    {product.images && product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                      </div>
                    )}
                    <span className={`absolute top-2 right-2 sm:top-3 sm:right-3 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                      product.sellingMode === 'in-stock'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {product.sellingMode === 'in-stock' ? 'In Stock' : 'Pre-Order'}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="p-3 sm:p-4">
                    <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-1 truncate" title={product.name}>
                      {product.name || 'Untitled Product'}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mb-2">{product.category || 'No category'}</p>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      {product.salePrice ? (
                        <>
                          <span className="text-lg sm:text-xl font-bold text-green-600">${product.salePrice}</span>
                          <span className="text-xs sm:text-sm text-gray-400 line-through">${product.regularPrice}</span>
                        </>
                      ) : (
                        <span className="text-lg sm:text-xl font-bold text-gray-800">
                          ${product.regularPrice || '0.00'}
                        </span>
                      )}
                    </div>

                    {/* Stock */}
                    {product.sellingMode === 'in-stock' && (
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                        Stock: <span className="font-semibold">{product.stockQuantity || 0}</span> units
                      </p>
                    )}

                    {/* SKU */}
                    {product.sku && (
                      <p className="text-xs text-gray-500 mb-3 sm:mb-4">SKU: {product.sku}</p>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => editProduct(product)}
                        className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-100 transition"
                      >
                        <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(product._id, product.name)}
                        className="flex items-center justify-center gap-1 px-3 sm:px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer - Product Count */}
            <div className="mt-6 text-center text-xs sm:text-sm text-gray-600">
              {searchQuery ? (
                <>
                  Showing {filteredProducts.length} of {products.length} products
                </>
              ) : (
                <>
                  Showing all {products.length} {products.length === 1 ? 'product' : 'products'}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductList;