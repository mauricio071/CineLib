import "./Badge.scss";

function Badge({ value }) {
    return (
        <div className="badge">
            {value}
        </div>
    );
}

export default Badge;