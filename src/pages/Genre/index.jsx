import MoviesContainer from "../../components/MoviesContainer";
import Pagination from "../../components/Pagination";
import Banner from "../../components/BannerSearch";
import { useGenre } from "./useGenre";

function Genre() {
  const {
    t,
    movies,
    totalPages,
    numResult,
    banner,
    loading,
    setPageFunction,
    genreName,
    page,
  } = useGenre();

  return (
    <section className="genre_container">
      <Banner banner={banner} />
      {!loading && (
        <h2 className="title mt-8">{`${numResult} ${t(
          "searchMessage"
        )}: ${genreName}`}</h2>
      )}
      <MoviesContainer
        loading={loading}
        movies={movies}
        emptyMessage={t("emptySearchMessage")}
      />
      <Pagination
        page={page}
        totalPages={totalPages}
        setPageFunction={setPageFunction}
      />
    </section>
  );
}

export default Genre;
