import React, { useState, useEffect } from "react";
import axios from "axios";
import MainMenu from "./mainMenu/MainMenu";
import Footer from "./Footer";
import ViewContainer from "./views/ViewContainer";
import Dashboard from "./views/dashboard/Dashboard";
import Calendar from "./views/calendar/Calendar";
import { Teacher, Student } from "./views/classes";

export default function Main({ menuState }) {
  const [view, setView] = useState("Calendar");
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  useEffect(() => {
    axios
      .all([axios.get("/api/teachers"), axios.get("/api/students")])
      .then(
        axios.spread((...res) => {
          const a = res[0].data.map(t => {
            return new Teacher(t);
          });
          setTeachers(a);
          const b = res[1].data.map(s => {
            return new Student(s);
          });
          setStudents(b);
        })
      )
      .catch(err => console.log(err));
  }, [view]);
  return (
    <main className="main">
      {menuState ? <MainMenu view={view} setView={setView} /> : null}

      <div className="inner">
        <ViewContainer
          Calendar={<Calendar SRC={teachers} students={students} setStudents={setStudents}/>}
          Dashboard={<Dashboard teachers={teachers} students={students} />}
          view={view}
        />
        <Footer />
      </div>
    </main>
  );
}
