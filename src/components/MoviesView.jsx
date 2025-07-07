import { useState, useEffect } from 'react';
import { tmdbApi } from '../services/tmdb';
import MovieCard from './MovieCard';

export default function MoviesView() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [genre, setGenre] = useState('');
    const [sortBy, setSortBy] = useState('popularity.desc');
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            const genreList = await tmdbApi.getMovieGenres();
            setGenres(genreList);
        };
        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            const data = await tmdbApi.discoverMovies({
                page,
                sort_by: sortBy,
                with_genres: genre
            });
            setMovies(data.results);
            setTotalPages(data.total_pages);
            setLoading(false);
        };
        fetchMovies();
    }, [page, genre, sortBy]);

    return (
        <div className="mobile-content hide-scrollbar overflow-y-auto px-4 mb-2">
            <div className="max-w-7xl mx-auto flex flex-col gap-4">
                <div className="flex gap-4 overflow-x-auto hide-scrollbar py-2">
                    <select
                        value={genre}
                        onChange={(e) => {
                            setGenre(e.target.value);
                            setPage(1);
                        }}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                    >
                        <option value="">All Genres</option>
                        {genres.map(g => (
                            <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => {
                            setSortBy(e.target.value);
                            setPage(1);
                        }}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                    >
                        <option value="popularity.desc">Most Popular</option>
                        <option value="vote_average.desc">Highest Rated</option>
                        <option value="release_date.desc">Newest</option>
                        <option value="release_date.asc">Oldest</option>
                    </select>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-4">
                        {[...Array(18)].map((_, i) => (
                            <div key={i} className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="mx-auto grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-4">
                        {movies.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}

                <div className="flex justify-center gap-2 mt-4">
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