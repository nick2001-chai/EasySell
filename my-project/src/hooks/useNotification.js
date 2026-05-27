import React from 'react'
import { useState } from 'react'
import { AlertCircle, Download, Plus, Search, Eye, Edit, RefreshCw, BarChart3, TrendingDown, ArrowLeft, Bell, Check, CheckCheck, Clock, DollarSign, Filter, MessageSquare, Package, Settings, ShoppingCart, Trash2, TrendingUp, X } from 'lucide-react';

const useNotification = () => {
    // Notification
    const [filter, setFilter] = useState('all');


    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'order',
            icon: ShoppingCart,
            color: 'blue',
            title: 'New Order Received',
            message: 'Anna Lee placed an order for Summer Dress - Order #1045',
            time: '2 minutes ago',
            read: false,
            priority: 'high',
            actionText: 'View Order',
            actionLink: 'order-detail'
        },
        {
            id: 2,
            type: 'payment',
            icon: DollarSign,
            color: 'green',
            title: 'Payment Received',
            message: 'John Doe completed payment of $32 for Order #1044',
            time: '15 minutes ago',
            read: false,
            priority: 'medium',
            actionText: 'View Payment',
            actionLink: 'payment-detail'
        },
        {
            id: 3,
            type: 'message',
            icon: MessageSquare,
            color: 'purple',
            title: 'New Message',
            message: 'Lisa Wong: "Is this still available?"',
            time: '20 minutes ago',
            read: false,
            priority: 'high',
            actionText: 'Reply',
            actionLink: 'messages'
        },
        {
            id: 4,
            type: 'stock',
            icon: AlertCircle,
            color: 'red',
            title: 'Low Stock Alert',
            message: 'Floral Skirt C is running low - Only 3 units left',
            time: '1 hour ago',
            read: true,
            priority: 'high',
            actionText: 'Restock',
            actionLink: 'inventory'
        },
        {
            id: 5,
            type: 'shipping',
            icon: Package,
            color: 'orange',
            title: 'Ready to Ship',
            message: 'Order #1043 is packed and ready for shipping',
            time: '2 hours ago',
            read: true,
            priority: 'medium',
            actionText: 'Ship Now',
            actionLink: 'shipping'
        },
        {
            id: 6,
            type: 'order',
            icon: CheckCheck,
            color: 'green',
            title: 'Order Delivered',
            message: 'Order #1042 has been delivered to Mike Chen',
            time: '3 hours ago',
            read: true,
            priority: 'low',
            actionText: 'View Details',
            actionLink: 'order-detail'
        },
        {
            id: 7,
            type: 'message',
            icon: MessageSquare,
            color: 'purple',
            title: 'New Message',
            message: 'Tom Baker: "Can I get a discount?"',
            time: '4 hours ago',
            read: false,
            priority: 'medium',
            actionText: 'Reply',
            actionLink: 'messages'
        },
        {
            id: 8,
            type: 'payment',
            icon: Clock,
            color: 'yellow',
            title: 'Payment Pending',
            message: 'Reminder: Emma Wilson has not completed payment for Order #1041',
            time: '5 hours ago',
            read: true,
            priority: 'high',
            actionText: 'Send Reminder',
            actionLink: 'payment-reminder'
        },
        {
            id: 9,
            type: 'system',
            icon: TrendingUp,
            color: 'blue',
            title: 'Sales Milestone',
            message: 'Congratulations! You reached $10,000 in total sales this month',
            time: '1 day ago',
            read: true,
            priority: 'low',
            actionText: 'View Stats',
            actionLink: 'dashboard'
        },
        {
            id: 10,
            type: 'stock',
            icon: AlertCircle,
            color: 'red',
            title: 'Out of Stock',
            message: 'Winter Coat E is now out of stock',
            time: '1 day ago',
            read: true,
            priority: 'high',
            actionText: 'Restock',
            actionLink: 'inventory'
        }
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const getIconColor = (color) => {
        const colors = {
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-green-100 text-green-600',
            purple: 'bg-purple-100 text-purple-600',
            red: 'bg-red-100 text-red-600',
            orange: 'bg-orange-100 text-orange-600',
            yellow: 'bg-yellow-100 text-yellow-600'
        };
        return colors[color] || 'bg-gray-100 text-gray-600';
    };

    const getPriorityBadge = (priority) => {
        const badges = {
            high: 'bg-red-100 text-red-700',
            medium: 'bg-yellow-100 text-yellow-700',
            low: 'bg-gray-100 text-gray-700'
        };
        return badges[priority];
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, read: true } : notif
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(notif => notif.id !== id));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    const filteredNotifications = notifications.filter(notif => {
        if (filter === 'all') return true;
        if (filter === 'unread') return !notif.read;
        return notif.type === filter;
    });

    const [_showStatusModal, _setShowStatusModal] = useState(false);
    return {setFilter, unreadCount, getIconColor, getPriorityBadge, markAsRead, markAllAsRead, deleteNotification, clearAll, filteredNotifications, notifications }
}

export default useNotification