import React, { useState, useEffect } from "react";
import { MainMenu, Footer } from "../components";
import ViewContainer from "./ViewContainer";
import { Calendar, Dashboard, Login, Logout, Users, StudentRoster, menu, adminMenu, Preferences } from "../views/";
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
    if (!menuState) return null;
    if (!user || user.role !== "admin") {
      return <MainMenu view={view} setView={setView} menuItems={menu} />;
    } else {
      adminMenu[menu.indexOf("Login")] = "Logout";
      return <MainMenu view={view} setView={setView} menuItems={adminMenu} />;
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
          Logout={<Logout setUser={setUser} setView={setView} />}
          Preferences={<Preferences />}
          view={view}
        />
        <Footer />
      </div>
    </main>
  );
}
