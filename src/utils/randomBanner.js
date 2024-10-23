export const randomBanner = (moviesList) => {
    if (moviesList && moviesList.length > 0) {
        const randomIndex = Math.floor(Math.random() * moviesList.length);
        return moviesList[randomIndex];
    }
    return null;
};