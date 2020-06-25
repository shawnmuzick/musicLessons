import React from "react";
import {Header} from "../components/";
import icon from "../icons/menu-24px.svg";
export default function AppHeader({ menuState, setMenu }) {
  return (
    <Header>
      <div id="App-header-wrapper">
        <button id="MainMenuIconWrapper" onClick={() => setMenu(!menuState)}>
          <img id="MainMenuIcon" src={icon} alt="" />
        </button>
        <h1>Music Lessons</h1>
      </div>
    </Header>
  );
}
