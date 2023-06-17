import Links from "./Links";
import Icons from "./Icons";
import Search from "./Search";
import { User } from "../../App";

interface NavbarProps {
  isStore: boolean;
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: User | null;
}

const Navbar = ({
  isStore,
  viewCart,
  setViewCart,
  currentUser,
}: NavbarProps) => {
  return (
    <nav className="navBar">
      <Links />
      <h3>Online-Shop</h3>
      {isStore ? <Search /> : ""}
      <Icons
        currentUser={currentUser}
        viewCart={viewCart}
        setViewCart={setViewCart}
      />
    </nav>
  );
};

export default Navbar;
