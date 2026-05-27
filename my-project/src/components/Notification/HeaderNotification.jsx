import React from 'react'
import { AlertCircle, Download, Plus, Search, Eye, Edit, RefreshCw, BarChart3, TrendingDown, ArrowLeft, Bell, Check, CheckCheck, Clock, DollarSign, Filter, MessageSquare, Package, Settings, ShoppingCart, Trash2, TrendingUp, X  } from 'lucide-react';

const HeaderNotification = ({unreadCount, markAllAsRead, clearAll}) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button
                    onClick={() => window.history.back()}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Notifications</h2>
                    <p className="text-gray-600 mt-1">
                        {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                    </p>
                </div>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={markAllAsRead}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                    <CheckCheck className="w-4 h-4" />
                    Mark All Read
                </button>
                <button
                    onClick={clearAll}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
                >
                    <Trash2 className="w-4 h-4" />
                    Clear All
                </button>
            </div>
        </div>
    )
}

export default HeaderNotification