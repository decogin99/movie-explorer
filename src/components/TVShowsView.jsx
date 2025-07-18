import { useState, useEffect } from 'react';
import { tmdbApi } from '../services/tmdb';
import TVShowCard from './TVShowCard';

export default function TVShowsView() {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [sortBy, setSortBy] = useState('popularity.desc');
    const [genres, setGenres] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [isAiringToday, setIsAiringToday] = useState(false);

    useEffect(() => {
        const fetchGenres = async () => {
            const genreList = await tmdbApi.getTVShowGenres();
            setGenres(genreList);
        };
        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchShows = async () => {
            setLoading(true);
            let data;
            if (isSearching && searchQuery.trim()) {
                data = await tmdbApi.searchTVShows(searchQuery, page);
            } else if (isAiringToday) {
                data = await tmdbApi.getAiringTodayTVShows(page);
            } else {
                data = await tmdbApi.discoverTVShows({
                    page,
                    sort_by: sortBy,
                    with_genres: selectedGenres.join(',')
                });
            }
            setShows(data.results);
            setTotalPages(data.total_pages);
            setLoading(false);
        };
        fetchShows();
    }, [page, selectedGenres, sortBy, isSearching, isAiringToday]); // Remove searchQuery from dependencies

    const handleGenreChange = (genreId) => {
        // Clear search when using genre filter
        setSearchQuery('');
        setIsSearching(false);
        setIsAiringToday(false);

        setSelectedGenres(prev => {
            const id = genreId.toString();
            if (prev.includes(id)) {
                return prev.filter(g => g !== id);
            } else {
                return [...prev, id];
            }
        });
        setPage(1);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Clear genre filters when searching
        setSelectedGenres([]);
        setIsSearching(true);
        setIsAiringToday(false);
        setPage(1);
        e.target.searchInput.blur(); // Use the correct field name
    };

    const clearSearch = () => {
        setSearchQuery('');
        setIsSearching(false);
        setPage(1);
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        if (value === 'airing_today') {
            setIsAiringToday(true);
            setSortBy('popularity.desc');
        } else {
            setIsAiringToday(false);
            setSortBy(value);
        }
        setPage(1);
    };

    useEffect(() => {
        document.title = "TV Shows";
        return () => {
            document.title = "Movie Explorer";
        };
    }, []);

    return (
        <div className="mobile-content hide-scrollbar overflow-y-auto px-4 mb-2">
            <div className="max-w-7xl mx-auto flex flex-col gap-4">
                <div className="flex flex-col gap-4 p-2">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap gap-2">
                            {genres.map(g => (
                                <button
                                    key={g.id}
                                    onClick={() => handleGenreChange(g.id)}
                                    className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedGenres.includes(g.id.toString())
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    {g.name}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center w-full">
                            <form onSubmit={handleSearch} className="flex gap-2 flex-1 w-full sm:w-auto">
                                <input
                                    type="text"
                                    name="searchInput"
                                    value={searchQuery}
                                    autoComplete='off'
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search TV shows..."
                                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm flex-1"
                                />
                                <button
                                    type="submit"
                                    className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm whitespace-nowrap"
                                >
                                    Search
                                </button>
                            </form>
                            {isSearching && (
                                <button
                                    onClick={clearSearch}
                                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm whitespace-nowrap"
                                >
                                    Clear
                                </button>
                            )}
                            {!isSearching && (
                                <select
                                    name='sortSelect'
                                    value={isAiringToday ? 'airing_today' : sortBy}
                                    onChange={handleSortChange}
                                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm w-full sm:w-auto"
                                >
                                    <option value="popularity.desc">Most Popular</option>
                                    <option value="airing_today">Airing Today</option>
                                    <option value="vote_count.desc">Top Rated</option>
                                    <option value="first_air_date.desc">Recently Added</option>
                                </select>
                            )}
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4 w-full mx-auto">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto flex flex-col gap-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4 w-full mx-auto">
                            {shows.map(show => (
                                <TVShowCard key={show.id} show={show} />
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex justify-center gap-2 mt-2">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                        {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}