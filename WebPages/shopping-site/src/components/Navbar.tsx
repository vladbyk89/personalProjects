import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navBar">
      <div><NavLink to="/">Home</NavLink></div>
      <div><NavLink to="/store">Store</NavLink></div>
      <div><NavLink to="/about">About</NavLink></div>
    </nav>
  );
};

export default Navbar;
