import React, { useEffect, useState } from "react";
import "./App.css";
import { Header, Main } from "./components/components";
import { TeacherContext, teachers } from "./contexts/teachers";

export default function App() {
  const [menuOpen, setMenuState] = useState(true);
  const menuExpand = () => {
    setMenuState(!menuOpen);
  };
useEffect(() => {
fetch("http://localhost:5001/api/teachers")
.then(res => res.json())
.then(data=>console.log(data))
}, [])
  return (
    <div className="App">
      <Header menuState={menuOpen} menuExpand={menuExpand} />
      <TeacherContext.Provider value={teachers}>
        <Main menuState={menuOpen} />
      </TeacherContext.Provider>
    </div>
  );
}
