import React, { useState } from "react";
import MenuContext from "../Contexts/MenuContext";

const MenuStates = (props) => {
  const [show, setShow] = useState(false);
  const toggle = (show1) => {
    if (show1 === true) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  return (
    <MenuContext.Provider value={{ show, setShow, toggle }}>
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuStates;
