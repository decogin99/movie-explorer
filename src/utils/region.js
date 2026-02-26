let regionCache = null;

export const getUserCountry = () => {
    if (regionCache) return regionCache;

    // 1️⃣ If user manually selected region before → use it
    const savedRegion = localStorage.getItem('user_region');
    if (savedRegion) {
        regionCache = savedRegion;
        return savedRegion;
    }

    // 2️⃣ Detect from browser locale (vi-VN, en-US, etc.)
    const locale = navigator.language || 'en-US';
    const regionFromLocale = locale.split('-')[1];

    const region = regionFromLocale || 'US';

    regionCache = region;

    return region;
};