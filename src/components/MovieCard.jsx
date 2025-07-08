import { useState } from 'react';
import MovieDetail from './MovieDetail';
import { useFavorites } from '../hooks/useFavorites';

export default function MovieCard({ movie }) {
    const [showDetail, setShowDetail] = useState(false);
    const { toggleFavorite, isFavorite } = useFavorites();
    const isMovieFavorite = isFavorite(movie.id);

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        toggleFavorite(movie);
    };

    return (
        <>
            <div
                className="w-full cursor-pointer transition transform hover:scale-102"
                onClick={() => setShowDetail(true)}
            >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    <button
                        onClick={handleFavoriteClick}
                        className="absolute top-2 right-2 p-1 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-all"
                    >
                        <svg
                            className={`w-5 h-5 ${isMovieFavorite ? 'text-red-500' : 'text-white'}`}
                            fill={isMovieFavorite ? 'currentColor' : 'none'}
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
                </div>
                <h4 className="mt-2 text-sm font-medium truncate">{movie.title}</h4>
                {/* <span className='text-xs'>{new Date(movie.release_date).getFullYear()}</span> */}
                <span className='text-xs'>
                    {new Date(movie.release_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
                </span>
            </div>

            {showDetail && (
                <MovieDetail
                    movieId={movie.id}
                    onClose={() => setShowDetail(false)}
                />
            )}
        </>
    );
}