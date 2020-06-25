import React from "react";
export default function Preferences() {
    return (
        <div>
            <h2>Preferences</h2>
            <p>Edit your preferences below:</p>
            <ul>
                <li>
                    Theme:
                    <select name="theme" id="theme">
                        <option value="Dark">Dark</option>
                        <option value="Light">Light</option>
                    </select>
                </li>
            </ul>
        </div>
    );
}
