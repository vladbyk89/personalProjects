import { CiUser } from "react-icons/ci";
import { AiOutlineHeart } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { User } from "../../App";

interface IconsProps {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: User | null;
  
}

const Icons = ({
  viewCart,
  setViewCart,
  currentUser,
}: IconsProps) => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    setViewCart((prev) => (prev = !prev));
  };

  const handleProfileClick = async () => {
    try {
      if (currentUser) return navigate("/profile");
      
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const location = useLocation();

  return (
    <div className="iconsDiv">
      <CiUser className="icon" onClick={handleProfileClick} />
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
