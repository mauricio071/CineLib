import "./Searchbar.scss";
import { useNavigate } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function Searchbar() {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const searchMovie = () => {
        if (search) {
            navigate(`/search?search=${search}`);
            setSearch("");
        }
    };

    const handleKeyup = (event) => {
        if (event.key === "Enter") {
            searchMovie();
        }
    }

    return (
        <div className="searchbar">
            <input
                onChange={(e) => setSearch(e.target.value)}
                onKeyUp={handleKeyup}
                value={search}
                type="search"
                placeholder={t("searchBarPlaceholder")}
            />
            <button onClick={searchMovie}>
                <BiSearchAlt2 />
            </button>
        </div>
    );
}

export default Searchbar;