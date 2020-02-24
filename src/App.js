import React, {useState } from "react";
import "./App.css";
import Main from './components/Main';
import Header from './components/Header';

export default function App() {
  const [menuState, setMenu] = useState(true);
  return (
    <div className="App">
      <Header menuState={menuState} setMenu={setMenu}/>
        <Main menuState={menuState} />
    </div>
  );
}
