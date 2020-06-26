import React, { useEffect, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
export default function Preferences() {
    const { theme, setTheme } = useContext(ThemeContext);
    const toggle_theme = (e) => {
        setTheme(e.target.value);
    };
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
    return (
        <div>
            <h2>Preferences</h2>
            <p>Edit your preferences below:</p>
            <ul>
                <li>
                    Theme:
                    <select name="theme" id="theme" value={theme} onChange={toggle_theme}>
                        <option value="Dark">Dark</option>
                        <option value="Light">Light</option>
                    </select>
                </li>
            </ul>
        </div>
    );
}
