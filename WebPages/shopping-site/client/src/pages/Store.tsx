import Cart from "../components/Store/Cart";
import ProductList from "../components/Store/ProductList";
import "../styles/Store.scss";
import "../styles/Button-5.scss";
import { selectproducts } from "../app/productsSlice";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHook";
import { useEffect } from "react";
import { fetchProducts } from "../app/productsSlice";

interface StoreProps {
  viewCart: boolean;
}

const Store = ({ viewCart }: StoreProps) => {
  const { products, isLoading } = useAppSelector(selectproducts);
  const dispatch = useAppDispatch();

  
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return viewCart ? (
    <Cart />
  ) : (
    <div className="productsPage">
      <h1>Products</h1>
      {isLoading ? <p>Products loading...</p> : <ProductList  />}
    </div>
  );
};

export default Store;
