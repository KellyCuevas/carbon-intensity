import React from "react";
import { NavLink } from "react-router-dom";

const MainNav = () => {
  return (
    <nav className="nav-menu">
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/detail/15" className="nav-link">
        Region Detail
      </NavLink>
    </nav>
  );
};

export default MainNav;
