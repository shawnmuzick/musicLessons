import React, { useEffect, useState } from "react";
import "./App.css";
import MainMenu from "./mainMenu/MainMenu";
import DailyView from "./views/dailyView/DailyView";
import FacultyView from "./views/facultyView/FacultyView";
function App() {
  const [view, setView] = useState("Today");
  useEffect(() => {}, [view]);
  const date = new Date();
  const viewHandler = menuButton => {
    setView(menuButton);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Music Lessons</h1>
      </header>
      <main className="main">
        <MainMenu setView={viewHandler} />
        {view === "Today" ? <DailyView /> : <FacultyView />}
      </main>
      <footer className="App-header">&#169; {date.getFullYear()}</footer>
    </div>
  );
}

export default App;
