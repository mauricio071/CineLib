import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";

import { useFavoriteContext } from "../../components/contexts/Favorites";
import { api_key, apiMoviesGeneral } from "../../constants/apiKeys";
import { randomBanner } from "../../utils/randomBanner";
import { getLanguage } from "../../utils/getLanguage";

export function useFavorites() {
  const { t, i18n } = useTranslation();
  const language = getLanguage();

  const { favorite, newFavoriteArray } = useFavoriteContext();

  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  const newFavoriteI18n = async () => {
    try {
      const newList = await Promise.all(
        favorite.map(async (fav) => {
          return axios
            .get(`${apiMoviesGeneral}/${fav.id}`, {
              params: {
                api_key,
                language,
              },
            })
            .then((response) => response.data);
        })
      );
      newFavoriteArray(newList);
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  useEffect(() => {
    setLoading(true);
    document.title = `${t("favoriteTitle")} - CineLib`;
    newFavoriteI18n();
    setLoading(false);
  }, [i18n.language]);

  useEffect(() => {
    setLoading(true);
    setBanner(randomBanner(favorite));
    setLoading(false);
  }, [favorite]);

  return { t, favorite, banner, loading };
}
