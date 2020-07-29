import React, { useState, useEffect } from 'react';
import { Main, AppHeader } from './layout/';
import { menu, adminMenu } from './views';
import { MainMenu, Footer } from './components';
import { ThemeContext } from './contexts/ThemeContext';
import { cookie, theme_settings } from './util';
import './App.css';
export default function App() {
	const [user, setUser] = useState();
	const [view, setView] = useState('Calendar');
	const [theme, setTheme] = useState('Dark');
	useEffect(() => {
		let browser_cookies = cookie.parse();
		if (browser_cookies.theme) {
			setTheme(browser_cookies.theme);
		} else {
			console.log('no theme found!');
		}
		const mainMenu = document.getElementById('MainMenu');
		mainMenu.classList.add('MainMenu-hide');
		if (theme === 'Light') {
			theme_settings.set_light();
		} else {
			theme_settings.set_dark();
		}
	}, [theme]);
	const renderMenu = () => {
		console.log(user);
		if (!user || user.role !== 'admin') {
			return <MainMenu view={view} setView={setView} menuItems={menu} />;
		} else {
			adminMenu[menu.indexOf('Login')] = 'Logout';
			return <MainMenu view={view} setView={setView} menuItems={adminMenu} />;
		}
	};
	return (
		<div className="App">
			{renderMenu()}
			<ThemeContext.Provider value={{ theme, setTheme }}>
				<AppHeader />
				<Main view={view} setUser={setUser} setView={setView} />
			</ThemeContext.Provider>
			<Footer />
		</div>
	);
}
