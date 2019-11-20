import React, {useState } from "react";
import "./App.css";
import { Header, Main } from "./components/components";

export default function App() {
  const [menuState, setMenu] = useState(true);
  return (
    <div className="App">
      <Header menuState={menuState} setMenu={setMenu}/>
        <Main menuState={menuState} />
    </div>
  );
}
