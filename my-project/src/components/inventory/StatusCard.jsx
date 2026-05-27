import React from 'react'

const StatusCard = ({stats}) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-gray-400">
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalProducts}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-400">
                <p className="text-sm text-gray-600">In Stock</p>
                <p className="text-2xl font-bold text-green-600">{stats.inStock}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-400">
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.lowStock}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-400">
                <p className="text-sm text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-400">
                <p className="text-sm text-gray-600">Pre-Orders</p>
                <p className="text-2xl font-bold text-purple-600">{stats.preOrders}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-400">
                <p className="text-sm text-gray-600">Inventory Value</p>
                <p className="text-xl font-bold text-blue-600">${stats.totalValue.toFixed(0)}</p>
            </div>
        </div>
    )
}

export default StatusCard