import React, { useState, useEffect } from 'react';
import { Main, AppHeader } from './layout/';
import { MainMenu, Footer } from './components';
import { ThemeContext, UserContext } from './contexts/Contexts';
import { cookie, theme_settings, fetches, User } from './util';
import {
	NewCalendar as Calendar,
	Dashboard,
	Login,
	Logout,
	Register,
	Users,
	StudentRoster,
	Preferences,
	menu,
	adminMenu,
} from './views/';
import './App.css';

export default function App() {
	const [user, setUser] = useState({});
	const [view, setView] = useState('Calendar');
	const [theme, setTheme] = useState('Dark');

	const [teachers, setTeachers] = useState([]);
	const [students, setStudents] = useState([]);
	const [lessons, setLessons] = useState([]);

	useEffect(() => {
		fetches.init()
			.then((res) => {
				const u = new User(res.data);
				setUser(u);
			})
			.catch((err) => console.log(err));
	}, [setUser]);

	useEffect(() => {
		fetches.getAll()
			.then((res) => {
				setTeachers(res[0]);
				setStudents(res[1]);
				setLessons(res[2]);
			})
			.catch((err) => console.log(err));
	}, [view]);

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

	const hide_menu = () => {
		const mainMenu = document.getElementById('MainMenu');
		mainMenu.classList.add('MainMenu-hide');
	};

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
					<Main
						view={view}
						setView={setView}
						Calendar={
							<Calendar
								teachers={teachers}
								students={students}
								lessons={lessons}
								user={user}
							/>
						}
						Register={<Register setView={setView} />}
						Dashboard={
							<Dashboard
								teachers={teachers}
								students={students}
								lessons={lessons}
							/>
						}
						Login={
							<Login
								setUser={setUser}
								setView={setView}
							/>
						}
						Roster={<StudentRoster students={students} />}
						Users={<Users />}
						Logout={
							<Logout
								setUser={setUser}
								setView={setView}
							/>
						}
						Preferences={<Preferences />}
					/>
				</UserContext.Provider>
			</ThemeContext.Provider>
			<Footer />
		</div>
	);
}
