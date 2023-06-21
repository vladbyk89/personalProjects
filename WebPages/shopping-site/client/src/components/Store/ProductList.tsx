import useProducts from "../../hooks/useProducts";
import { ReactElement } from "react";
import Product from "./Product";
import { useAppSelector } from "../../hooks/reduxHook";
import { selectUser } from "../../app/userSlice";

const ProductList = () => {
  const { products, isLoading } = useProducts();
  const user = useAppSelector(selectUser);

  let pageContent: ReactElement | ReactElement[] = isLoading ? (
    <p>Loading...</p>
  ) : (
    <p>Failed to load products</p>
  );

  if (products?.length) {
    pageContent = products.map((product, i) => {
      return <Product key={i} product={product} currentUser={user} />;
    });
  }

  const content = <main className="products">{pageContent}</main>;

  return content;
};

export default ProductList;
