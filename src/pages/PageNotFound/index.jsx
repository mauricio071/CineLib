import { Link } from "react-router-dom";
import "./PageNotFound.scss";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function PageNotFound() {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = `404 - ${t("pageNotFoundMessage")}`;
    }, [])

    return (
        <section className="error_container">
            <h1>404</h1>
            <h2>Oops... {t("pageNotFoundMessage")}</h2>
            <Link to="/" className="btn">{t("pageNotFoundButton")}</Link>
        </section>
    );
}

export default PageNotFound;