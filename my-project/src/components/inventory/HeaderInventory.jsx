import React from 'react'
import { Download,Plus } from 'lucide-react';

const HeaderInventory = ({stats}) => {
  return (
     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Inventory Management</h2>
                    <p className="text-gray-600 mt-1">{stats.totalProducts} total products • ${stats.totalValue.toFixed(2)} inventory value</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Product
                    </button>
                </div>
            </div>
  )
}

export default HeaderInventory