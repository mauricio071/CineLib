import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MoviesContainer from "../../components/MoviesContainer";
import Pagination from "../../components/Pagination";
import { useTranslation } from "react-i18next";
import Banner from "../../components/BannerSearch";
import { randomBanner } from "../../utils/randomBanner";
import { getLanguage } from "../../utils/getLanguage";

function Search() {
    const { t, i18n } = useTranslation();
    const language = getLanguage();

    const api_key = import.meta.env.VITE_API_KEY;
    const apiMovies = import.meta.env.VITE_SEARCH;

    const [searchParams] = useSearchParams();
    const query = searchParams.get("search");

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [numResult, setNumResult] = useState(0);
    const [banner, setBanner] = useState(null);
    const [loading, setLoading] = useState(true);

    const getMovies = async () => {
        setLoading(true);
        try {
            await axios.get(apiMovies, {
                params: {
                    api_key,
                    query,
                    page,
                    language
                }
            }).then((response) => {
                const data = response.data;
                setMovies(data.results);
                setBanner(randomBanner(data.results));
                setPage(data.page);
                setTotalPages(data.total_pages);
                setNumResult(data.total_results);
            })
        } catch (err) {
            console.error("Error fetching movies:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (query) {
            document.title = `${query} - CineLib`;
        }
        getMovies();
    }, [query, page, i18n.language]);

    const setPageFunction = (value) => {
        setLoading(true);
        setPage(value);
    }

    return (
        <section className="search_container">
            <Banner banner={banner} />
            {
                !loading && <h2 className="title mt-8">{`${numResult} ${t("searchMessage")}: ${query}`}</h2>
            }
            <MoviesContainer loading={loading} movies={movies} emptyMessage={t("emptySearchMessage")} />
            <Pagination page={page} totalPages={totalPages} setPageFunction={setPageFunction} />
        </section>
    );
}

export default Search;