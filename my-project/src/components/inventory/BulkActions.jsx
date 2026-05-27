import React from 'react'
import { CheckSquare } from 'lucide-react';

const BulkActions = ({selectedProducts, handleBulkAction, setSelectedProducts}) => {
    return (
        <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
                <CheckSquare className="w-5 h-5" />
                <span className="font-semibold">{selectedProducts.length} products selected</span>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => handleBulkAction('update-stock')}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold text-sm transition"
                >
                    Update Stock
                </button>
                <button
                    onClick={() => handleBulkAction('adjust-price')}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold text-sm transition"
                >
                    Adjust Price
                </button>
                <button
                    onClick={() => handleBulkAction('export')}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold text-sm transition"
                >
                    Export Selected
                </button>
                <button
                    onClick={() => setSelectedProducts([])}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-sm transition"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default BulkActions