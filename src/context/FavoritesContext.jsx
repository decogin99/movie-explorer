import { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('movieFavorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('movieFavorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (movie) => {
        setFavorites(prev => {
            const exists = prev.find(f => f.id === movie.id);
            if (exists) {
                return prev.filter(f => f.id !== movie.id);
            }
            return [...prev, movie];
        });
    };

    const isFavorite = (movieId) => {
        return favorites.some(f => f.id === movieId);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export const useFavorites = () => useContext(FavoritesContext);