import { useNavigate, useParams } from "react-router-dom";
import "./Details.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import StarRating from "../../components/StarRating";
import Badge from "../../components/Badge";
import { RxCalendar } from "react-icons/rx";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { BsGraphUp, BsHourglassSplit } from "react-icons/bs";
import { FaGlobeAmericas } from "react-icons/fa";
import CarouselMovies from "../../components/CarouselMovies";
import MovieCard from "../../components/MovieCard";
import { useFavoriteContext } from "../../components/contexts/Favorites";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import Loader from "../../components/Loader";
import { useTranslation } from "react-i18next";
import { getLanguage } from "../../utils/getLanguage";

function Details() {
    const { t, i18n } = useTranslation();
    const language = getLanguage();

    const { id } = useParams();
    const navigate = useNavigate();

    const api_key = import.meta.env.VITE_API_KEY;
    const apiMovies = import.meta.env.VITE_API;
    const apiImgs = import.meta.env.VITE_IMG;
    const apiAvatar = import.meta.env.VITE_IMG_CARD;

    const { favorite, addFavorite } = useFavoriteContext();

    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState([]);
    const [mainActors, setMainActors] = useState([]);
    const [movieImgs, setMovieImgs] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading] = useState(true);

    const getMovie = async () => {
        try {
            const response = await axios.get(`${apiMovies}/${id}`, {
                params: {
                    api_key,
                    language
                }
            });
            setMovie(response.data);
        } catch (err) {
            console.error("Error fetching movie:", err);
            navigate("/error");
        }
    };

    const getTrailer = async () => {
        try {
            const response = await axios.get(`${apiMovies}/${id}/videos`, {
                params: {
                    api_key,
                    language
                }
            });
            const trailers = response.data.results.filter((video) => video.type === "Trailer");
            const lastTrailer = trailers[trailers.length - 1];
            setTrailer(lastTrailer);
        } catch (err) {
            console.error("Error fetching movie trailer:", err);
        }
    };

    const getMovieImages = async () => {
        try {
            const response = await axios.get(`${apiMovies}/${id}/images`, {
                params: {
                    api_key
                }
            });
            const images = response.data.backdrops.filter((backdrop) => backdrop.iso_639_1 === null).slice(0, 9);
            setMovieImgs(images);
        } catch (err) {
            console.error("Error fetching images:", err);
        }
    };

    const getMovieCredits = async () => {
        try {
            const response = await axios.get(`${apiMovies}/${id}/credits`, {
                params: {
                    api_key,
                    language
                }
            });
            const data = response.data;
            const directors = data.crew.filter((member) => member.job === "Director");
            const actors = data.cast.slice(0, 4);
            setMainActors([...directors, ...actors]);
        } catch (err) {
            console.error("Error fetching credits:", err);
        }
    };

    const getSimilar = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations`, {
                params: {
                    api_key,
                    language
                }
            });
            setSimilar(response.data.results);
        } catch (err) {
            console.error("Error fetching similar:", err);
        }
    };

    useEffect(() => {
        setLoading(true);
        getMovie();
        getTrailer();
        getMovieImages();
        getMovieCredits();
        getSimilar();
        setLoading(false);
    }, [id, i18n.language]);

    useEffect(() => {
        if (movie) {
            document.title = `${movie.title} - CineLib`;
        }
    }, [movie]);


    const isFavorite = movie && favorite.some((favorite) => favorite.id === movie.id);

    const convertMoney = (value) => {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    return (
        <section className="details" >
            {
                loading || !movie
                    ? <Loader />
                    : (
                        <>
                            <div className="banner" style={{ backgroundImage: `url(${movie?.backdrop_path ? `${apiImgs}${movie.backdrop_path}` : "/banner-home.png"})` }}>
                                <div className="custom-shape-divider-bottom">
                                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                        <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" className="shape-fill"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="wrapper">
                                <div className="movie_details_header">
                                    <picture className="movie_poster">
                                        <img src={movie.poster_path ? `${apiImgs}${movie.poster_path}` : "/movie-default-banner.jpg"} alt={movie.title} />
                                    </picture>
                                    <div className="banner_info">
                                        <h1>
                                            <div onClick={() => addFavorite(movie)} className="favoriteIcon">
                                                {
                                                    !isFavorite
                                                        ? <IoMdHeartEmpty />
                                                        : <IoMdHeart />
                                                }
                                            </div>
                                            {movie.title}
                                        </h1>
                                        <div className="badge_container">
                                            {movie.genres.map((genre) => <Badge value={genre.name} key={genre.id} />)}
                                        </div>
                                        {movie.vote_average &&
                                            <div className="rating_container">
                                                <StarRating rating={movie.vote_average} />
                                                <p>{movie.vote_count} {t("ratingsTitle")}</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="movie_details_main">
                                    {movie.tagline && <h2 className="title tagline">“{movie.tagline}”</h2>}
                                    <div className="details_container">
                                        <div className="movie_details">
                                            <div className="info_container">
                                                <div className="info">
                                                    <h2 className="title">{t("summaryTitle")}</h2>
                                                    {movie.overview
                                                        ? <p>{movie.overview}</p>
                                                        : <p>{t("notInformedTitle")}</p>
                                                    }
                                                </div>
                                                <div className="info">
                                                    <h2 className="title">{t("companyTitle")}</h2>
                                                    {movie.production_companies.length > 0
                                                        ? <p>{movie.production_companies.map((company) => company.name).join(", ")}</p>
                                                        : <p>{t("notInformedTitle")}</p>
                                                    }
                                                </div>
                                                <div className="info">
                                                    <h2 className="title">Website</h2>
                                                    {movie.homepage
                                                        ? <p><a href={movie.homepage} target="_blank" rel="noreferrer" className="break-all">{movie.homepage}</a></p>
                                                        : <p>{t("notInformedTitle")}</p>
                                                    }
                                                </div>
                                                <div className="info">
                                                    <h2 className="title">{t("collectionTitle")}</h2>
                                                    {movie.belongs_to_collection
                                                        ? (
                                                            <div className="collection-info">
                                                                <p>{movie.belongs_to_collection.name}</p>
                                                            </div>
                                                        )
                                                        : <p>{t("notInformedTitle")}</p>
                                                    }
                                                </div>
                                            </div>
                                            <div className="right_content">
                                                <div className="trailer">
                                                    {
                                                        trailer
                                                        && <iframe
                                                            className=""
                                                            key={trailer.id}
                                                            src={`https://www.youtube.com/embed/${trailer.key}`}
                                                            title="YouTube video player"
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                            referrerPolicy="strict-origin-when-cross-origin"
                                                            allowFullScreen>
                                                        </iframe>
                                                    }
                                                </div>
                                                <div className="details_container">
                                                    <div className="flex flex-col gap-4">
                                                        <div className="detail">
                                                            <h3><RxCalendar className="!text-[#FF4081]" /> {t("launchDateTitle")}:</h3>
                                                            {movie.release_date
                                                                ? <p>{movie.release_date}</p>
                                                                : <p>{t("notInformedTitle")}</p>
                                                            }
                                                        </div>
                                                        <div className="detail">
                                                            <h3><LiaMoneyBillWaveSolid className="!text-[#4CAF50]" /> {t("budgetTitle")}:</h3>
                                                            {movie.budget > 0
                                                                ? <p>{convertMoney(movie.budget)}</p>
                                                                : <p>{t("notInformedTitle")}</p>
                                                            }
                                                        </div>
                                                        <div className="detail">
                                                            <h3><BsGraphUp className="!text-[#2196F3]" /> {t("revenueTitle")}:</h3>
                                                            {movie.revenue > 0
                                                                ? <p>{convertMoney(movie.revenue)}</p>
                                                                : <p>{t("notInformedTitle")}</p>
                                                            }
                                                        </div>
                                                        <div className="detail">
                                                            <h3><FaGlobeAmericas className="!text-[#3F51B5]" /> {t("countryTitle")}:</h3>
                                                            {movie.production_countries.length > 0
                                                                ? <p>{movie.production_countries[0].name}</p>
                                                                : <p>{t("notInformedTitle")}</p>
                                                            }
                                                        </div>
                                                        <div className="detail">
                                                            <h3><BsHourglassSplit className="!text-[#FFC107]" /> {t("runtimeTitle")}:</h3>
                                                            {movie.runtime
                                                                ? <p>{movie.runtime} min</p>
                                                                : <p>{t("notInformedTitle")}</p>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="info">
                                            <h2 className="title">{t("directorCastTitle")}</h2>
                                            {mainActors.length > 0
                                                ? <div className="cast_container">
                                                    {
                                                        mainActors.map((actor) =>
                                                            <div className="main_cast" key={actor.id}>
                                                                <img
                                                                    src={actor.profile_path ? `${apiAvatar}${actor.profile_path}` : "/avatar.png"}
                                                                    alt={actor.name}
                                                                />
                                                                <div className="actor_info">
                                                                    <p className="cast_name">{actor.name}</p>
                                                                    <p className="cast_character">
                                                                        {actor.character ? actor.character : actor.job}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                                : <p>{t("notInformedTitle")}</p>
                                            }
                                        </div>
                                        {
                                            movieImgs.length > 0 &&
                                            <div>
                                                <h2 className="title">{t("imageGalleryTitle")}</h2>
                                                <CarouselMovies infinite={false}>
                                                    {movieImgs.map((img) =>
                                                        <img
                                                            src={img.file_path ? `${apiAvatar}${img.file_path}` : "/avatar.png"}
                                                            key={img.file_path}
                                                            alt="img"
                                                            className="brightness-[0.95]"
                                                        />)
                                                    }
                                                </CarouselMovies>
                                            </div>
                                        }
                                        {similar.length > 0 &&
                                            <div>
                                                <h2 className="title">{t("similarTitle")}</h2>
                                                <CarouselMovies infinite={true}>
                                                    {similar?.map((movie) => (
                                                        <MovieCard key={movie.id} movie={movie} />
                                                    ))}
                                                </CarouselMovies>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                    )
            }
        </section >
    );
}

export default Details;