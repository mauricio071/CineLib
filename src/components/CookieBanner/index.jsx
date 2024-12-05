import { useEffect, useState } from "react";
import "./CookieBanner.scss";

function CookieBanner() {
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
          <h3>Esse site usa cookies</h3>
          <p>
            Este site usa cookies para melhorar sua experiência. Ao continuar
            navegando, você concorda com o uso de cookies.
          </p>
          <button onClick={setCookie}>Concordo</button>
        </div>
      )}
    </>
  );
}

export default CookieBanner;
