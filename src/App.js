import React, { useState } from "react";
import "./App.css";
import {Header, Main} from "./components/components";
function App() {
  const [menuOpen, setMenuState] = useState(true);
  const menuExpand = () => {
    setMenuState(!menuOpen);
  };
  return (
    <div className="App">
      <Header menuState={menuOpen} menuExpand={menuExpand} />
      <Main menuState={menuOpen} />
    </div>
  );
}

export default App;
