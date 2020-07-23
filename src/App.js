import React, { useState, useEffect } from 'react';
import { Main, AppHeader } from './layout/';
import { menu, adminMenu } from './views';
import { MainMenu } from './components';
import { ThemeContext } from './contexts/ThemeContext';
import './App.css';
export default function App() {
	const [user, setUser] = useState();
	const [view, setView] = useState('Calendar');
	const [theme, setTheme] = useState('Dark');
	if (document.cookie) {
		console.log(document.cookie);
	}
	useEffect(() => {
		const mainMenu = document.getElementById('MainMenu');
		mainMenu.classList.add('MainMenu-hide');
		if (theme === 'Light') {
			document.documentElement.style.setProperty('--ui-background-color', 'white');
			document.documentElement.style.setProperty('--ui-text-color', 'black');
			document.documentElement.style.setProperty('--main-background-color', '#eee');
			document.documentElement.style.setProperty('--main-text-color', 'black');
		} else {
			document.documentElement.style.setProperty('--ui-background-color', '');
			document.documentElement.style.setProperty('--ui-text-color', '');
			document.documentElement.style.setProperty('--main-background-color', '');
			document.documentElement.style.setProperty('--main-text-color', '');
		}
	});
	const renderMenu = () => {
		console.log(user);
		if (!user || user.role !== 'admin') {
			return <MainMenu view={view} setView={setView} menuItems={menu} />;
		} else {
			adminMenu[menu.indexOf('Login')] = 'Logout';
			return <MainMenu view={view} setView={setView} menuItems={adminMenu} />;
		}
	};
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
			{renderMenu()}
			<ThemeContext.Provider value={{ theme, setTheme }}>
				<AppHeader />
				<Main view={view} setUser={setUser} setView={setView} />
			</ThemeContext.Provider>
		</div>
	);
}
