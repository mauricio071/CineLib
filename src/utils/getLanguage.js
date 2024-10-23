import { useTranslation } from "react-i18next";

export const getLanguage = () => {
    const { i18n } = useTranslation();
    let language = "pt-BR";

    switch (i18n.language) {
        case "ptBR":
            language = "pt-BR";
            break;
        case "en":
            language = "en-US";
            break;
        default:
            language = "pt-BR";
            break;
    }

    return language;
}