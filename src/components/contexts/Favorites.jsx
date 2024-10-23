import { createContext, useContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();
FavoritesContext.displayName = "MyFavorites";

export default function FavoritesProvider({ children }) {
    const [favorite, setFavorite] = useState(() => {
        const localFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        return localFavorites;
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorite));
    }, [favorite]);

    function addFavorite(newFavorite) {
        const repeatedFavorite = favorite.some((favorite) => favorite.id === newFavorite.id);

        let newList;

        if (!repeatedFavorite) {
            newList = [...favorite, newFavorite];
        } else {
            newList = favorite.filter((favorite) => favorite.id !== newFavorite.id);
        }

        setFavorite(newList);
    }

    function newFavoriteArray(newArray) {
        setFavorite(newArray);
    }

    return (
        <FavoritesContext.Provider value={{ favorite, addFavorite, newFavoriteArray }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavoriteContext() {
    return useContext(FavoritesContext);
}