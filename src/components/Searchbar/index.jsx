import "./Searchbar.scss";
import { Link } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import StarRating from "../StarRating";
import { format } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";
import Loader from "../../components/Loader";
import { useSearchbar } from "./useSearchbar";

function Searchbar() {
  const {
    t,
    i18n,
    loading,
    showResult,
    handleKeyup,
    movies,
    wrapperRef,
    search,
    setShowResult,
    setSearch,
    handleSearchMovie,
    apiImgs,
  } = useSearchbar();

  return (
    <div className="searchbar" ref={wrapperRef}>
      <input
        onFocus={() => {
          if (search.length > 1) {
            setShowResult(true);
          }
        }}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={handleKeyup}
        value={search}
        type="search"
        placeholder={t("searchBarPlaceholder")}
      />
      <button onClick={handleSearchMovie}>
        <BiSearchAlt2 />
      </button>
      {showResult && (
        <div className="results">
          {loading ? (
            <Loader height="88" />
          ) : movies.length > 0 ? (
            <>
              {movies.map((movie) => (
                <div key={movie.id} className="result">
                  <Link
                    to={`/movie/${movie.id}`}
                    onClick={() => setShowResult(false)}
                    className="result-link"
                  >
                    <img
                      src={`${apiImgs}${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className="result-details">
                      <h3>{movie.title}</h3>
                      {movie.release_date && (
                        <span>
                          {i18n.language === "ptBR"
                            ? format(
                                new Date(movie.release_date),
                                "dd MMM, yyyy",
                                {
                                  locale: ptBR,
                                }
                              ).replace(
                                /(\d{2}) (\w{3}), (\d{4})/,
                                (_, d, m, y) =>
                                  `${d} ${
                                    m[0].toUpperCase() + m.slice(1)
                                  }, ${y}`
                              )
                            : format(
                                new Date(movie.release_date),
                                "MMM dd, yyyy",
                                {
                                  locale: enUS,
                                }
                              ).replace(/^\w/, (c) => c.toUpperCase())}
                        </span>
                      )}
                      {movie.vote_average !== 0 && (
                        <StarRating rating={movie.vote_average} />
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </>
          ) : (
            <p className="empty-message">Nenhum resultado encontrado!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Searchbar;
