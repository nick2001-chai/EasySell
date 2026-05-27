import React from 'react'
import { Eye, Edit, RefreshCw, Package } from 'lucide-react';

const InventoryTable = ({selectedProducts, filteredInventory, selectAll, getStatusBadge, toggleProductSelection, getVelocityIcon}) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th className="p-4 text-left">
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.length === filteredInventory.length && filteredInventory.length > 0}
                                    onChange={selectAll}
                                    className="w-5 h-5 rounded border-gray-300"
                                />
                            </th>
                            <th className="text-left p-4 font-bold text-gray-700">Product</th>
                            <th className="text-left p-4 font-bold text-gray-700">SKU</th>
                            <th className="text-left p-4 font-bold text-gray-700">Category</th>
                            <th className="text-left p-4 font-bold text-gray-700">Stock</th>
                            <th className="text-left p-4 font-bold text-gray-700">Price</th>
                            <th className="text-left p-4 font-bold text-gray-700">Performance</th>
                            <th className="text-left p-4 font-bold text-gray-700">Status</th>
                            <th className="text-left p-4 font-bold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredInventory.map(product => {
                            const status = getStatusBadge(product);
                            return (
                                <tr
                                    key={product.id}
                                    className={`hover:bg-gray-50 transition ${selectedProducts.includes(product.id) ? 'bg-blue-50' : ''}`}
                                >
                                    <td className="p-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedProducts.includes(product.id)}
                                            onChange={() => toggleProductSelection(product.id)}
                                            className="w-5 h-5 rounded border-gray-300"
                                        />
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                                                {product.image}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800">{product.name}</p>
                                                <div className="flex gap-1 mt-1">
                                                    {product.platforms.slice(0, 2).map((platform, i) => (
                                                        <span key={i} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                                                            {platform.substring(0, 2)}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <p className="font-mono text-sm text-gray-800">{product.sku}</p>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        {product.type === 'in-stock' ? (
                                            <div>
                                                <p className="font-bold text-gray-800">{product.stock.total} total</p>
                                                <p className="text-xs text-gray-600">
                                                    {product.stock.available} available • {product.stock.reserved} reserved
                                                </p>
                                                {product.variants.length > 0 && (
                                                    <p className="text-xs text-blue-600 mt-1">{product.variants.length} variants</p>
                                                )}
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="font-bold text-purple-600">{product.stock.preOrders}/{product.stock.quota}</p>
                                                <p className="text-xs text-gray-600">{product.stock.depositsCollected} deposits</p>
                                                <p className="text-xs text-orange-600 mt-1">
                                                    Due: {product.preOrderDetails.expectedArrival}
                                                </p>
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <div>
                                            <p className="font-bold text-gray-800">${product.pricing.price}</p>
                                            {product.pricing.salePrice && (
                                                <p className="text-sm text-green-600">${product.pricing.salePrice} sale</p>
                                            )}
                                            <p className="text-xs text-gray-600 mt-1">
                                                Cost: ${product.pricing.cost} • {product.pricing.margin.toFixed(1)}% margin
                                            </p>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            {getVelocityIcon(product.performance.velocity)}
                                            <span className="text-sm font-semibold text-gray-800">{product.performance.sold} sold</span>
                                        </div>
                                        <p className="text-sm text-green-600 font-semibold">${product.performance.revenue}</p>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${status.color}`}>
                                            {status.text}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button
                                                title="View Details"
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                title="Edit Product"
                                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                title="Update Stock"
                                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                            >
                                                <RefreshCw className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {filteredInventory.length === 0 && (
                <div className="text-center py-12">
                    <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No Products Found</h3>
                    <p className="text-gray-600">Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    )
}

export default InventoryTable