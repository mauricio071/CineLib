import { useEffect, useState } from "react";
import "./Favorites.scss";
import MoviesContainer from "../../components/MoviesContainer";
import { useFavoriteContext } from "../../components/contexts/Favorites";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { randomBanner } from "../../utils/randomBanner";
import { getLanguage } from "../../utils/getLanguage";

function Favorites() {
    const { t, i18n } = useTranslation();
    const language = getLanguage();

    const { favorite, newFavoriteArray } = useFavoriteContext();

    const api_key = import.meta.env.VITE_API_KEY;
    const apiMovies = import.meta.env.VITE_API;
    const apiImgs = import.meta.env.VITE_IMG;

    const [banner, setBanner] = useState(null);
    const [loading, setLoading] = useState(true);

    const newFavoriteI18n = async () => {
        try {
            const newList = await Promise.all(
                favorite.map(async (fav) => {
                    return axios.get(`${apiMovies}/${fav.id}`, {
                        params: {
                            api_key,
                            language
                        }
                    }).then((response) => response.data);
                }));
            newFavoriteArray(newList);
        } catch (e) {
            console.log("Error: ", e);
        }
    }

    useEffect(() => {
        setLoading(true);
        document.title = `${t("favoriteTitle")} - CineLib`;
        newFavoriteI18n();
        setLoading(false);
    }, [i18n.language]);

    useEffect(() => {
        setLoading(true);
        setBanner(randomBanner(favorite));
        setLoading(false);
    }, [favorite]);

    return (
        <section className="favorites" style={{ backgroundImage: `url(${banner?.backdrop_path ? `${apiImgs}${banner.backdrop_path}` : "/banner-home.png"})` }}>
            {
                !loading && <h2 className="title">{t("favoriteSubTitle")}</h2>
            }
            {
                favorite && <MoviesContainer loading={loading} movies={favorite} emptyMessage={t("favoriteEmpty")} />
            }
        </section>
    );
}

export default Favorites;