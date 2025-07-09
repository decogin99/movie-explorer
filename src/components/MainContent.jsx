import { useState, useEffect } from 'react';
import { tmdbApi } from '../services/tmdb';
import MovieCard from './MovieCard';
import TVShowCard from './TVShowCard';
import { useNavigate } from 'react-router-dom';

export default function MainContent() {
    const [movies, setMovies] = useState({
        popular: [],
        upcoming: [],
        topRated: []
    });
    const [tvShows, setTvShows] = useState({
        popular: []
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllContent = async () => {
            const [popularMovies, upcomingMovies, topRatedMovies, popularTVShows] = await Promise.all([
                tmdbApi.getPopularMovies(),
                tmdbApi.getUpcomingMovies(),
                tmdbApi.getTopRatedMovies(),
                tmdbApi.getPopularTVShows()
            ]);

            setMovies({
                popular: popularMovies,
                upcoming: upcomingMovies,
                topRated: topRatedMovies
            });

            setTvShows({
                popular: popularTVShows
            });

            setLoading(false);
        };
        fetchAllContent();
    }, []);

    const MovieSection = ({ title, movies, viewAllPath = '/movies', filter = null }) => (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">{title}</h3>
                <button
                    onClick={() => {
                        if (filter) {
                            navigate(viewAllPath, { state: { filter } });
                        } else {
                            navigate(viewAllPath);
                        }
                    }}
                    className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    View All
                </button>
            </div>
            <div className="flex overflow-x-auto hide-scrollbar space-x-4 pb-4">
                {loading ? (
                    [...Array(9)].map((_, i) => (
                        <div key={i} className="w-32 flex-shrink-0 min-w-[8rem]">
                            <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                        </div>
                    ))
                ) : (
                    movies.map(movie => (
                        <div key={movie.id} className="w-32 flex-shrink-0 min-w-[8rem]">
                            <MovieCard movie={movie} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    const TVShowSection = ({ title, shows, viewAllPath = '/tvshows' }) => (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">{title}</h3>
                <button
                    onClick={() => navigate(viewAllPath)}
                    className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    View All
                </button>
            </div>
            <div className="flex overflow-x-auto hide-scrollbar space-x-4 pb-4">
                {loading ? (
                    [...Array(9)].map((_, i) => (
                        <div key={i} className="w-32 flex-shrink-0 min-w-[8rem]">
                            <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                        </div>
                    ))
                ) : (
                    shows.map(show => (
                        <div key={show.id} className="w-32 flex-shrink-0 min-w-[8rem]">
                            <TVShowCard show={show} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    return (
        <main className="mobile-content hide-scrollbar overflow-y-auto px-4 mt-1">
            <div className="space-y-4">
                <MovieSection title="Upcoming Movies" movies={movies.upcoming} filter="upcoming" />
                <MovieSection title="Popular Movies" movies={movies.popular} />
                <MovieSection title="Top Rated Movies" movies={movies.topRated} filter="vote_count.desc" />
                <TVShowSection title="Popular TV Shows" shows={tvShows.popular} />
            </div>
        </main>
    );
}