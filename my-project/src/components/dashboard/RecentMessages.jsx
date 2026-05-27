const RecentMessages = ({ recentMessages, setCurrentScreen }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Recent Messages</h3>
        <button
          onClick={() => setCurrentScreen("chatInbox")}
          className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
        >
          Open Inbox
        </button>
      </div>
      <div className="space-y-3">
        {recentMessages.map((msg, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-sm">
              {msg.platform}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-800">{msg.customer}</span>
                {msg.unread && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
              </div>
              <p className="text-sm text-gray-600 truncate">{msg.message}</p>
              <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentMessages;
