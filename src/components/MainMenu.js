import React from "react";
import { Button } from ".";
import "./mainMenu.css";
export default function MainMenu({ setView, menuItems }) {
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
