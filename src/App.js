import React, { useEffect, useState } from "react";
import "./App.css";
import MainMenu from "./mainMenu/MainMenu";
import DailyView from "./views/dailyView/DailyView";
import FacultyView from "./views/facultyView/FacultyView";
import DashboardView from "./views/dashboardView/DashboardView";
import CalendarView from "./views/calendarView/CalendarView";

function App() {
  const [view, setView] = useState(<DailyView />);
  useEffect(() => {}, [view]);
  const date = new Date();
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
        <h1>Music Lessons</h1>
      </header>
      <main className="main">
        <MainMenu setView={viewHandler} />
        {view}
      </main>
      <footer className="App-header">&#169; {date.getFullYear()}</footer>
    </div>
  );
}

export default App;
