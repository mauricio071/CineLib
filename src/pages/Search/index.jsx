import MoviesContainer from "../../components/MoviesContainer";
import Pagination from "../../components/Pagination";
import Banner from "../../components/BannerSearch";
import { useSearch } from "./useSearch";

function Search() {
  const {
    t,
    movies,
    totalPages,
    numResult,
    banner,
    queryParams,
    setPageFunction,
    page,
    loading,
  } = useSearch();

  return (
    <section className="search_container">
      <Banner banner={banner} />
      {!loading && (
        <h2 className="title mt-8">{`${numResult} ${t(
          "searchMessage"
        )}: ${queryParams}`}</h2>
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

export default Search;
