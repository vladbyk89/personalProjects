import Links from "./Links";
import Icons from "./Icons";
import Search from "./Search";

interface NavbarProps {
  isStore: boolean;
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ isStore, viewCart, setViewCart }: NavbarProps) => {
  return (
    <nav className="navBar">
      <Links />
      <h3>Online-Shop</h3>
      {isStore  ? <Search /> : ""}
      <Icons viewCart={viewCart} setViewCart={setViewCart} />
    </nav>
  );
};

export default Navbar;
