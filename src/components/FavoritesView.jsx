import { useEffect } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from './MovieCard';
import TVShowCard from './TVShowCard';

export default function FavoritesView() {
    const { favorites } = useFavorites();

    useEffect(() => {
        document.title = "Favourites";
        return () => {
            document.title = "Movie Explorer";
        };
    }, []);

    if (favorites.length === 0) {
        return (
            <div className="fixed w-full h-full flex flex-col items-center justify-center text-center px-4">
                <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">No Favorites Yet</h3>
                <p className="text-gray-500 dark:text-gray-400">Start adding movies and TV shows to your favorites list!</p>
            </div>
        );
    }

    return (
        <div className="mobile-content hide-scrollbar overflow-y-auto px-4 my-2">
            <div className="max-w-7xl mx-auto flex flex-col gap-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 w-full mx-auto gap-4">
                    {favorites.map(item => (
                        // Check if it's a movie or TV show based on whether it has title or name property
                        item.title ? (
                            <MovieCard key={item.id} movie={item} />
                        ) : (
                            <TVShowCard key={item.id} show={item} />
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}