import Links from "./Links";
import Icons from "./Icons";
import Search from "./Search";

const Navbar = () => {
  return (
    <nav className="navBar">
      <Links />
      <h3>Online-Shop</h3>
      <Search />
      <Icons />
    </nav>
  );
};

export default Navbar;
