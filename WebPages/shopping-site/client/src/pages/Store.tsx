import "../styles/Store.scss";
import "../styles/Button-5.scss";
import ShortTrackBlades from "../components/Store/ShortTrackBlades";

const Store = () => {
  return (
    <div className="storePage">
      <h1>Products</h1>
      <ShortTrackBlades />
      <button className="button-5">Add to cart</button>
    </div>
  );
};

export default Store;
