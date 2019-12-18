import React, { useState } from "react";
import MainMenu from "./mainMenu/MainMenu";
import Footer from "../components/Footer";
import { CalendarView, DashboardView, VIEW } from "./views/views.js";
export default function Main({ menuState }) {
  const [view, setView] = useState("Calendar");

  const menuItems = [
    { name: "Calendar", component: <CalendarView /> },
    { name: "Dashboard", component: <DashboardView /> }
  ];

  return (
    <main className="main">
      <MainMenu
        view={view}
        setView={setView}
        menuItems={menuItems}
        menuState={menuState}
      />
      <div className="inner">
        {menuItems.map(item => (
          <VIEW name={item.name} view={view}>
            <>{item.component}</>
          </VIEW>
        ))}

        <Footer />
      </div>
    </main>
  );
}
