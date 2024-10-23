import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
import { useEffect, useState } from "react";
import { IoMenuOutline } from "react-icons/io5";

import GenreLinks from "../GenreLink";
import Searchbar from "../Searchbar";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";

function Navbar() {

    const { t } = useTranslation();

    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        setShowMenu(false);
    }, [location.pathname]);

    return (
        <header>
            <div className="wrapper">
                <div className="content">
                    <Link to="/">
                        <span className="logo">CineLib</span>
                    </Link>
                    <IoMenuOutline onClick={() => setShowMenu(!showMenu)} className="menu-icon" />
                    <nav className={`${showMenu ? 'flex' : 'hidden'} lg:flex`}>
                        <Link to="/" style={{ color: location.pathname === "/" ? "#b71c1c" : "#fff" }}>Home</Link>
                        <GenreLinks />
                        <Link to="/favorites" style={{ color: location.pathname === "/favorites" ? "#b71c1c" : "#fff" }}>{t("favoritesMenu")}</Link>
                        <Searchbar />
                        <LanguageSwitcher />
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Navbar;