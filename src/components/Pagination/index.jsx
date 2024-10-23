import { useEffect, useState } from "react";
import "./Pagination.scss";
import { useTranslation } from "react-i18next";

function Pagination({ page, totalPages, setPageFunction }) {
    const { t } = useTranslation();

    const [childTotalPage, setChilTotalPage] = useState(Number(totalPages));
    const [childPage, setChildPage] = useState(page);

    useEffect(() => {
        checkPagination();
        setChildPage(page);
    }, [page, totalPages]);

    const checkPagination = () => {
        totalPages > 500 ? setChilTotalPage(500) : setChilTotalPage(totalPages);
    }

    const handlePrevious = () => {
        if (childPage > 1) {
            setPageFunction(childPage - 1);
            scrollToMiddle();
        }
    };

    const handleNext = () => {
        if (childPage < childTotalPage) {
            setPageFunction(childPage + 1);
            scrollToMiddle();
        }
    };

    const handleKeyup = (event) => {
        if (event.key === "Enter") {
            applyPageChange();
        }
    }

    const handleBlur = () => {
        applyPageChange();
    }

    const applyPageChange = () => {
        const inputPage = Number(childPage);
        if (inputPage > 0 && inputPage <= childTotalPage && Number(childPage) !== Number(page)) {
            setPageFunction(inputPage);
        } else {
            setChildPage(page);
        }
        scrollToMiddle();
    }

    const scrollToMiddle = () => {
        window.scrollTo({
            top: window.innerHeight / 2,
            behavior: 'smooth'
        });
    };

    return (
        <div className="pagination">
            {page > 1 && (
                <button onClick={handlePrevious}>{t("prevPagination")}</button>
            )}
            <input
                type="number"
                value={childPage}
                onChange={(e) => setChildPage(e.target.value)}
                onKeyUp={handleKeyup}
                onBlur={handleBlur}
                min={1}
                max={childTotalPage}
            />
            <span>/ {childTotalPage}</span>
            {page < childTotalPage && (
                <button onClick={handleNext}>{t("nextPagination")}</button>
            )}
        </div>
    );
}

export default Pagination;