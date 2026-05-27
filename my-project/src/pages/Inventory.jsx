import React from 'react'
import { BarChart3, TrendingDown, TrendingUp } from 'lucide-react';
import useInventory from '../hooks/useInventory';
import HeaderInventory from '../components/inventory/HeaderInventory';
import StatusCard from '../components/inventory/StatusCard';
import SearchFilter from '../components/inventory/SearchFilter';
import BulkActions from '../components/inventory/BulkActions';
import InventoryTable from '../components/inventory/InventoryTable';

const Inventory = () => {
    const { stats, searchTerm, setSearchTerm, filterStatus, setFilterStatus, selectedProducts, handleBulkAction, setSelectedProducts, filteredInventory, selectAll, toggleProductSelection } = useInventory();

    const getStatusBadge = (product) => {
        if (product.type === 'pre-order') {
            const daysLeft = product.preOrderDetails.daysRemaining;
            if (daysLeft <= 3) {
                return { text: 'Pre-Order Ending Soon', color: 'bg-orange-100 text-orange-700' };
            }
            return { text: `Pre-Order (${product.stock.preOrders}/${product.stock.quota})`, color: 'bg-purple-100 text-purple-700' };
        }

        if (product.stock.total === 0) {
            return { text: 'Out of Stock', color: 'bg-red-100 text-red-700' };
        }

        if (product.stock.total <= product.stock.lowStockAlert) {
            return { text: `Low Stock (${product.stock.total})`, color: 'bg-yellow-100 text-yellow-700' };
        }

        return { text: `In Stock (${product.stock.total})`, color: 'bg-green-100 text-green-700' };
    };

    const getVelocityIcon = (velocity) => {
        if (velocity === 'fast') return <TrendingUp className="w-4 h-4 text-green-600" />;
        if (velocity === 'slow') return <TrendingDown className="w-4 h-4 text-red-600" />;
        return <BarChart3 className="w-4 h-4 text-blue-600" />;
    };


    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <HeaderInventory stats={stats} />

            {/* Stats Cards */}
            <StatusCard stats={stats} />

            {/* Search and Filters */}
            <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} filterStatus={filterStatus} setFilterStatus={setFilterStatus} stats={stats} />

            {/* Bulk Actions */}
            {selectedProducts.length > 0 && (
                <BulkActions selectedProducts={selectedProducts} handleBulkAction={handleBulkAction} setSelectedProducts={setSelectedProducts} />
            )}

            {/* Inventory Table */}
            <InventoryTable selectedProducts={selectedProducts} filteredInventory={filteredInventory} selectAll={selectAll} getStatusBadge={getStatusBadge} toggleProductSelection={toggleProductSelection} getVelocityIcon={getVelocityIcon} />
        </div>
    )
}

export default Inventory