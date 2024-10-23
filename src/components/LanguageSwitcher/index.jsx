import { useState } from "react";
import { useTranslation } from "react-i18next";
import br from "../../assets/flags/br.svg";
import us from "../../assets/flags/us.svg";
import "./LanguageSwitcher.scss";

function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const languageOptions = [
        {
            name: i18n.language === "ptBR" ? "Português" : "Portuguese",
            value: "ptBR",
            flag: br
        },
        {
            name: i18n.language === "en" ? "English" : "Inglês",
            value: "en",
            flag: us
        },
    ];

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
        setDropdownOpen(false);
    };

    return (
        <div className="language_switcher">
            <div className="selector" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <img
                    src={languageOptions.find(opt => opt.value === i18n.language)?.flag || br}
                    alt={i18n.language}
                    className="current-flag"
                />
            </div>

            {dropdownOpen && (
                <ul className="list">
                    {languageOptions.map((languageOption) => (
                        <li
                            key={languageOption.value}
                            onClick={() => changeLanguage(languageOption.value)}
                            className="option"
                        >
                            <img
                                src={languageOption.flag}
                                alt={languageOption.name}
                                className="flag-icon"
                            />
                            <span
                                className={`${i18n.language === languageOption.value && "text-primary font-bold"}`}
                            >
                                {languageOption.name}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default LanguageSwitcher;