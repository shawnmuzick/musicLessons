import React from "react";
import icon from "./icons/menu-24px.svg";
export default function Header({menuState,setMenu }) {
  return (
    <header className="App-header">
      <div id="App-header-wrapper">
        <button id="MainMenuIconWrapper"onClick={()=>setMenu(!menuState)}>
          <img id="MainMenuIcon"src={icon} alt="" />
        </button>
        <h1>Music Lessons</h1>
      </div>
    </header>
  );
}
