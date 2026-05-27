import React from 'react'
import { AlertCircle, Download, Plus, Search, Eye, Edit, RefreshCw, BarChart3, TrendingDown, ArrowLeft, Bell, Check, CheckCheck, Clock, DollarSign, Filter, MessageSquare, Package, Settings, ShoppingCart, Trash2, TrendingUp, X } from 'lucide-react';

const NotificationList = ({filteredNotifications, getIconColor, getPriorityBadge, markAsRead, deleteNotification}) => {
    return (
        <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
                <div className="bg-white p-12 rounded-lg shadow-md text-center">
                    <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No Notifications</h3>
                    <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
                </div>
            ) : (
                filteredNotifications.map(notif => (
                    <div
                        key={notif.id}
                        className={`bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition ${!notif.read ? 'border-l-4 border-blue-500' : ''
                            }`}
                    >
                        <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-full ${getIconColor(notif.color)} flex items-center justify-center shrink-0`}>
                                <notif.icon className="w-6 h-6" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className={`font-bold text-gray-800 ${!notif.read ? 'text-blue-600' : ''}`}>
                                                {notif.title}
                                            </h4>
                                            {!notif.read && (
                                                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                            )}
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityBadge(notif.priority)}`}>
                                                {notif.priority}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-2">{notif.message}</p>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Clock className="w-3 h-3" />
                                            {notif.time}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 ml-4">
                                        {!notif.read && (
                                            <button
                                                onClick={() => markAsRead(notif.id)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                title="Mark as read"
                                            >
                                                <Check className="w-4 h-4" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteNotification(notif.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                            title="Delete"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold">
                                    {notif.actionText} →
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default NotificationList