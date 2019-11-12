import React, { useEffect, useState } from "react";
import MainMenu from "./mainMenu/MainMenu";
import Footer from "../components/Footer";
import { CalendarView } from "./views/views.js";

export default function Main(props) {
  const [view, setView] = useState(<CalendarView />);
  useEffect(() => {}, [view]);

  const viewHandler = view => {
    setView(view);
  };
  return (
    <main className="main">
      {props.menuState === true ? (
        <MainMenu view={view} setView={viewHandler} />
      ) : null}
      <div className="inner">
        {view}
        <Footer />
      </div>
    </main>
  );
}
