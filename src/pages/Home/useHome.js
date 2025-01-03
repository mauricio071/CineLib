import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";

import { api_key, trendingMovies } from "../../constants/apiKeys";
import { randomBanner } from "../../utils/randomBanner";
import { getLanguage } from "../../utils/getLanguage";

export function useHome() {
  const { t, i18n } = useTranslation();
  const language = getLanguage();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMovies = async () => {
    setLoading(true);
    try {
      await axios
        .get(trendingMovies, {
          params: {
            api_key,
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
        });
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "CineLib";
    getMovies();
  }, [page, i18n.language]);

  const setPageFunction = (value) => {
    setLoading(true);
    setPage(value);
  };

  return { t, movies, totalPages, banner, loading, setPageFunction, page };
}
