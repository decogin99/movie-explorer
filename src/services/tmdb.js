import axios from 'axios';

const TMDB_API_KEY = 'c76cb5fd755490a15b33db20f1979835';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const fetchMovies = async (endpoint) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${endpoint}`, {
            params: {
                api_key: TMDB_API_KEY,
                language: 'en-US',
                page: 1
            }
        });
        return response.data.results;
    } catch (error) {
        console.error(`Error fetching ${endpoint} movies:`, error);
        return [];
    }
};

export const tmdbApi = {
    getPopularMovies: () => fetchMovies('popular'),
    getUpcomingMovies: () => fetchMovies('upcoming'),
    getTopRatedMovies: () => fetchMovies('top_rated'),
    getMovieDetails: async (movieId) => {
        try {
            const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'en-US',
                    append_to_response: 'credits,videos'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching movie details:', error);
            return null;
        }
    },
    getImageUrl: (path, size = 'w500') => {
        return path ? `${IMAGE_BASE_URL}/${size}${path}` : null;
    }
};
