import "./Loader.scss";

function Loader({ height }) {
  return (
    <div className="container" style={height && { minHeight: `${height}px` }}>
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
