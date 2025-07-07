import { useState, useEffect } from 'react';
import { tmdbApi } from '../services/tmdb';
import { useFavorites } from '../context/FavoritesContext';

export default function MovieDetail({ movieId, onClose }) {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const { toggleFavorite, isFavorite } = useFavorites();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const details = await tmdbApi.getMovieDetails(movieId);
            setMovie(details);
            setLoading(false);
            console.log(details)
        };
        fetchMovieDetails();
    }, [movieId]);

    if (loading) {
        return (
            <div className="fixed inset-0 w-full backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-[60]">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 w-full max-w-lg mx-4 animate-pulse">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                </div>
            </div>
        );
    }

    if (!movie) return null;

    return (
        <div className="fixed inset-0 flex flex-col w-full backdrop-blur-sm bg-opacity-50 items-center justify-center z-[60]">
            <div className="bg-white dark:bg-gray-800 rounded-md max-w-lg w-full max-h-[90vh] overflow-y-auto hide-scrollbar ring-1 ring-gray-700 shadow-md">
                <div className="relative">
                    <img
                        src={tmdbApi.getImageUrl(movie.backdrop_path, 'w780')}
                        alt={movie.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                        <button
                            onClick={() => toggleFavorite(movie)}
                            className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all"
                        >
                            <svg 
                                className={`w-6 h-6 ${isFavorite(movie.id) ? 'text-red-500 fill-current' : 'text-white'}`} 
                                fill={isFavorite(movie.id) ? 'currentColor' : 'none'} 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                                />
                            </svg>
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <span>{new Date(movie.release_date).getFullYear()}</span>
                        <span className='flex items-center gap-1'>
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-yellow-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            {movie.runtime} min</span>
                        <span className="flex items-center">
                            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {movie.vote_average.toFixed(1)}
                        </span>
                    </div>

                    {movie.tagline && 
                        <p className="text-gray-700 dark:text-gray-300 mb-2 italic font-bold">{movie.tagline}</p>
                    }
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{movie.overview}</p>

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold mb-2">Genres</h3>
                            <div className="flex flex-wrap gap-2">
                                {movie.genres.map(genre => (
                                    <span
                                        key={genre.id}
                                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}