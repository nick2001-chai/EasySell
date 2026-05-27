import React from 'react'
import { AlertCircle, Download, Plus, Search, Eye, Edit, RefreshCw, BarChart3, TrendingDown, ArrowLeft, Bell, Check, CheckCheck, Clock, DollarSign, Filter, MessageSquare, Package, Settings, ShoppingCart, Trash2, TrendingUp, X } from 'lucide-react';

const NotificationSetting = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-bold text-gray-800">Notification Preferences</h3>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                    Manage →
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <ShoppingCart className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">New Orders</span>
                    </div>
                    <label className="relative inline-block w-12 h-6 cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                    </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <MessageSquare className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-700">New Messages</span>
                    </div>
                    <label className="relative inline-block w-12 h-6 cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                    </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">Payment Updates</span>
                    </div>
                    <label className="relative inline-block w-12 h-6 cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                    </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <span className="text-gray-700">Stock Alerts</span>
                    </div>
                    <label className="relative inline-block w-12 h-6 cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default NotificationSetting