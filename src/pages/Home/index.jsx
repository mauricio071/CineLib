import { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import Pagination from "../../components/Pagination";
import Searchbar from "../../components/Searchbar";
import MoviesContainer from "../../components/MoviesContainer";
import { useTranslation } from "react-i18next";
import { randomBanner } from "../../utils/randomBanner";
import { getLanguage } from "../../utils/getLanguage";

function Home() {
    const { t, i18n } = useTranslation();
    const language = getLanguage();

    const api_key = import.meta.env.VITE_API_KEY;
    const trendingMovies = import.meta.env.VITE_TRENDING;
    const apiImgs = import.meta.env.VITE_IMG;

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [banner, setBanner] = useState(null);
    const [loading, setLoading] = useState(true);

    const getMovies = async () => {
        setLoading(true);
        try {
            await axios.get(trendingMovies, {
                params: {
                    api_key,
                    page,
                    language
                }
            }).then((response) => {
                const data = response.data;
                setMovies(data.results);
                setBanner(randomBanner(data.results));
                setPage(data.page);
                setTotalPages(data.total_pages);
            });
        } catch (err) {
            console.error("Error fetching movies:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = "CineLib";
        getMovies();
    }, [page, i18n.language]);

    const setPageFunction = (value) => {
        setLoading(true);
        setPage(value);
    }

    return (
        <>
            <section className="home">
                <div className="banner" style={{ backgroundImage: `url(${banner?.backdrop_path ? `${apiImgs}${banner.backdrop_path}` : "/banner-home.png"})` }}>
                    <div className="banner_content">
                        <h1>CineLib</h1>
                        <h2>{t("homeHeaderMessage")}</h2>
                        <Searchbar />
                    </div>
                    <div className="custom-shape-divider-bottom">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z" className="shape-fill"></path>
                        </svg>
                    </div>
                </div>
            </section>

            <section className="trending_movies">
                <h2 className="title">{t("homeSubTitle")}</h2>
                <MoviesContainer loading={loading} movies={movies} emptyMessage={t("emptySearchMessage")} />
                <Pagination page={page} totalPages={totalPages} setPageFunction={setPageFunction} />
            </section>
        </>
    );
}

export default Home;