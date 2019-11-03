import React, { useEffect, useState } from "react";
import "./App.css";
import MainMenu from "./mainMenu/MainMenu";
import DailyView from "./views/dailyView/DailyView";
import FacultyView from "./views/facultyView/FacultyView";
import DashboardView from "./views/dashboardView/DashboardView";
import CalendarView from "./views/calendarView/CalendarView";

function App() {
  const [view, setView] = useState(<DailyView />);
  const [menuState, setMenuState] = useState("-");
  useEffect(() => {}, [view]);
  const date = new Date();
  const menuExpand = e => {
    let newState;
    switch (e.target.value) {
      case "+":
        newState = "-";
        break;
      default:
        newState = "+";
    }
    setMenuState(newState);
  };
  const viewHandler = menuButton => {
    let newView;
    switch (menuButton) {
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
    <div className="App">
      <header className="App-header">
        <h1>
          <button value={menuState} onClick={menuExpand}>
            {menuState}
          </button>
          Music Lessons
        </h1>
      </header>
      <main className="main">
        {menuState === "-" ? (
            <MainMenu setView={viewHandler} />
        ) : null}

        <div className="inner">
          {view}
          <footer className="App-header">&#169; {date.getFullYear()}</footer>
        </div>
      </main>
    </div>
  );
}

export default App;
