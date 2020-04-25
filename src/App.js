import React, { useState } from "react";
import { Main, AppHeader } from "./layout/";
import "./App.css";
export default function App() {
  const [menuState, setMenu] = useState(true);
  return (
    <div className="App">
      <AppHeader menuState={menuState} setMenu={setMenu} />
      <Main menuState={menuState} />
    </div>
  );
}
