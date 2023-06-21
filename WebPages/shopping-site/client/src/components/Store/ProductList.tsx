import useProducts from "../../hooks/useProducts";
import { UserType } from "../../App";
import { ReactElement, useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";

const ProductList = () => {
  const { products, isLoading } = useProducts();
  
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get("api/v1/users/getUser");

      const user = await data.user;

      if (user) setCurrentUser(user);
    };

    fetchUser();
  }, []);


  let pageContent: ReactElement | ReactElement[] = isLoading ? (
    <p>Loading...</p>
  ) : (
    <p>Failed to load products</p>
  );

  if (products?.length) {
    pageContent = products.map((product, i) => {
      return (
        <Product
          key={i}
          product={product}
          currentUser={currentUser}
        />
      );
    });
  }

  const content = <main className="products">{pageContent}</main>;

  return content;
};

export default ProductList;
