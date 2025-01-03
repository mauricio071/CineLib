import MoviesContainer from "../../components/MoviesContainer";
import { apiImgs } from "../../constants/apiKeys";
import { useFavorites } from "./useFavorites";
import "./Favorites.scss";

function Favorites() {
  const { t, favorite, banner, loading } = useFavorites();

  return (
    <section
      className="favorites"
      style={{
        backgroundImage: `url(${
          banner?.backdrop_path
            ? `${apiImgs}${banner.backdrop_path}`
            : "/banner-home.png"
        })`,
      }}
    >
      {!loading && <h2 className="title">{t("favoriteSubTitle")}</h2>}
      {favorite && (
        <MoviesContainer
          loading={loading}
          movies={favorite}
          emptyMessage={t("favoriteEmpty")}
        />
      )}
    </section>
  );
}

export default Favorites;
