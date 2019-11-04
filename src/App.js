import React, {useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
function App() {
  const [menuState, setMenuState] = useState("-");
  const menuExpand = e => {
    let newState;
    switch (e.target.value) {
      case "+":
        newState = "-";
        break;
      default:
        newState = "+";
    }
    setMenuState(newState);
  };
  return (
    <div className="App">
      <Header menuState={menuState} menuExpand={menuExpand} />
      <Main menuState={menuState} />
    </div>
  );
}

export default App;
