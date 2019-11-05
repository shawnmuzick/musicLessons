import React from "react";
import Button from "./components/Button";
import {DailyView, FacultyView, DashboardView, CalendarView} from "../views/views.js";

export default function MainMenu(props) {
  const menuItems = ["Today", "Faculty", "Dashboard", "Calendar"];
  const setView = props.setView;
  const clickHandler = e => {
    let newView;
    switch (e.target.value) {
      case "Today":
        newView = <DailyView />;
        break;
      case "Faculty":
        newView = <FacultyView />;
        break;
      case "Dashboard":
        newView = <DashboardView />;
        break;
      case "Calendar":
        newView = <CalendarView />;
        break;
      default:
        newView = <DailyView />;
    }
    setView(newView);
  };
  return (
    <div id="MainMenu">
      <h2>Main Menu</h2>
      {menuItems.map(item => (
        <Button item={item} clickHandler={clickHandler} />
      ))}
    </div>
  );
}
