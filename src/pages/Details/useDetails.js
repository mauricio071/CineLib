import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";

import { useFavoriteContext } from "../../components/contexts/Favorites";
import { api_key, apiMoviesGeneral } from "../../constants/apiKeys";
import { getLanguage } from "../../utils/getLanguage";

export function useDetails() {
  const { t, i18n } = useTranslation();
  const language = getLanguage();

  const { id } = useParams();
  const navigate = useNavigate();

  const { favorite, addFavorite } = useFavoriteContext();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState([]);
  const [mainActors, setMainActors] = useState([]);
  const [movieImgs, setMovieImgs] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMovie = async () => {
    try {
      const response = await axios.get(`${apiMoviesGeneral}/${id}`, {
        params: {
          api_key,
          language,
        },
      });
      setMovie(response.data);
    } catch (err) {
      console.error("Error fetching movie:", err);
      navigate("/error");
    }
  };

  const getTrailer = async () => {
    try {
      const response = await axios.get(`${apiMoviesGeneral}/${id}/videos`, {
        params: {
          api_key,
          language,
        },
      });
      const trailers = response.data.results.filter(
        (video) => video.type === "Trailer"
      );
      const lastTrailer = trailers[trailers.length - 1];
      setTrailer(lastTrailer);
    } catch (err) {
      console.error("Error fetching movie trailer:", err);
    }
  };

  const getMovieImages = async () => {
    try {
      const response = await axios.get(`${apiMoviesGeneral}/${id}/images`, {
        params: {
          api_key,
        },
      });
      const images = response.data.backdrops
        .filter((backdrop) => backdrop.iso_639_1 === null)
        .slice(0, 9);
      setMovieImgs(images);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  const getMovieCredits = async () => {
    try {
      const response = await axios.get(`${apiMoviesGeneral}/${id}/credits`, {
        params: {
          api_key,
          language,
        },
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
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations`,
        {
          params: {
            api_key,
            language,
          },
        }
      );
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

  const isFavorite =
    movie && favorite.some((favorite) => favorite.id === movie.id);

  const convertMoney = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return {
    i18n,
    t,
    addFavorite,
    trailer,
    mainActors,
    movieImgs,
    similar,
    loading,
    isFavorite,
    convertMoney,
    movie,
  };
}
