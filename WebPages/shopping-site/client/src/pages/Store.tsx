import Cart from "../components/Store/Cart";
import ProductList from "../components/Store/ProductList";
import "../styles/Store.scss";
import "../styles/Button-5.scss";

interface StoreProps {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Store = ({ viewCart, setViewCart }: StoreProps) => {
  return viewCart ? (
    <Cart />
  ) : (
    <div className="productsPage">
      <h1>Products</h1>
      <ProductList />
    </div>
  );
};

export default Store;
