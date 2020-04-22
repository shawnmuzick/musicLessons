import React from "react";
import {Button} from ".";
import { menuItems } from "./views/ViewIndex.js";
import "./mainMenu.css";
export default function MainMenu({ setView }) {
  const renderMenu = () => {
    return menuItems.map((item) => <Button name={item.name} key={item.name} fn={setView} />);
  };
  return (
    <div id="MainMenu">
      <h2>Main Menu</h2>
      {renderMenu()}
    </div>
  );
}
