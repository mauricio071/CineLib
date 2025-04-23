import { BsGraphUp, BsHourglassSplit } from "react-icons/bs";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { FaGlobeAmericas } from "react-icons/fa";
import { ptBR, enUS } from "date-fns/locale";
import { RxCalendar } from "react-icons/rx";
import { format } from "date-fns";

import CarouselMovies from "../../components/CarouselMovies";
import { apiAvatar, apiImgs } from "../../constants/apiKeys";
import StarRating from "../../components/StarRating";
import MovieCard from "../../components/MovieCard";
import Loader from "../../components/Loader";
import Badge from "../../components/Badge";
import { useDetails } from "./useDetails";
import "./Details.scss";

function Details() {
  const {
    t,
    i18n,
    addFavorite,
    trailer,
    mainActors,
    movieImgs,
    similar,
    loading,
    isFavorite,
    convertMoney,
    movie,
  } = useDetails();

  return (
    <section className="details">
      {loading || !movie ? (
        <Loader />
      ) : (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${
                movie?.backdrop_path
                  ? `${apiImgs}${movie.backdrop_path}`
                  : "/banner-home.png"
              })`,
            }}
          >
            <div className="custom-shape-divider-bottom">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
                  className="shape-fill"
                ></path>
              </svg>
            </div>
          </div>
          <div className="wrapper">
            <div className="movie_details_header">
              <picture className="movie_poster">
                <img
                  src={
                    movie.poster_path
                      ? `${apiImgs}${movie.poster_path}`
                      : "/movie-default-banner.jpg"
                  }
                  alt={movie.title}
                />
              </picture>
              <div className="banner_info">
                <h1>
                  <div
                    onClick={() => addFavorite(movie)}
                    className="favoriteIcon"
                  >
                    {!isFavorite ? <IoMdHeartEmpty /> : <IoMdHeart />}
                  </div>
                  {movie.title}
                </h1>
                <div className="badge_container">
                  {movie.genres.map((genre) => (
                    <Badge value={genre.name} key={genre.id} />
                  ))}
                </div>
                {movie.vote_average && (
                  <div className="rating_container">
                    <StarRating rating={movie.vote_average} />
                    <p>
                      {movie.vote_count} {t("ratingsTitle")}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="movie_details_main">
              {movie.tagline && (
                <h2 className="title tagline">“{movie.tagline}”</h2>
              )}
              <div className="details_container">
                <div className="movie_details">
                  <div className="info_container">
                    <div className="info">
                      <h2 className="title">{t("summaryTitle")}</h2>
                      {movie.overview ? (
                        <p>{movie.overview}</p>
                      ) : (
                        <p>{t("notInformedTitle")}</p>
                      )}
                    </div>
                    <div className="info">
                      <h2 className="title">{t("companyTitle")}</h2>
                      {movie.production_companies.length > 0 ? (
                        <p>
                          {movie.production_companies
                            .map((company) => company.name)
                            .join(", ")}
                        </p>
                      ) : (
                        <p>{t("notInformedTitle")}</p>
                      )}
                    </div>
                    <div className="info">
                      <h2 className="title">Website</h2>
                      {movie.homepage ? (
                        <p>
                          <a
                            href={movie.homepage}
                            target="_blank"
                            rel="noreferrer"
                            className="break-all"
                          >
                            {movie.homepage}
                          </a>
                        </p>
                      ) : (
                        <p>{t("notInformedTitle")}</p>
                      )}
                    </div>
                    <div className="info">
                      <h2 className="title">{t("collectionTitle")}</h2>
                      {movie.belongs_to_collection ? (
                        <div className="collection-info">
                          <p>{movie.belongs_to_collection.name}</p>
                        </div>
                      ) : (
                        <p>{t("notInformedTitle")}</p>
                      )}
                    </div>
                  </div>
                  <div className="right_content">
                    <div className="trailer">
                      {trailer && (
                        <iframe
                          className=""
                          key={trailer.id}
                          src={`https://www.youtube.com/embed/${trailer.key}`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      )}
                    </div>
                    <div className="details_container">
                      <div className="flex flex-col gap-4">
                        <div className="detail">
                          <h3>
                            <RxCalendar className="!text-[#FF4081]" />{" "}
                            {t("launchDateTitle")}:
                          </h3>
                          {!movie.release_date ? (
                            <p>{t("notInformedTitle")}</p>
                          ) : i18n.language === "ptBR" ? (
                            <p>
                              {format(
                                new Date(movie.release_date),
                                "dd/MM/yyyy",
                                {
                                  locale: ptBR,
                                }
                              ).replace(
                                /(\d{2}) (\w{3}), (\d{4})/,
                                (_, d, m, y) =>
                                  `${d} ${
                                    m[0].toUpperCase() + m.slice(1)
                                  }, ${y}`
                              )}
                            </p>
                          ) : (
                            <p>
                              {format(
                                new Date(movie.release_date),
                                "MM/dd/yyyy",
                                {
                                  locale: enUS,
                                }
                              ).replace(/^\w/, (c) => c.toUpperCase())}
                            </p>
                          )}
                        </div>
                        <div className="detail">
                          <h3>
                            <LiaMoneyBillWaveSolid className="!text-[#4CAF50]" />{" "}
                            {t("budgetTitle")}:
                          </h3>
                          {movie.budget > 0 ? (
                            <p>{convertMoney(movie.budget)}</p>
                          ) : (
                            <p>{t("notInformedTitle")}</p>
                          )}
                        </div>
                        <div className="detail">
                          <h3>
                            <BsGraphUp className="!text-[#2196F3]" />{" "}
                            {t("revenueTitle")}:
                          </h3>
                          {movie.revenue > 0 ? (
                            <p>{convertMoney(movie.revenue)}</p>
                          ) : (
                            <p>{t("notInformedTitle")}</p>
                          )}
                        </div>
                        <div className="detail">
                          <h3>
                            <FaGlobeAmericas className="!text-[#3F51B5]" />{" "}
                            {t("countryTitle")}:
                          </h3>
                          {movie.production_countries.length > 0 ? (
                            <p>{movie.production_countries[0].name}</p>
                          ) : (
                            <p>{t("notInformedTitle")}</p>
                          )}
                        </div>
                        <div className="detail">
                          <h3>
                            <BsHourglassSplit className="!text-[#FFC107]" />{" "}
                            {t("runtimeTitle")}:
                          </h3>
                          {movie.runtime ? (
                            <p>{movie.runtime} min</p>
                          ) : (
                            <p>{t("notInformedTitle")}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="info">
                  <h2 className="title">{t("directorCastTitle")}</h2>
                  {mainActors.length > 0 ? (
                    <div className="cast_container">
                      {mainActors.map((actor) => (
                        <div className="main_cast" key={actor.id}>
                          <img
                            src={
                              actor.profile_path
                                ? `${apiAvatar}${actor.profile_path}`
                                : "/avatar.png"
                            }
                            alt={actor.name}
                          />
                          <div className="actor_info">
                            <p className="cast_name">{actor.name}</p>
                            <p className="cast_character">
                              {actor.character ? actor.character : actor.job}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>{t("notInformedTitle")}</p>
                  )}
                </div>
                {movieImgs.length > 0 && (
                  <div>
                    <h2 className="title">{t("imageGalleryTitle")}</h2>
                    <CarouselMovies infinite={false}>
                      {movieImgs.map((img) => (
                        <img
                          src={
                            img.file_path
                              ? `${apiAvatar}${img.file_path}`
                              : "/avatar.png"
                          }
                          key={img.file_path}
                          alt="img"
                          className="brightness-[0.95]"
                        />
                      ))}
                    </CarouselMovies>
                  </div>
                )}
                {similar.length > 0 && (
                  <div>
                    <h2 className="title">{t("similarTitle")}</h2>
                    <CarouselMovies infinite={true}>
                      {similar?.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                      ))}
                    </CarouselMovies>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Details;
