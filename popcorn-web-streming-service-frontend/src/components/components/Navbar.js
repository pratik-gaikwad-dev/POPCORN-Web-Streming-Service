import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Navbar.css";
import MenuContext from "../../context/Contexts/MenuContext";
import { FormControlLabel, FormGroup, Switch, Typography } from "@mui/material";
import ModeContext from "../../context/Contexts/ModeContext";
import UserContext from "../../context/Contexts/UserContext";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterContext from "../../context/Contexts/FilterContext";
const Navbar = (props) => {
  const menu = useContext(MenuContext);
  const mode = useContext(ModeContext);
  const { searchMovies } = useContext(FilterContext);
  const { token } = useContext(UserContext);
  let query = "";
  const navigate = useNavigate();
  const searchItems = (e) => {
    e.preventDefault();
    let searchq = document.getElementById("search").value;
    searchMovies(searchq);
    query = `/search/${searchq}`;
    navigate(query);
  };
  const lightStyle = {
    backgroundColor: "white",
    color: "black",
  };
  const darkStyles = {
    backgroundColor: "black",
    color: "white",
  };
  const border = {
    border: "1px solid black",
  };
  return (
    <>
      <div
        className="main"
        style={mode.checked === false ? darkStyles : lightStyle}
      >
        <div className="nav-part" id="nav-part-1">
          <ul>
            {props.showmenu === false ? null : (
              <li className="nav-part-1-item">
                <Link
                  onClick={() => menu.toggle(menu.show)}
                  className="bars"
                  style={mode.checked === false ? darkStyles : lightStyle}
                >
                  <i className="fa-solid fa-bars"></i>
                </Link>
              </li>
            )}
            <li className="nav-part-1-item">
              <Link
                to="/"
                className="nav-link"
                style={mode.checked === false ? darkStyles : lightStyle}
              >
                POPCORN
              </Link>
            </li>
          </ul>
        </div>
        <div className="nav-part" id="nav-part-2">
          <ul>
            <li className="nav-part-2-item">
              <Link
                to="/filter/movies"
                className="nav-menu"
                style={mode.checked === false ? darkStyles : lightStyle}
              >
                Movies
              </Link>
            </li>
            <li className="nav-part-2-item">
              <Link
                to="/filter/tv-series"
                className="nav-menu"
                style={mode.checked === false ? darkStyles : lightStyle}
              >
                TV-Series
              </Link>
            </li>
            <li className="nav-part-2-item">
              <Link
                to="/filter/hollywood"
                className="nav-menu"
                style={mode.checked === false ? darkStyles : lightStyle}
              >
                Hollywood
              </Link>
            </li>
            <li className="nav-part-2-item">
              <Link
                to="/filter/bollywood"
                className="nav-menu"
                style={mode.checked === false ? darkStyles : lightStyle}
              >
                Bollywood
              </Link>
            </li>
          </ul>
        </div>
        <div className="nav-part" id="nav-part-3">
          <ul>
            <form onSubmit={searchItems}>
              <li
                className="nav-part-3-item"
                id="nav-part-3-item-1"
                style={border}
              >
                <input type="text" id="search" placeholder="Search..." />
                <IconButton type="submit" aria-label="delete">
                  <SearchIcon />
                </IconButton>
              </li>
            </form>
            <li className="nav-part-3-item">
              <i className="fa-solid fa-user fa-xl"></i>
              <div className="nav-user-dropdown">
                {!token ? (
                  <>
                    <div className="nav-user-dropdown-1">
                      <Link className="nav-user-dropdown-link" to="/login">
                        Login
                      </Link>
                    </div>
                    <div className="nav-user-dropdown-1">
                      <Link className="nav-user-dropdown-link" to="/signup">
                        Signup
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="nav-user-dropdown-1">
                      <Link className="nav-user-dropdown-link" to="/logout">
                        Logout
                      </Link>
                    </div>
                    <div className="nav-user-dropdown-1">
                      <Link className="nav-user-dropdown-link" to="/account">
                        Account
                      </Link>
                    </div>
                  </>
                )}
                <div className="nav-user-dropdown-1">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          onClick={() =>
                            mode.checked === false
                              ? mode.setChecked(true)
                              : mode.setChecked(false)
                          }
                        />
                      }
                      label={
                        <Typography
                          color="black"
                          fontSize="12px"
                          fontFamily={"Merriweather, serif"}
                        >
                          {mode.checked === true ? "Light Mode" : "Dark Mode"}
                        </Typography>
                      }
                    />
                  </FormGroup>
                </div>
              </div>
            </li>
            <li className="nav-part-3-item"></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
