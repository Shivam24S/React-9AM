import React from "react";
import { Link, NavLink } from "react-router-dom";


const Header = () => {
  return (
    <ul style={{ display: "flex", gap: "10px" }}>
      <Link to="/"> Home</Link>
      <Link to="about"> About</Link>
      <Link to="service"> Service</Link>
      <Link to="product/:id"> Product</Link>
    </ul>
  );
};

export default Header;
