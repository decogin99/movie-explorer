export default function Footer({ activeTab, setActiveTab }) {
    return (
        <footer className="mobile-footer bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <nav className="px-4 py-2 flex items-center justify-between">
                <button
                    onClick={() => setActiveTab('home')}
                    className={`flex flex-col items-center p-2 flex-1 ${activeTab === 'home' ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400'}`}
                >
                    <svg className="w-6 h-6" fill={activeTab === 'home' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'home' ? 1 : 2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="text-xs mt-1">Home</span>
                </button>

                <button
                    onClick={() => setActiveTab('trending')}
                    className={`flex flex-col items-center p-2 flex-1 ${activeTab === 'trending' ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400'}`}
                >
                    <svg className="w-6 h-6" fill={activeTab === 'trending' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'trending' ? 1 : 2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-xs mt-1">Trending</span>
                </button>

                <button
                    onClick={() => setActiveTab('search')}
                    className={`flex flex-col items-center p-2 flex-1 ${activeTab === 'search' ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400'}`}
                >
                    <svg className="w-6 h-6" fill={activeTab === 'search' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'search' ? 1 : 2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="text-xs mt-1">Search</span>
                </button>

                <button
                    onClick={() => setActiveTab('favorites')}
                    className={`flex flex-col items-center p-2 flex-1 ${activeTab === 'favorites' ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400'}`}
                >
                    <svg className="w-6 h-6" fill={activeTab === 'favorites' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'favorites' ? 1 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-xs mt-1">Favorites</span>
                </button>
            </nav>
        </footer>
    )
}