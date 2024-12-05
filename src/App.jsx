import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FaArrowUp } from "react-icons/fa6";
import "./i18n/index";
import { useTranslation } from "react-i18next";
import CookieBanner from "./components/CookieBanner";

function App() {
  const location = useLocation();
  const { i18n } = useTranslation();

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");

    if (!storedLanguage) {
      localStorage.setItem("language", i18n.language);
    }
  }, [i18n.language]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const checkScrollTop = () => {
    if (!showButton && window.pageYOffset > 500) {
      setShowButton(true);
    } else if (showButton && window.pageYOffset <= 500) {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);

    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showButton]);

  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <button
        onClick={scrollToTop}
        className={`scroll-btn ${showButton ? "show" : "hide"}`}
      >
        <FaArrowUp />
      </button>
      <CookieBanner />
      <Footer />
    </>
  );
}

export default App;
