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
            const region = await getUserCountry();
            const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'en-US',
                    region: region,
                }
            });

            return response.data.results;
        } catch (error) {
            console.error('Error fetching upcoming movies:', error);
            return [];
        }
    },
    // Add this new function for upcoming movies with pagination
    getUpcomingMoviesWithPagination: async (page = 1) => {
        try {
            const region = await getUserCountry();

            const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'en-US',
                    region: region,
                    page: page
                }
            });

            return {
                ...response.data,
                results: response.data.results.slice(0, 20)
            };
        } catch (error) {
            console.error('Error fetching upcoming movies with pagination:', error);
            return { results: [], total_pages: 0 };
        }
    },
    getTopRatedMovies: () => fetchMovies('top_rated'),
    getMovieDetails: async (movieId) => {
        try {
            const region = await getUserCountry();

            const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'en-US',
                    append_to_response: 'credits,videos,release_dates'
                }
            });

            const movie = response.data;

            // Get region-based release date dynamically
            const regionReleaseData = movie.release_dates?.results?.find(r => r.iso_3166_1 === region);
            const localRelease = regionReleaseData?.release_dates?.find(d => d.type === 3); // Type 3 = theatrical

            // Add custom local release date
            movie.local_release_date = localRelease?.release_date || movie.release_date;

            return movie;

        } catch (error) {
            console.error('Error fetching movie details:', error);
            return null;
        }
    },

    // New TV show functions
    getPopularTVShows: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/tv/popular`, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'en-US',
                    page: 1
                }
            });
            return response.data.results;
        } catch (error) {
            console.error('Error fetching popular TV shows:', error);
            return [];
        }
    },
    getTopRatedTVShows: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/tv/top_rated`, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'en-US',
                    page: 1
                }
            });
            return response.data.results;
        } catch (error) {
            console.error('Error fetching top rated TV shows:', error);
            return [];
        }
    },
    getAiringTodayTVShows: async (page = 1) => {
        try {
            const response = await axios.get(`${BASE_URL}/tv/airing_today`, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'en-US',
                    page: page
                }
            });
            return {
                ...response.data,
                results: response.data.results.slice(0, 20)
            };
        } catch (error) {
            console.error('Error fetching airing today TV shows:', error);
            return { results: [], total_pages: 0 };
        }
    },
    getTVShowDetails: async (tvId) => {
        try {
            const response = await axios.get(`${BASE_URL}/tv/${tvId}`, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'en-US',
                    append_to_response: 'credits,videos'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching TV show details:', error);
            return null;
        }
    },
    getTVShowGenres: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/genre/tv/list`, {
                params: {
                    api_key: TMDB_API_KEY,
                }
            });
            return response.data.genres;
        } catch (error) {
            console.error('Error fetching TV show genres:', error);
            return [];
        }
    },
    discoverTVShows: async ({ page = 1, sort_by = 'popularity.desc', with_genres = '' }) => {
        try {
            const response = await axios.get(`${BASE_URL}/discover/tv`, {
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
        } catch (error) {
            console.error('Error discovering TV shows:', error);
            return { results: [], total_pages: 0 };
        }
    },
    searchTVShows: async (query, page = 1) => {
        try {
            const response = await axios.get(`${BASE_URL}/search/tv`, {
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
            console.error('Error searching TV shows:', error);
            return { results: [], total_pages: 0 };
        }
    },

    // Existing utility functions
    getImageUrl: (path, size = 'w500') => {
        return path ? `${IMAGE_BASE_URL}/${size}${path}` : null;
    },
    getMovieGenres: async () => {
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

const getUserCountry = async () => {
    const cached = localStorage.getItem('user_region');
    if (cached) return cached;

    try {
        const res = await fetch("https://ipapi.co/json");
        const data = await res.json();
        localStorage.setItem('user_region', data.country);
        return data.country || 'US';
    } catch {
        return 'US';
    }
};
