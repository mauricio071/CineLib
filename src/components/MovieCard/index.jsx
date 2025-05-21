import StarRating from "../StarRating";
import "./MovieCard.scss";
import { useFavoriteContext } from "../contexts/Favorites";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function MovieCard({ movie }) {
  const apiImgs = import.meta.env.VITE_IMG_CARD;

  const { t } = useTranslation();

  const { favorite, addFavorite } = useFavoriteContext();

  const isFavorite = favorite.some((favorite) => favorite.id === movie.id);

  return (
    <>
      <div className="movie_card">
        <div className="movie_poster">
          <div onClick={() => addFavorite(movie)} className="favoriteIcon">
            {!isFavorite ? <IoMdHeartEmpty /> : <IoMdHeart />}
          </div>
          <img
            src={
              movie.poster_path
                ? `${apiImgs}${movie.poster_path}`
                : "/movie-default-banner.jpg"
            }
            alt={movie.title}
          />
        </div>
        <div className="movie_infos">
          <p className="movie_title">{movie.title}</p>
          {movie.vote_average !== 0 && (
            <StarRating rating={movie.vote_average} />
          )}
          <div className="hidden_content">
            {movie.overview && (
              <p className="description">
                {movie.overview.length > 100
                  ? `${movie.overview.substring(0, 100)}...`
                  : movie.overview}
              </p>
            )}
            <Link to={`/movie/${movie.id}`} className="btn_detail">
              {t("viewDetailsMessage")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieCard;
