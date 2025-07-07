import { useNavigate, useLocation } from 'react-router-dom'

export default function Footer() {
    const navigate = useNavigate()
    const location = useLocation()
    const currentPath = location.pathname

    const getActiveTab = (path) => {
        switch (path) {
            case '/':
                return 'home'
            case '/movies':
                return 'movies'
            case '/favorites':
                return 'favorites'
            default:
                return 'home'
        }
    }

    const handleTabChange = (tab) => {
        switch (tab) {
            case 'home':
                navigate('/')
                break
            case 'movies':
                navigate('/movies')
                break
            case 'favorites':
                navigate('/favorites')
                break
        }
    }

    return (
        <footer className="mobile-footer fixed bottom-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex justify-around items-center h-16">
                <button
                    onClick={() => handleTabChange('home')}
                    className={`flex flex-col items-center space-y-1 ${getActiveTab(currentPath) === 'home' ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400'}`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="text-xs">Home</span>
                </button>

                <button
                    onClick={() => handleTabChange('movies')}
                    className={`flex flex-col items-center space-y-1 ${getActiveTab(currentPath) === 'movies' ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400'}`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                    <span className="text-xs">Movies</span>
                </button>

                <button
                    onClick={() => handleTabChange('favorites')}
                    className={`flex flex-col items-center space-y-1 ${getActiveTab(currentPath) === 'favorites' ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400'}`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-xs">Favorites</span>
                </button>
            </nav>
        </footer>
    )
}