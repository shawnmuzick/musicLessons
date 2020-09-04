import React, { useState, useEffect, useContext } from 'react';
import ViewContainer from './ViewContainer';
import {
	//Calendar,
	Dashboard,
	Login,
	Logout,
	Register,
	Users,
	StudentRoster,
	Preferences,
} from '../views/';
import { fetches, User } from '../util/';
import { UserContext } from '../contexts/Contexts';
import './main.css';
import { NewCalendar as Calendar } from '../views/NewCalendar';

export default function Main({ setView, view }) {
	const { user, setUser } = useContext(UserContext);
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

	return (
		<main className="main">
			<div className="inner">
				<ViewContainer
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
					Login={<Login setUser={setUser} setView={setView} />}
					Roster={<StudentRoster students={students} />}
					Users={<Users />}
					Logout={<Logout setUser={setUser} setView={setView} />}
					Preferences={<Preferences />}
					view={view}
				/>
			</div>
		</main>
	);
}
