import MoviesContainer from "../../components/MoviesContainer";
import Pagination from "../../components/Pagination";
import Searchbar from "../../components/Searchbar";
import { apiImgs } from "../../constants/apiKeys";
import { useHome } from "./useHome";
import "./Home.scss";

function Home() {
  const { t, movies, totalPages, banner, loading, setPageFunction, page } =
    useHome();

  return (
    <>
      <section className="home">
        <div
          className="banner"
          style={{
            backgroundImage: `url(${
              banner?.backdrop_path
                ? `${apiImgs}${banner.backdrop_path}`
                : "/banner-home.png"
            })`,
          }}
        >
          <div className="banner_content">
            <h1>CineLib</h1>
            <h2>{t("homeHeaderMessage")}</h2>
            <Searchbar />
          </div>
          <div className="custom-shape-divider-bottom">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
        </div>
      </section>

      <section className="trending_movies">
        <h2 className="title">{t("homeSubTitle")}</h2>
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
    </>
  );
}

export default Home;
