import Searchbar from "../Searchbar";
import "./BannerSearch.scss";

function Banner({ banner }) {
    const apiImgs = import.meta.env.VITE_IMG;

    return (
        <div className="banner_search">
            <div className="banner" style={{ backgroundImage: `url(${banner?.backdrop_path ? `${apiImgs}${banner.backdrop_path}` : "/banner-home.png"})` }}>
                <div className="banner_content">
                    <Searchbar />
                </div>
                <div className="custom-shape-divider-bottom">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M1200,0H0V120H281.94C572.9,116.24,602.45,3.86,602.45,3.86h0S632,116.24,923,120h277Z" className="shape-fill"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Banner;