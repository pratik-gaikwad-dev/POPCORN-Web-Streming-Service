import { useState } from "react";
import MenuContext from "../contexts/MenuContext";

const MenuState = (props) => {
    const [menu, setMenu] = useState(true);
  return (
    <>
        <MenuContext.Provider value={{menu, setMenu}}>
            {props.children}
        </MenuContext.Provider>
    </>
  )
}

export default MenuState