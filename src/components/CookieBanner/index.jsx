import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import "./CookieBanner.scss";

function CookieBanner() {
  const { t } = useTranslation();

  const [showBanner, setShowBanner] = useState(null);

  useEffect(() => {
    const hasCookie = localStorage.getItem("cinelib-cookie");
    setShowBanner(!hasCookie);
  }, []);

  const setCookie = () => {
    localStorage.setItem("cinelib-cookie", true);
    setShowBanner(false);
  };

  if (showBanner === null) {
    return null;
  }

  return (
    <>
      {showBanner && (
        <div className="cookie-banner">
          <h3>{t("cookieBannerTitle")}</h3>
          <p>{t("cookieBannerMessage")}</p>
          <button onClick={setCookie}>{t("cookieBannerButton")}</button>
        </div>
      )}
    </>
  );
}

export default CookieBanner;
