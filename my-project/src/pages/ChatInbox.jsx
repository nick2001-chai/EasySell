import React from 'react'
import { useState } from 'react';
import { Send } from 'lucide-react';
import SearchChat from '../components/chatbox/SearchChat';
import Conversations from '../components/chatbox/Conversations';
import ChatArea from '../components/chatbox/ChatArea';
import useChat from '../hooks/useChat';


function ChatInbox({ getPlatformColor }) {
    const { ...chatHook } = useChat();
    const [selectedChat, setSelectedChat] = useState(null);

    return (
        <div className="flex h-[calc(100vh-8rem)] bg-gray-50 rounded-lg shadow-lg overflow-hidden">
            {/* Conversations List */}
            <div className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col">
                {/* Header */}
                <SearchChat {...chatHook} />

                {/* Conversations */}
                <Conversations
                    getPlatformColor={getPlatformColor}
                    setSelectedChat={setSelectedChat}
                    {...chatHook}
                />
            </div>

            {/* Chat Area */}
            {selectedChat ? (
                <ChatArea
                    getPlatformColor={getPlatformColor}
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                    {...chatHook}
                />
            ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Send className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Select a conversation</h3>
                        <p className="text-gray-600">Choose a chat from the list to start messaging</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatInbox