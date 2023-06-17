import { NavLink } from "react-router-dom";

const Links = () => {
  return (
    <div className="linksDiv">
      <NavLink className="navLink" to="/">
        Home
      </NavLink>
      <NavLink className="navLink" to="/products">
        Products
      </NavLink>
      <NavLink className="navLink" to="/store">
        Store
      </NavLink>
      <NavLink className="navLink" to="/about">
        About
      </NavLink>
    </div>
  );
};

export default Links;
