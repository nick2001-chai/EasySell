import React from 'react'
import { useState } from 'react';

const useDashBoard = () => {
    const [timeRange, setTimeRange] = useState('today');

     // Add order pipeline data here
  const orderPipeline = [
    { status: 'Pending', count: 8, color: 'yellow' },
    { status: 'Processing', count: 12, color: 'blue' },
    { status: 'Shipped', count: 15, color: 'purple' },
    { status: 'Delivered', count: 45, color: 'green' }
  ];

   const platformStats = [
    { platform: 'Facebook', orders: 45, revenue: 4680, color: 'blue' },
    { platform: 'Instagram', orders: 38, revenue: 3920, color: 'pink' },
    { platform: 'WhatsApp', orders: 22, revenue: 2280, color: 'green' },
    { platform: 'TikTok', orders: 15, revenue: 1560, color: 'purple' }
  ];

   const recentMessages = [
    { platform: 'FB', customer: 'Lisa Wong', message: 'Is this still available?', time: '2m ago', unread: true },
    { platform: 'IG', customer: 'Tom Baker', message: 'Can I get a discount?', time: '10m ago', unread: true },
    { platform: 'WA', customer: 'Emma Stone', message: 'When will you ship?', time: '25m ago', unread: false }
  ];

   const recentOrders = [
    { id: '#1045', customer: 'Anna Lee', product: 'Summer Dress', amount: 45, status: 'pending', time: '5 min ago' },
    { id: '#1044', customer: 'John Doe', product: 'Casual Shirt', amount: 32, status: 'processing', time: '15 min ago' },
    { id: '#1043', customer: 'Sarah Kim', product: 'Floral Skirt', amount: 58, status: 'shipped', time: '1 hour ago' },
    { id: '#1042', customer: 'Mike Chen', product: 'Sports Jacket', amount: 120, status: 'delivered', time: '2 hours ago' }
  ];

    const topProducts = [
    { name: 'Summer Dress A', sold: 45, revenue: 2250, stock: 12, trend: 'up' },
    { name: 'Casual Shirt B', sold: 38, revenue: 1900, stock: 8, trend: 'up' },
    { name: 'Floral Skirt C', sold: 32, revenue: 1856, stock: 3, trend: 'down' },
    { name: 'Sports Jacket D', sold: 28, revenue: 3360, stock: 15, trend: 'up' }
  ];

  return {timeRange, setTimeRange, orderPipeline, platformStats, recentMessages, recentOrders, topProducts}
}

export default useDashBoard