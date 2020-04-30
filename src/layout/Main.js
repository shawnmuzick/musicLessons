import React, { useState, useEffect } from "react";
import { MainMenu, Footer } from "../components";
import ViewContainer from "./ViewContainer";
import { Calendar, Dashboard, Login, Users, StudentRoster, menu, adminMenu } from "../views/";
import { fetches } from "../util/";
export default function Main({ menuState }) {
  const [view, setView] = useState("Calendar");
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState();
  useEffect(() => {
    fetches
      .getAll()
      .then((res) => {
        setTeachers(res[0]);
        setStudents(res[1]);
      })
      .catch((err) => console.log(err));
  }, [view]);
  const renderMenu = () => {
    console.log(user);
    if (!user || user.role !== "admin") {
      if (menuState) {
        return <MainMenu view={view} setView={setView} menuItems={menu} />;
      } else {
        return null;
      }
    } else {
      if (menuState) {
        return <MainMenu view={view} setView={setView} menuItems={adminMenu} />;
      } else {
        return null;
      }
    }
  };
  return (
    <main className="main">
      {renderMenu()}
      <div className="inner">
        <ViewContainer
          Calendar={<Calendar SRC={teachers} students={students} setStudents={setStudents} />}
          Dashboard={<Dashboard teachers={teachers} students={students} />}
          Login={<Login setUser={setUser} setView={setView} />}
          Roster={<StudentRoster students={students} />}
          Users={<Users />}
          view={view}
        />
        <Footer />
      </div>
    </main>
  );
}
