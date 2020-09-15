import React, { useEffect } from 'react';
import { Main, AppHeader } from './layout/';
import { MainMenu, Footer } from './components';
import { ThemeProvider } from './contexts/Contexts';
import { fetches, User } from './util';
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
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, teachersState, studentsState, lessonsState, viewState } from './atoms';

export default function App() {
	const view = useRecoilValue(viewState);
	const setTeachers = useSetRecoilState(teachersState);
	const setStudents = useSetRecoilState(studentsState);
	const setLessons = useSetRecoilState(lessonsState);
	const [user, setUser] = useRecoilState(userState);

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
	}, [view, setLessons, setStudents, setTeachers]);

	useEffect(() => {
		hide_menu();
	}, [view]);

	const hide_menu = () => {
		const mainMenu = document.getElementById('MainMenu');
		mainMenu.classList.add('MainMenu-hide');
	};

	const renderMenu = () => {
		if (!user || user.role !== 'admin') {
			return <MainMenu menuItems={menu} />;
		} else {
			adminMenu[menu.indexOf('Login')] = 'Logout';
			return <MainMenu menuItems={adminMenu} />;
		}
	};
	return (
		<div className="App">
			{renderMenu()}
			<ThemeProvider>
				<AppHeader />
				<Main
					Calendar={<Calendar />}
					Register={<Register />}
					Dashboard={<Dashboard />}
					Login={<Login />}
					Roster={<StudentRoster />}
					Users={<Users />}
					Logout={<Logout />}
					Preferences={<Preferences />}
				/>
			</ThemeProvider>
			<Footer />
		</div>
	);
}
