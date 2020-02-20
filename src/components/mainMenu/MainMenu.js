import React from "react";
import Button from "../buttons/Button";
import './mainMenu.css'
export default function MainMenu({ setView, menuItems }) {
  return (
    <div id="MainMenu">
      <h2>Main Menu</h2>
      {menuItems.map(item => (
        <Button name={item.name} key={item.name} fn={setView} />
      ))}
    </div>
  );
}
