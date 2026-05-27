import { Search} from 'lucide-react';

const SearchChat = ({searchTerm, setSearchTerm, filterStatus, setFilterStatus}) => {
    return (
        <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Messages</h2>

            {/* Search */}
            <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Filter */}
            <div className="flex gap-2">
                {['all', 'inquiry', 'interested', 'confirmed'].map(filter => (
                    <button
                        key={filter}
                        onClick={() => setFilterStatus(filter)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition ${filterStatus === filter
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SearchChat