import React from 'react'
import { Search } from 'lucide-react';

const SearchFilter = ({searchTerm, setSearchTerm, stats, setFilterStatus, filterStatus}) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, SKU, or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto">
                    {[
                        { key: 'all', label: 'All', count: stats.totalProducts },
                        { key: 'in-stock', label: 'In Stock', count: stats.inStock },
                        { key: 'low-stock', label: 'Low Stock', count: stats.lowStock },
                        { key: 'out-of-stock', label: 'Out of Stock', count: stats.outOfStock },
                        { key: 'pre-order', label: 'Pre-Orders', count: stats.preOrders }
                    ].map(filter => (
                        <button
                            key={filter.key}
                            onClick={() => setFilterStatus(filter.key)}
                            className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition ${filterStatus === filter.key
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {filter.label} ({filter.count})
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchFilter