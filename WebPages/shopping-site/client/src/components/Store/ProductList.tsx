import useCart from "../../hooks/useCart";
import useProducts from "../../hooks/useProducts";
// import { UseProductsContextType } from "../context/ProductsProvider";
import { ReactElement } from "react";
import Product from "./Product";

const ProductList = () => {
  const { dispatch, REDUCER_ACTIONS } = useCart();
  const { products } = useProducts();

  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>;

  if (products?.length) {
    pageContent = products.map((product, i) => {
      return (
        <Product
          key={i}
          product={product}
          dispatch={dispatch}
          REDUCER_ACTIONS={REDUCER_ACTIONS}
        />
      );
    });
  }

  const content = (
    <main className="products">
      {pageContent}
    </main>
  );

  return content;
};

export default ProductList;
