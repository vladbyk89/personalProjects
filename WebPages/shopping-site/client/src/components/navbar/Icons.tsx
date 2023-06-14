import { CiUser } from "react-icons/ci";
import { AiOutlineHeart } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { MdOutlineAddShoppingCart } from "react-icons/md";

interface IconsProps {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Icons = ({ viewCart, setViewCart }: IconsProps) => {
  return (
    <div className="iconsDiv">
      <CiUser className="icon" />
      <AiOutlineHeart className="icon" />
      {viewCart ? (
        <MdOutlineAddShoppingCart
          className="icon"
          onClick={() => setViewCart((prev) => (prev = !prev))}
        />
      ) : (
        <GiShoppingCart
          className="icon"
          onClick={() => setViewCart((prev) => (prev = !prev))}
        />
      )}
    </div>
  );
};

export default Icons;
