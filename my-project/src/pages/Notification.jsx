import React from 'react'
import { AlertCircle, Download, Plus, Search, Eye, Edit, RefreshCw, BarChart3, TrendingDown, ArrowLeft, Bell, Check, CheckCheck, Clock, DollarSign, Filter, MessageSquare, Package, Settings, ShoppingCart, Trash2, TrendingUp, X } from 'lucide-react';
import useNotification from '../hooks/useNotification';
import HeaderNotification from '../components/Notification/HeaderNotification';
import FilterTabs from '../components/Notification/FilterTabs';
import NotificationList from '../components/Notification/NotificationList';
import NotificationSetting from '../components/Notification/NotificationSetting';

const Notification = () => {
    const { unreadCount, markAllAsRead, clearAll, notifications, setFilter, filter, filteredNotifications, getIconColor, getPriorityBadge, markAsRead, deleteNotification } = useNotification();

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
           <HeaderNotification unreadCount={unreadCount} markAllAsRead={markAllAsRead} clearAll={clearAll} />

            {/* Filter Tabs */}
           <FilterTabs notifications={notifications} setFilter={setFilter} filter={filter} unreadCount={unreadCount} ShoppingCart={ShoppingCart} />

            {/* Notifications List */}
           <NotificationList filteredNotifications={filteredNotifications} getIconColor={getIconColor} getPriorityBadge={getPriorityBadge} markAsRead={markAsRead} deleteNotification={deleteNotification} />

            {/* Notification Settings */}
           <NotificationSetting />
        </div>
    )
}

export default Notification