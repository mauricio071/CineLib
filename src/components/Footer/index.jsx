import { useTranslation } from "react-i18next";
import "./Footer.scss";

function Footer() {
    const { t } = useTranslation();

    return (
        <footer>
            <p>CineLib &copy; {t("footerMessage")} Maurício Naoki 2024</p>
        </footer>
    );
}

export default Footer;