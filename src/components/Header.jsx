export default function Header() {
    return (
        <header className="mobile-header bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        Movie Explorer
                    </h1>
                </div>
                <div className="flex items-center space-x-2">

                </div>
            </div>
        </header>
    )
}