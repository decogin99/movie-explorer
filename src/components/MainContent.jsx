import { useState, useEffect } from 'react';
import { tmdbApi } from '../services/tmdb';
import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';

export default function MainContent() {
    const [movies, setMovies] = useState({
        popular: [],
        upcoming: [],
        topRated: []
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllMovies = async () => {
            const [popular, upcoming, topRated] = await Promise.all([
                tmdbApi.getPopularMovies(),
                tmdbApi.getUpcomingMovies(),
                tmdbApi.getTopRatedMovies()
            ]);

            setMovies({
                popular,
                upcoming,
                topRated
            });
            setLoading(false);
        };
        fetchAllMovies();
    }, []);

    const MovieSection = ({ title, movies }) => (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">{title}</h3>
                <button
                    onClick={() => navigate('/movies')}
                    className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    View All
                </button>
            </div>
            <div className="flex overflow-x-auto hide-scrollbar space-x-4 pb-4">
                {loading ? (
                    [...Array(9)].map((_, i) => (
                        <div key={i} className="w-32 h-48 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    ))
                ) : (
                    movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                )}
            </div>
        </div>
    );

    return (
        <main className="mobile-content hide-scrollbar overflow-y-auto px-4 mt-1">
            <div className="space-y-4">
                <MovieSection title="Upcoming Movies" movies={movies.upcoming} />
                <MovieSection title="Popular Movies" movies={movies.popular} />
                <MovieSection title="Top Rated Movies" movies={movies.topRated} />
            </div>
        </main>
    );
}