import React, { useState, useEffect } from 'react';
import { Footer } from '../components';
import ViewContainer from './ViewContainer';
import { Calendar, Dashboard, Login, Logout, Register, Users, StudentRoster, Preferences } from '../views/';
import { fetches } from '../util/';
export default function Main({ setUser, setView, view }) {
	const [teachers, setTeachers] = useState([]);
	const [students, setStudents] = useState([]);
	useEffect(() => {
		fetches.getAll()
			.then((res) => {
				setTeachers(res[0]);
				setStudents(res[1]);
			})
			.catch((err) => console.log(err));
	}, [view]);
	useEffect(() => {
		fetches.init().then((res) => setUser(res.data));
	}, [setUser]);
	return (
		<main className="main">
			<div className="inner">
				<ViewContainer
					Calendar={
						<Calendar
							SRC={teachers}
							students={students}
							setStudents={setStudents}
						/>
					}
					Register={<Register setView={setView} />}
					Dashboard={<Dashboard teachers={teachers} students={students} />}
					Login={<Login setUser={setUser} setView={setView} />}
					Roster={<StudentRoster students={students} />}
					Users={<Users />}
					Logout={<Logout setUser={setUser} setView={setView} />}
					Preferences={<Preferences />}
					view={view}
				/>
				<Footer />
			</div>
		</main>
	);
}
