import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MenuContext from "../context/contexts/MenuContext";
import "../css/Navbar.css";
const Navbar = () => {
  const menu = useContext(MenuContext);
  const menuOpen = () => {
    const menuid = document.getElementById("menu");
    if (menu.menu === true) {
      menuid.style.display = "inline";
      menu.setMenu(false)
    }
    if (menu.menu === false) {
      menuid.style.display = "none";
      menu.setMenu(true)
    }
  };
  return (
    <>
      <div className="navbar-container">
        <div className="navbar-left">
          <i className="fa-solid fa-bars fa-xl" onClick={menuOpen}></i>
        </div>
        <div className="navbar-right">
          <Link to="/logout" className="logout-link">
            Logout
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
