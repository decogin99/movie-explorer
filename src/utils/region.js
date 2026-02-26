let regionCache = null;

export const getUserCountry = () => {
    if (regionCache) return regionCache;

    const savedRegion = localStorage.getItem('user_region');
    if (savedRegion) {
        regionCache = savedRegion;
        return savedRegion;
    }

    const locale =
        navigator.languages?.[0] ||
        navigator.language ||
        'en-US';

    const region = locale.includes('-')
        ? locale.split('-')[1]
        : 'US';

    regionCache = region;

    return region;
};