import React, { useContext } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../css/Home.css"
import MenuContext from "../context/contexts/MenuContext";
const Home = () => {
  const menu = useContext(MenuContext);
  console.log(menu.menu)
  return (
    <>
      <div className="grid-main">
        <div className="grid-items">
          <div className="grid-item-1" id='menu'>
          {menu.menu===true ? <Sidebar/> : null}
          </div>
          <div className="grid-item-2">
            <Navbar />
          <h1 style={{ textAlign: "center", marginTop: "100px" }}>Welcome to POPCORN Admin Panel</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
