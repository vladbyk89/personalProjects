import Links from "./Links";
import Icons from "./Icons";
import Search from "./Search";

interface NavbarProps {
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ setViewCart }: NavbarProps) => {
  return (
    <nav className="navBar">
      <Links />
      <h3>Online-Shop</h3>
      <Search />
      <Icons setViewCart={setViewCart}/>
    </nav>
  );
};

export default Navbar;
