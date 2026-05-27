import React from 'react'
import { Calendar, ChartArea, Check, CheckCheck, Clock, DollarSign, Image, MoreVertical, Package, Paperclip, Phone, Search, Send, Smile, Star, Video } from 'lucide-react';

const ChatArea = ({selectedChat, getPlatformColor, showTemplates, quickActions, setShowTemplates, messageTemplates, insertTemplate, messageInput, setMessageInput, handleSendMessage}) => {
  return (
     <div className="flex-1 flex flex-col bg-white">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 bg-linear-to-r from-blue-50 to-purple-50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className={`w-10 h-10 rounded-full ${getPlatformColor(selectedChat.platformColor)} flex items-center justify-center font-bold text-sm`}>
                                        {selectedChat.avatar}
                                    </div>
                                    {selectedChat.online && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">{selectedChat.customerName}</h3>
                                    <p className="text-xs text-gray-600">{selectedChat.customerId}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPlatformColor(selectedChat.platformColor)}`}>
                                    {selectedChat.platform}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-white rounded-lg transition">
                                    <Phone className="w-5 h-5 text-gray-600" />
                                </button>
                                <button className="p-2 hover:bg-white rounded-lg transition">
                                    <Video className="w-5 h-5 text-gray-600" />
                                </button>
                                <button className="p-2 hover:bg-white rounded-lg transition">
                                    <MoreVertical className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Bar */}
                    <div className="p-3 border-b border-gray-200 bg-gray-50">
                        <div className="flex gap-2 overflow-x-auto">
                            {quickActions.map((action, index) => (
                                <button
                                    key={index}
                                    className={`flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:shadow-md transition whitespace-nowrap text-sm`}
                                >
                                    <action.icon className={`w-4 h-4 text-${action.color}-600`} />
                                    <span className="font-semibold text-gray-700">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {selectedChat.messages.map(msg => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'seller' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-xs md:max-w-md ${msg.sender === 'seller' ? 'order-2' : 'order-1'}`}>
                                    <div
                                        className={`px-4 py-3 rounded-2xl ${msg.sender === 'seller'
                                            ? 'bg-blue-600 text-white rounded-tr-sm'
                                            : 'bg-white text-gray-800 rounded-tl-sm shadow-md'
                                            }`}
                                    >
                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                    <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'seller' ? 'justify-end' : 'justify-start'}`}>
                                        <span className="text-xs text-gray-500">{msg.time}</span>
                                        {msg.sender === 'seller' && (
                                            msg.read ? (
                                                <CheckCheck className="w-3 h-3 text-blue-600" />
                                            ) : (
                                                <Check className="w-3 h-3 text-gray-400" />
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Templates Panel */}
                    {showTemplates && (
                        <div className="p-3 border-t border-gray-200 bg-white max-h-48 overflow-y-auto">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-800 text-sm">Quick Templates</h4>
                                <button onClick={() => setShowTemplates(false)} className="text-gray-500 hover:text-gray-700">
                                    ×
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {messageTemplates.map(template => (
                                    <button
                                        key={template.id}
                                        onClick={() => insertTemplate(template)}
                                        className="text-left p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition"
                                    >
                                        <p className="font-semibold text-sm text-gray-800 mb-1">{template.title}</p>
                                        <p className="text-xs text-gray-600 line-clamp-2">{template.text}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Message Input */}
                    <div className="p-4 border-t border-gray-200 bg-white">
                        <div className="flex items-end gap-2">
                            <button
                                onClick={() => setShowTemplates(!showTemplates)}
                                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                title="Quick Templates"
                            >
                                <Clock className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                <Image className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                <Paperclip className="w-5 h-5" />
                            </button>

                            <div className="flex-1 relative">
                                <textarea
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                    placeholder="Type your message..."
                                    rows="1"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                <Smile className="w-5 h-5" />
                            </button>

                            <button
                                onClick={handleSendMessage}
                                disabled={!messageInput.trim()}
                                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
  )
}

export default ChatArea