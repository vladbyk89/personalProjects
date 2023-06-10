import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

type ProductProps = {
  name: string;
  imgUrl: string;
  price: number;
};

const Product = ({ name, imgUrl, price }: ProductProps) => {
  const [amount, setAmount] = useState(0);

  const handleClick = (action: string) => {
    action === "+"
      ? setAmount((prev) => prev + 1)
      : amount !== 0
      ? setAmount((prev) => prev - 1)
      : null;
  };

  return (
    <div className="product">
      <p>{name}</p>
      <img src={imgUrl} alt="blade-image" />
      <div className="action">
        <em>{price}</em>
        <AiOutlinePlus onClick={() => handleClick("+")} className="icon" />
        <p>{amount}</p>
        <AiOutlineMinus onClick={() => handleClick("-")} className="icon" />
      </div>
    </div>
  );
};

export default Product;
