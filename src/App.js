import React, { useState, useEffect } from "react";
import { Main, AppHeader } from "./layout/";
import { ThemeContext } from "./contexts/ThemeContext";
import "./App.css";
export default function App() {
    const [menuState, setMenu] = useState(true);
    const [theme, setTheme] = useState("Dark");
    if (document.cookie) {
        console.log(document.cookie);
    }
    useEffect(() => {
        if (theme === "Light") {
            document.documentElement.style.setProperty("--ui-background-color", "white");
            document.documentElement.style.setProperty("--ui-text-color", "black");
            document.documentElement.style.setProperty("--main-background-color", "#eee");
            document.documentElement.style.setProperty("--main-text-color", "black");
        } else {
            document.documentElement.style.setProperty("--ui-background-color", "");
            document.documentElement.style.setProperty("--ui-text-color", "");
            document.documentElement.style.setProperty("--main-background-color", "");
            document.documentElement.style.setProperty("--main-text-color", "");
        }
    });

    /*
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
    }*/
    return (
        <div className="App">
            <ThemeContext.Provider value={{ theme, setTheme }}>
                <AppHeader menuState={menuState} setMenu={setMenu} />
                <Main menuState={menuState} />
            </ThemeContext.Provider>
        </div>
    );
}
