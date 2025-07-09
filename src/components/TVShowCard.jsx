import { useState } from 'react';
import TVShowDetail from './TVShowDetail';
import { useFavorites } from '../hooks/useFavorites';

export default function TVShowCard({ show }) {
    const [showDetail, setShowDetail] = useState(false);
    const { toggleFavorite, isFavorite } = useFavorites();
    const isShowFavorite = isFavorite(show.id);

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        toggleFavorite(show);
    };

    return (
        <>
            <div
                className="w-full cursor-pointer transition transform hover:scale-102"
                onClick={() => setShowDetail(true)}
            >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                    {show.poster_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                            alt={show.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">{show.name}</span>
                        </div>
                    )}
                    <button
                        onClick={handleFavoriteClick}
                        className="absolute top-2 right-2 p-1 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-all"
                    >
                        <svg
                            className={`w-5 h-5 ${isShowFavorite ? 'text-red-500' : 'text-white'}`}
                            fill={isShowFavorite ? 'currentColor' : 'none'}
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
                <h4 className="mt-2 text-sm font-medium truncate">{show.name}</h4>
                <span className='text-xs'>
                    {show.first_air_date
                        ? new Date(show.first_air_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })
                        : 'No date available'}
                </span>
            </div>

            {showDetail && (
                <TVShowDetail
                    showId={show.id}
                    onClose={() => setShowDetail(false)}
                />
            )}
        </>
    );
}