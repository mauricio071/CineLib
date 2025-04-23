import { useTranslation } from "react-i18next";
import { getLanguage } from "../../utils/getLanguage";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { api_key, apiMovies, apiImgs } from "../../constants/apiKeys";

export const useSearchbar = () => {
  const { t, i18n } = useTranslation();
  const language = getLanguage();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [showResult, setShowResult] = useState(false);

  const handleSearchMovie = () => {
    if (search) {
      navigate(`/search?search=${search}`);
      setSearch("");
    }
  };

  const handleKeyup = (event) => {
    if (event.key === "Enter") {
      handleSearchMovie();
    }
  };

  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const response = await axios.get(apiMovies, {
        params: {
          api_key,
          query: search,
          sort_by: "vote_average.desc",
          page: 1,
          language,
        },
      });

      const data = response.data;
      const orderByPopularity = data.results
        .slice(0, 5)
        .sort((a, b) => b.vote_average - a.vote_average);

      setMovies(orderByPopularity);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const wrapperRef = useRef(null);

  useEffect(() => {
    if (search.length > 1) {
      setLoading(true);
      setShowResult(true);

      const delayDebounce = setTimeout(() => {
        getMovies();
      }, 500);

      return () => clearTimeout(delayDebounce);
    } else {
      setShowResult(false);
      setMovies([]);
    }
  }, [search]);

  useEffect(() => {
    setShowResult(false);
    getMovies();
  }, [i18n.language]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowResult(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
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
  };
};
