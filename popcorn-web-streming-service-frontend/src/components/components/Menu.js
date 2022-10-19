import React, { useContext } from "react";
import "../../css/Menu.css";
import { Link } from "react-router-dom";
import ModeContext from "../../context/Contexts/ModeContext";
const Menu = () => {
  const mode = useContext(ModeContext);
  const lightStyle = {
    backgroundColor: "#f6f7f9",
    color: "black",
  };
  const darkStyle = {
    backgroundColor: "black",
    color: "white",
  };
  return (
    <>
      <div
        className="menu-bar"
        style={mode.checked === false ? darkStyle : lightStyle}
      >
        <ul>
          <li className="menu-bar-list">
            <Link
              className="menu-bar-link"
              to=""
              style={mode.checked === false ? darkStyle : lightStyle}
            >
              Action
            </Link>
          </li>
          <li className="menu-bar-list">
            <Link
              className="menu-bar-link"
              to=""
              style={mode.checked === false ? darkStyle : lightStyle}
            >
              Advanture
            </Link>
          </li>
          <li className="menu-bar-list">
            <Link
              className="menu-bar-link"
              to=""
              style={mode.checked === false ? darkStyle : lightStyle}
            >
              Animated
            </Link>
          </li>
          <li className="menu-bar-list">
            <Link
              className="menu-bar-link"
              to=""
              style={mode.checked === false ? darkStyle : lightStyle}
            >
              Comedy
            </Link>
          </li>
          <li className="menu-bar-list">
            <Link
              className="menu-bar-link"
              to=""
              style={mode.checked === false ? darkStyle : lightStyle}
            >
              Crime
            </Link>
          </li>
          <li className="menu-bar-list">
            <Link
              className="menu-bar-link"
              to=""
              style={mode.checked === false ? darkStyle : lightStyle}
            >
              Drama
            </Link>
          </li>
          <li className="menu-bar-list">
            <Link
              className="menu-bar-link"
              to=""
              style={mode.checked === false ? darkStyle : lightStyle}
            >
              Horror
            </Link>
          </li>
          <li className="menu-bar-list">
            <Link
              className="menu-bar-link"
              to=""
              style={mode.checked === false ? darkStyle : lightStyle}
            >
              Sci-Fi
            </Link>
          </li>
          <li className="menu-bar-list">
            <Link
              className="menu-bar-link"
              to=""
              style={mode.checked === false ? darkStyle : lightStyle}
            >
              Thriller
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Menu;
