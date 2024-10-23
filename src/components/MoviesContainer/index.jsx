import "./MoviesContainer.scss";
import MovieCard from "../../components/MovieCard";
import Loader from "../../components/Loader";

function MoviesContainer({ loading, movies, emptyMessage }) {
    return (
        <div className="movies_container">
            <div className="wrapper lg:!px-8">
                {loading ? (
                    <Loader />
                ) : (
                    movies.length > 0
                        ? <div className="movies">
                            {movies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                        : (
                            <p className="messageBox">{emptyMessage}</p>
                        )
                )}
                {
                    !loading && !movies && <p className="messageBox">Error loading movies.</p>
                }
            </div>
        </div>
    );
}

export default MoviesContainer;