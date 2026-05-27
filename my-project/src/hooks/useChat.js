import React from 'react'
import { useState } from 'react';
import { Calendar, Package, Star, DollarSign } from 'lucide-react';

const useChat = () => {
    // Chat Conversation Hooks
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const conversations = [
        {
            id: 1,
            platform: 'FB',
            platformColor: 'blue',
            customerName: 'Anna Lee',
            customerId: 'anna.lee.123',
            lastMessage: 'Is this dress still available?',
            timestamp: '2m ago',
            unread: 3,
            status: 'inquiry',
            avatar: 'AL',
            online: true,
            messages: [
                { id: 1, sender: 'customer', text: 'Hi! I saw your Summer Dress on Facebook', time: '10:30 AM', read: true },
                { id: 2, sender: 'customer', text: 'Is this still available?', time: '10:31 AM', read: true },
                { id: 3, sender: 'seller', text: 'Yes! We have it in stock 😊', time: '10:32 AM', read: true },
                { id: 4, sender: 'customer', text: 'What sizes do you have?', time: '10:35 AM', read: false }
            ]
        },
        {
            id: 2,
            platform: 'IG',
            platformColor: 'pink',
            customerName: 'John Doe',
            customerId: '@johndoe',
            lastMessage: 'Can I get a discount for 2 items?',
            timestamp: '15m ago',
            unread: 1,
            status: 'interested',
            avatar: 'JD',
            online: true,
            messages: [
                { id: 1, sender: 'customer', text: 'I want to buy 2 dresses', time: '9:45 AM', read: true },
                { id: 2, sender: 'customer', text: 'Can I get a discount for 2 items?', time: '9:46 AM', read: false }
            ]
        },
        {
            id: 3,
            platform: 'WA',
            platformColor: 'green',
            customerName: 'Sarah Kim',
            customerId: '+1234567890',
            lastMessage: 'When will you ship my order?',
            timestamp: '1h ago',
            unread: 0,
            status: 'confirmed',
            avatar: 'SK',
            online: false,
            messages: [
                { id: 1, sender: 'customer', text: 'I just completed the payment', time: '8:30 AM', read: true },
                { id: 2, sender: 'seller', text: 'Great! I received it. Will ship today.', time: '8:35 AM', read: true },
                { id: 3, sender: 'customer', text: 'When will you ship my order?', time: '9:15 AM', read: true }
            ]
        },
        {
            id: 4,
            platform: 'TT',
            platformColor: 'purple',
            customerName: 'Mike Chen',
            customerId: '@mikechen',
            lastMessage: 'How much is the shipping?',
            timestamp: '2h ago',
            unread: 2,
            status: 'inquiry',
            avatar: 'MC',
            online: false,
            messages: [
                { id: 1, sender: 'customer', text: 'I love this product!', time: '7:20 AM', read: true },
                { id: 2, sender: 'customer', text: 'How much is the shipping?', time: '7:22 AM', read: false }
            ]
        }
    ];

    const filteredConversations = conversations.filter(conv => {
        const matchesSearch = conv.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || conv.status === filterStatus;
        return matchesSearch && matchesFilter;
    });


    const getStatusBadge = (status) => {
        const badges = {
            inquiry: 'bg-yellow-100 text-yellow-700',
            interested: 'bg-blue-100 text-blue-700',
            confirmed: 'bg-green-100 text-green-700'
        };
        return badges[status];
    };




    // Chat Area Hooks

    const [showTemplates, setShowTemplates] = useState(false);
    const [messageInput, setMessageInput] = useState('');

    const quickActions = [
        { icon: Package, label: 'Create Order', color: 'blue' },
        { icon: DollarSign, label: 'Send Invoice', color: 'green' },
        { icon: Calendar, label: 'Schedule', color: 'purple' },
        { icon: Star, label: 'Mark VIP', color: 'yellow' }
    ];

    const messageTemplates = [
        { id: 1, title: 'Greeting', text: 'Hi! Thank you for your message. How can I help you today? 😊' },
        { id: 2, title: 'Product Available', text: 'Yes, this product is still available! Would you like to place an order?' },
        { id: 3, title: 'Pricing Info', text: 'The price is $XX. Free shipping for orders above $50!' },
        { id: 4, title: 'Payment Details', text: 'You can pay via bank transfer or cash on delivery. Please confirm your order and I will send you the details.' },
        { id: 5, title: 'Shipping Time', text: 'We ship within 1-2 business days. Delivery takes 3-5 days depending on your location.' },
        { id: 6, title: 'Order Confirmed', text: 'Your order has been confirmed! I will notify you once it ships. Thank you! 🎉' }
    ];

    const insertTemplate = (template) => {
        setMessageInput(template.text);
        setShowTemplates(false);
    };


    const handleSendMessage = () => {
        if (messageInput.trim()) {
            // Add message logic here
            console.log('Sending:', messageInput);
            setMessageInput('');
        }
    };


    return { quickActions, showTemplates, setShowTemplates, messageTemplates, insertTemplate, messageInput, handleSendMessage, setSearchTerm, searchTerm, setFilterStatus, filteredConversations, getStatusBadge }

}

export default useChat