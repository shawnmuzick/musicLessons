import React, { useState, useEffect } from 'react';
import { Main, AppHeader } from './layout/';
import { menu, adminMenu } from './views';
import { MainMenu, Footer } from './components';
import { ThemeContext, UserContext } from './contexts/Contexts';
import { cookie, theme_settings } from './util';
import './App.css';
export default function App() {
	const [user, setUser] = useState({});
	const [view, setView] = useState('Calendar');
	const [theme, setTheme] = useState('Dark');
	const hide_menu = () => {
		const mainMenu = document.getElementById('MainMenu');
		mainMenu.classList.add('MainMenu-hide');
	};
	useEffect(() => {
		let browser_cookies = cookie.parse();
		if (browser_cookies.theme) {
			setTheme(browser_cookies.theme);
			theme_settings.set(browser_cookies.theme);
		}
	}, [theme]);
	useEffect(() => {
		hide_menu();
	}, [view]);
	const renderMenu = () => {
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
				<UserContext.Provider value={{ user, setUser }}>
					<AppHeader />
					<Main view={view} setView={setView} />
				</UserContext.Provider>
			</ThemeContext.Provider>
			<Footer />
		</div>
	);
}
