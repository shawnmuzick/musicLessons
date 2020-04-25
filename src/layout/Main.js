import React, { useState, useEffect } from "react";
import { MainMenu, Footer } from "../components";
import ViewContainer from "./ViewContainer";
import { Calendar, Dashboard, menuItems } from "../views/";
import { fetches } from "../util/";
export default function Main({ menuState }) {
  const [view, setView] = useState("Calendar");
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  useEffect(() => {
    fetches
      .getAll()
      .then((res) => {
        setTeachers(res[0]);
        setStudents(res[1]);
      })
      .catch((err) => console.log(err));
  }, [view]);
  return (
    <main className="main">
      {menuState ? <MainMenu view={view} setView={setView} menuItems={menuItems} /> : null}

      <div className="inner">
        <ViewContainer
          Calendar={<Calendar SRC={teachers} students={students} setStudents={setStudents} />}
          Dashboard={<Dashboard teachers={teachers} students={students} />}
          view={view}
        />
        <Footer />
      </div>
    </main>
  );
}
