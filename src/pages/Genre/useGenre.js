import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";

import { api_key, apiDiscover } from "../../constants/apiKeys";
import { randomBanner } from "../../utils/randomBanner";
import { getLanguage } from "../../utils/getLanguage";

export function useGenre() {
  const { t, i18n } = useTranslation();
  const language = getLanguage();

  const [searchParams] = useSearchParams();
  const genreId = searchParams.get("id");
  const genreName = searchParams.get("name");

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [numResult, setNumResult] = useState(0);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMovies = async () => {
    setLoading(true);
    try {
      await axios
        .get(apiDiscover, {
          params: {
            api_key,
            with_genres: genreId,
            page,
            language,
          },
        })
        .then((response) => {
          const data = response.data;
          setMovies(data.results);
          setBanner(randomBanner(data.results));
          setPage(data.page);
          setTotalPages(data.total_pages);
          setNumResult(data.total_results);
        });
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (genreName) {
      document.title = `${genreName} - CineLib`;
    }
    getMovies();
  }, [genreId, page, i18n.language]);

  const setPageFunction = (value) => {
    setLoading(true);
    setPage(value);
  };
  return {
    t,
    movies,
    totalPages,
    numResult,
    banner,
    loading,
    setPageFunction,
    genreName,
    page,
  };
}
