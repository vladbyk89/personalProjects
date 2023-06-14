import { ProductType } from "../../context/ProductProvider";
import { ReducerActionType, ReducerAction } from "../../context/CartProvider";
import { ReactElement, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

interface ProductProps {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
}

const Product = ({
  product,
  dispatch,
  REDUCER_ACTIONS,
}: ProductProps): ReactElement => {
  const [count, setCount] = useState(0);
  const img: string = new URL(`${product.imgUrl}`, import.meta.url).href;

  const onAddToCart = () =>
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });


  const handleIconClick = (e: MouseEvent, sign:string) => {
    e.preventDefault();
    if(sign === "-"){
      setCount((prev) => prev - 1)
    }
    else {
      setCount((prev) => prev + 1)
    }
  }

  const content = (
    <article className="product">
      <h3>{product.name}</h3>
      <img src={img} alt={product.name} className="product_img" />
      <div className="action">
      <p>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(product.price)}
      </p>
        <AiOutlinePlus
          className="icon"
          onClick={(e: MouseEvent) => handleIconClick(e, "+")}
        />
        {count}
        <AiOutlineMinus
          className="icon"
          onClick={(e: MouseEvent) => handleIconClick(e, "-")}
        />
      </div>
    </article>
  );

  return content;
};

export default Product;
