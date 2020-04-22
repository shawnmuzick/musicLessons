import React, { useState } from "react";
import "./App.css";
import { Main, AppHeader } from "./components/";

export default function App() {
  const [menuState, setMenu] = useState(true);
  return (
    <div className="App">
      <AppHeader menuState={menuState} setMenu={setMenu} />
      <Main menuState={menuState} />
    </div>
  );
}
