import { CiUser } from "react-icons/ci";
import { AiOutlineHeart } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface IconsProps {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Icons = ({ viewCart, setViewCart }: IconsProps) => {
  const handleCartClick = () => {
    setViewCart((prev) => (prev = !prev));
  };

  const location = useLocation();

  return (
    <div className="iconsDiv">
      <NavLink to="/profile">
        <CiUser className="icon" />
      </NavLink>
      <AiOutlineHeart className="icon" />
      {viewCart && location.pathname === "/store" ? (
        <MdOutlineAddShoppingCart className="icon" onClick={handleCartClick} />
      ) : (
        <NavLink to="/store">
          <GiShoppingCart className="icon" onClick={handleCartClick} />
        </NavLink>
      )}
    </div>
  );
};

export default Icons;
