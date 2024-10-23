import { FaStar, FaRegStar } from "react-icons/fa6";
import "./StarRating.scss";

function StarRating({ rating }) {

    const numStars = Math.round(rating / 2);

    const fullStars = [];
    const emptyStars = [];

    for (let i = 0; i < 5; i++) {
        if (i < numStars) {
            fullStars.push(i);
        } else {
            emptyStars.push(i);
        }
    }

    return (
        <div className="movie_rate">
            {fullStars.map(star => <FaStar key={star} />)}
            {emptyStars.map(star => <FaRegStar key={star} />)}
        </div>
    );
}

export default StarRating;