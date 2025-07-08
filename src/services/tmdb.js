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
    getUpcomingMovies: async () => {
        try {
            const userRegion = Intl.DateTimeFormat().resolvedOptions().locale.split('-')[1] || 'US';

            console.log(userRegion)

            const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'en-US',
                    region: userRegion,   // 👈 Dynamic region based on user locale
                    page: 1
                }
            });

            return response.data.results;
        } catch (error) {
            console.error('Error fetching upcoming movies:', error);
            return [];
        }
    },
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
    },

    async getMovieGenres() {
        const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
            params: {
                api_key: TMDB_API_KEY,
            }
        });
        return response.data.genres;
    },

    async discoverMovies({ page = 1, sort_by = 'popularity.desc', with_genres = '' }) {
        const response = await axios.get(`${BASE_URL}/discover/movie`, {
            params: {
                api_key: TMDB_API_KEY,
                page,
                sort_by,
                with_genres,
                include_adult: false
            }
        });
        return {
            ...response.data,
            results: response.data.results.slice(0, 20)
        };
    },
    async searchMovies(query, page = 1) {
        try {
            const response = await axios.get(`${BASE_URL}/search/movie`, {
                params: {
                    api_key: TMDB_API_KEY,
                    query,
                    page,
                    include_adult: false
                }
            });

            return {
                ...response.data,
                results: response.data.results.slice(0, 20)
            };
        } catch (error) {
            console.error('Error searching movies:', error);
            return { results: [], total_pages: 0 };
        }
    },
};
