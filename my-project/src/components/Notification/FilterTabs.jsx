import React from 'react'
import { AlertCircle, Download, Plus, Search, Eye, Edit, RefreshCw, BarChart3, TrendingDown, ArrowLeft, Bell, Check, CheckCheck, Clock, DollarSign, Filter, MessageSquare, Package, Settings, ShoppingCart, Trash2, TrendingUp, X } from 'lucide-react';

const FilterTabs = ({ notifications, setFilter, filter, unreadCount, ShoppingCart }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-2 overflow-x-auto">
                <Filter className="w-5 h-5 text-gray-600 shrink-0" />
                {[
                    { key: 'all', label: 'All', count: notifications.length },
                    { key: 'unread', label: 'Unread', count: unreadCount },
                    { key: 'order', label: 'Orders', icon: ShoppingCart },
                    { key: 'payment', label: 'Payments', icon: DollarSign },
                    { key: 'message', label: 'Messages', icon: MessageSquare },
                    { key: 'stock', label: 'Inventory', icon: AlertCircle },
                    { key: 'shipping', label: 'Shipping', icon: Package }
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setFilter(tab.key)}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition flex items-center gap-2 ${filter === tab.key
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {tab.icon && <tab.icon className="w-4 h-4" />}
                        {tab.label}
                        {tab.count !== undefined && (
                            <span className={`px-2 py-0.5 rounded-full text-xs ${filter === tab.key ? 'bg-white/20' : 'bg-gray-200'
                                }`}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default FilterTabs