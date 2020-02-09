import React, { useState } from "react";
import MainMenu from "./mainMenu/MainMenu";
import Footer from "../components/Footer";
import { Calendar, Dashboard, VIEW } from "./views/views.js";
export default function Main({ menuState }) {
  const [view, setView] = useState("Calendar");

  const menuItems = [
    { name: "Calendar", component: <Calendar /> },
    { name: "Dashboard", component: <Dashboard /> }
  ];

  return (
    <main className="main">
      {menuState ? (
        <MainMenu view={view} setView={setView} menuItems={menuItems} />
      ) : null}

      <div className="inner">
        {menuItems.map(item => (
          <VIEW name={item.name} view={view} key={item.name}>
            <>{item.component}</>
          </VIEW>
        ))}

        <Footer />
      </div>
    </main>
  );
}
