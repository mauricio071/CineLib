import "./GenreLinks.scss";
import { FaChevronDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { getLanguage } from "../../utils/getLanguage";

function GenreLinks({ }) {
    const { t, i18n } = useTranslation();
    const language = getLanguage();

    const api_key = import.meta.env.VITE_API_KEY;

    const [genres, setGenres] = useState();
    const [showGenresMenuMobile, setShowGenresMenuMobile] = useState(false);

    const fetchGenres = async () => {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
                params: {
                    api_key,
                    language
                }
            });
            setGenres(response.data.genres);
        } catch (err) {
            console.error("Erro ao buscar gêneros:", err);
        }
    };

    useEffect(() => {
        fetchGenres();
    }, [i18n.language]);

    return (
        <>
            {/* mobile links */}
            <a onClick={() => setShowGenresMenuMobile(!showGenresMenuMobile)} className="genre_mobile">
                {t("genresMenu")} <FaChevronDown />
            </a>
            {
                showGenresMenuMobile &&
                <div className="genre_links_mobile">
                    {genres?.map((genre) =>
                        <Link to={`/genre?id=${genre.id}&name=${genre.name}`} key={genre.id}>
                            {genre.name}
                        </Link>)}
                </div>
            }

            {/* desktop links */}
            <a className="genre_desktop">
                {t("genresMenu")} <FaChevronDown />
            </a>
            <div className="genre_links_desktop">
                {genres?.map((genre) =>
                    <Link to={`/genre?id=${genre.id}&name=${genre.name}`} key={genre.id}>
                        {genre.name}
                    </Link>)}
            </div>
        </>
    );
}

export default GenreLinks;