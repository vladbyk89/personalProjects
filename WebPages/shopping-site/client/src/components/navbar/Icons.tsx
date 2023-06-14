import { CiUser } from "react-icons/ci";
import { AiOutlineHeart } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";

interface IconsProps {
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Icons = ({ setViewCart }: IconsProps) => {
  return (
    <div className="iconsDiv">
      <CiUser className="icon" />
      <AiOutlineHeart className="icon" />
      <GiShoppingCart
        className="icon"
        onClick={() => setViewCart((prev) => (prev = !prev))}
      />
    </div>
  );
};

export default Icons;
