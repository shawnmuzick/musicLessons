import React from "react";
import Button from "./components/Button";

export default function MainMenu({ setView, menuItems, menuState }) {
  if (menuState) {
    return (
      <div id="MainMenu">
        <h2>Main Menu</h2>
        {menuItems.map(item => (
          <Button name={item.name} key={item.name} setView={setView} />
        ))}
      </div>
    );
  } else {
    return null;
  }
}
