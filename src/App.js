import React, { useState } from "react";
import { Main, AppHeader } from "./layout/";
import "./App.css";
export default function App() {
    const [menuState, setMenu] = useState(true);
    if (!document.cookie) {
        let today = new Date();
        let tomorrow = new Date(`${today.getFullYear()} ${today.getDate() + 1}`);
        console.log("current status:");
        console.log(document.cookie);
        console.log("no cookie present, setting cookie");
        document.cookie = `testCookie = This is a test; expires ${tomorrow}`;
        console.log("new status");
        console.log(document.cookie);
    } else {
        console.log("there was a cookie, here it is!");
        console.log(document.cookie);
    }
    return (
        <div className="App">
            <AppHeader menuState={menuState} setMenu={setMenu} />
            <Main menuState={menuState} />
        </div>
    );
}
