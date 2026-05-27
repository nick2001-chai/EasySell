import React from 'react'
import { useState } from 'react';

const useInventory = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [_viewMode, _setViewMode] = useState('table'); // 'table' or 'cards'

    // Complete inventory database
    const inventory = [
        {
            id: 1,
            name: 'Summer Floral Dress',
            sku: 'DRS-001',
            image: '👗',
            category: 'Clothing',
            type: 'in-stock',
            stock: {
                total: 3,
                available: 2,
                reserved: 1,
                lowStockAlert: 5
            },
            pricing: {
                cost: 20,
                price: 45,
                salePrice: 39.99,
                margin: 55.6
            },
            performance: {
                sold: 45,
                revenue: 2025,
                velocity: 'fast'
            },
            variants: [
                { size: 'S', color: 'Blue', stock: 1 },
                { size: 'M', color: 'Blue', stock: 1 },
                { size: 'L', color: 'Blue', stock: 1 }
            ],
            platforms: ['Facebook', 'Instagram'],
            lastRestocked: '2024-01-15',
            supplier: 'Fashion Supplier Co.'
        },
        {
            id: 2,
            name: 'Casual Shirt',
            sku: 'SHT-002',
            image: '👕',
            category: 'Clothing',
            type: 'in-stock',
            stock: {
                total: 8,
                available: 7,
                reserved: 1,
                lowStockAlert: 5
            },
            pricing: {
                cost: 15,
                price: 32,
                salePrice: null,
                margin: 53.1
            },
            performance: {
                sold: 38,
                revenue: 1216,
                velocity: 'medium'
            },
            variants: [
                { size: 'M', color: 'White', stock: 4 },
                { size: 'L', color: 'White', stock: 4 }
            ],
            platforms: ['Instagram', 'TikTok'],
            lastRestocked: '2024-01-18',
            supplier: 'Fashion Supplier Co.'
        },
        {
            id: 3,
            name: 'Floral Skirt',
            sku: 'SKT-003',
            image: '🌺',
            category: 'Clothing',
            type: 'pre-order',
            stock: {
                preOrders: 10,
                quota: 20,
                depositsCollected: 7
            },
            pricing: {
                cost: 25,
                price: 58,
                deposit: 20,
                margin: 56.9
            },
            performance: {
                sold: 32,
                revenue: 1856,
                velocity: 'slow'
            },
            preOrderDetails: {
                deadline: '2024-02-01',
                expectedArrival: '2024-02-15',
                daysRemaining: 10
            },
            platforms: ['Facebook', 'WhatsApp'],
            supplier: 'Premium Fashion Ltd.'
        },
        {
            id: 4,
            name: 'Sports Jacket',
            sku: 'JKT-004',
            image: '🧥',
            category: 'Outerwear',
            type: 'in-stock',
            stock: {
                total: 25,
                available: 23,
                reserved: 2,
                lowStockAlert: 5
            },
            pricing: {
                cost: 50,
                price: 120,
                salePrice: 99.99,
                margin: 58.3
            },
            performance: {
                sold: 28,
                revenue: 3360,
                velocity: 'fast'
            },
            variants: [
                { size: 'M', color: 'Black', stock: 10 },
                { size: 'L', color: 'Black', stock: 8 },
                { size: 'XL', color: 'Black', stock: 7 }
            ],
            platforms: ['Facebook', 'Instagram', 'TikTok'],
            lastRestocked: '2024-01-20',
            supplier: 'Sports Wear Inc.'
        },
        {
            id: 5,
            name: 'Designer Bag',
            sku: 'BAG-005',
            image: '👜',
            category: 'Accessories',
            type: 'in-stock',
            stock: {
                total: 0,
                available: 0,
                reserved: 0,
                lowStockAlert: 5
            },
            pricing: {
                cost: 45,
                price: 95,
                salePrice: null,
                margin: 52.6
            },
            performance: {
                sold: 15,
                revenue: 1425,
                velocity: 'slow'
            },
            variants: [],
            platforms: ['Instagram'],
            lastRestocked: '2024-01-10',
            supplier: 'Accessories Hub'
        }
    ];

    const stats = {
        totalProducts: inventory.length,
        inStock: inventory.filter(p => p.type === 'in-stock' && p.stock.total > 0).length,
        lowStock: inventory.filter(p => p.type === 'in-stock' && p.stock.total > 0 && p.stock.total <= p.stock.lowStockAlert).length,
        outOfStock: inventory.filter(p => p.type === 'in-stock' && p.stock.total === 0).length,
        preOrders: inventory.filter(p => p.type === 'pre-order').length,
        totalValue: inventory.reduce((sum, p) => {
            if (p.type === 'in-stock') {
                return sum + (p.stock.total * p.pricing.cost);
            }
            return sum;
        }, 0)
    };

    

    const filteredInventory = inventory.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesFilter = true;
        if (filterStatus === 'in-stock') {
            matchesFilter = product.type === 'in-stock' && product.stock.total > product.stock.lowStockAlert;
        } else if (filterStatus === 'low-stock') {
            matchesFilter = product.type === 'in-stock' && product.stock.total > 0 && product.stock.total <= product.stock.lowStockAlert;
        } else if (filterStatus === 'out-of-stock') {
            matchesFilter = product.type === 'in-stock' && product.stock.total === 0;
        } else if (filterStatus === 'pre-order') {
            matchesFilter = product.type === 'pre-order';
        }

        return matchesSearch && matchesFilter;
    });

    const toggleProductSelection = (productId) => {
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(selectedProducts.filter(id => id !== productId));
        } else {
            setSelectedProducts([...selectedProducts, productId]);
        }
    };

    const selectAll = () => {
        if (selectedProducts.length === filteredInventory.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(filteredInventory.map(p => p.id));
        }
    };

    const handleBulkAction = (action) => {
        alert(`Performing ${action} on ${selectedProducts.length} products`);
        setSelectedProducts([]);
    };

    return { stats, searchTerm, setSearchTerm, filterStatus, setFilterStatus, selectedProducts, setSelectedProducts, selectAll, handleBulkAction, toggleProductSelection, filteredInventory }
}

export default useInventory