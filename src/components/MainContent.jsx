export default function MainContent() {
    return (
        <main className="mobile-content hide-scrollbar overflow-y-auto px-4 my-4">
            <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-6 text-white shadow-lg">
                    <h2 className="text-2xl font-bold">Welcome Back! 👋</h2>
                    <p className="mt-2 text-blue-50">
                        Discover your next favorite movie from our curated collection
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-3">Continue Watching</h3>
                    <div className="flex overflow-x-auto hide-scrollbar space-x-4 pb-4">
                        {/* Placeholder for movie cards */}
                        <div className="w-32 h-48 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                        <div className="w-32 h-48 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                        <div className="w-32 h-48 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-3">Continue Watching</h3>
                    <div className="flex overflow-x-auto hide-scrollbar space-x-4 pb-4">
                        {/* Placeholder for movie cards */}
                        <div className="w-32 h-48 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                        <div className="w-32 h-48 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                        <div className="w-32 h-48 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    </div>
                </div>
            </div>
        </main>
    )
}