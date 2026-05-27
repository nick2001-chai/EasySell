import React from 'react'

const Conversations = ({filteredConversations, setSelectedChat, selectedChat, getPlatformColor, getStatusBadge}) => {
    return (
        <div className="flex-1 overflow-y-auto">
            {filteredConversations.map(conv => (
                <div
                    key={conv.id}
                    onClick={() => setSelectedChat(conv)}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition ${selectedChat?.id === conv.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                >
                    <div className="flex items-start gap-3">
                        {/* Avatar */}
                        <div className="relative">
                            <div className={`w-12 h-12 rounded-full ${getPlatformColor(conv.platformColor)} flex items-center justify-center font-bold text-sm`}>
                                {conv.avatar}
                            </div>
                            {conv.online && (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                            <div className={`absolute -top-1 -left-1 w-5 h-5 ${getPlatformColor(conv.platformColor)} rounded-full flex items-center justify-center text-xs font-bold`}>
                                {conv.platform}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                                <h4 className="font-semibold text-gray-800 truncate">{conv.customerName}</h4>
                                <span className="text-xs text-gray-500">{conv.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-600 truncate mb-1">{conv.lastMessage}</p>
                            <div className="flex items-center justify-between">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(conv.status)}`}>
                                    {conv.status}
                                </span>
                                {conv.unread > 0 && (
                                    <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                                        {conv.unread}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Conversations