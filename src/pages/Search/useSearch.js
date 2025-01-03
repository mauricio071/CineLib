import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";

import { api_key, apiMovies } from "../../constants/apiKeys";
import { randomBanner } from "../../utils/randomBanner";
import { getLanguage } from "../../utils/getLanguage";

export function useSearch() {
  const { t, i18n } = useTranslation();
  const language = getLanguage();

  const [searchParams] = useSearchParams();
  const queryParams = searchParams.get("search");

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [numResult, setNumResult] = useState(0);
  const [banner, setBanner] = useState(null);

  const getMovies = async () => {
    const response = await axios
      .get(apiMovies, {
        params: {
          api_key,
          query: queryParams,
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

    return response;
  };

  useEffect(() => {
    if (queryParams) {
      document.title = `${queryParams} - CineLib`;
    }
    getMovies();
  }, [queryParams, page, i18n.language]);

  const setPageFunction = (value) => {
    setPage(value);
  };

  return {
    t,
    movies,
    totalPages,
    numResult,
    banner,
    setPageFunction,
    queryParams,
    page,
  };
}
