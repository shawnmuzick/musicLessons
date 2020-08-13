import React, { useEffect, useState, useMemo } from 'react';
import { filters } from '../../util';
import { Header } from '../../components/';
import ReactFullCalendar from './ReactFullCalendar';
import StuCont from './stuCont';
import './calendar.css';
export default function Calendar({ SRC, students, lessons }) {
	const calendarRef = React.createRef();
	const [teacher, setTeacher] = useState({});
	const [events, setEvents] = useState([]);
	const header = {
		left: 'prev,next, today',
		center: 'title',
		right: 'dayGridMonth,timeGridWeek,timeGridDay',
	};

	const footer = {};
	footer.center = useMemo(() => {
		let string = 'All,';
		SRC.forEach((t) => {
			string += `${t.lname},`;
		});
		//remove ending comma, would otherwise generate an empty right side button
		if (string) {
			string = string.slice(0, -1);
		}
		return string;
	}, [SRC]);

	//rerender if lessons changes
	useEffect(() => {
		setEvents(lessons);
	}, [lessons]);

	useEffect(() => {
		if (!teacher._id) {
			setEvents(lessons);
			console.log('empty teacher check');
		} else {
			console.log('defined teacher check');
			setEvents(filters.lessonsByTeacher(lessons, teacher));
		}
	}, [teacher, lessons]);

	const makeButtons = useMemo(() => {
		//This links students and their teachers
		let obj = SRC.reduce((obj, t) => {
			obj[t.lname] = t;
			t.click = function () {
				setTeacher(t);
			};
			return obj;
		}, {});
		obj.All = {
			text: 'All',
			click: function () {
				setTeacher({});
			},
		};
		return obj;
	}, [SRC]);

	const renderHeader = () => {
		return (
			<div className="calendarHeader">
				{teacher._id ? (
					<>
						<img
							src={`/assets/img/faculty/${teacher._id}.jpg`}
							alt={`${teacher.fname} ${teacher.lname}`}
						/>
						<h1>{`${teacher.fname} ${teacher.lname}`}</h1>
					</>
				) : (
					<>
						<br />
						<h1 style={{ margin: 'auto' }}>Welcome</h1>
					</>
				)}
			</div>
		);
	};

	return (
		<div className="view">
			<Header>{renderHeader()}</Header>
			<div className="wrapper" id="CalendarWrap">
				<StuCont
					students={students}
					lessons={lessons}
					teacher={teacher}
					setTeacher={setTeacher}
				/>
				<div className="spacer" />
				<ReactFullCalendar
					calendarRef={calendarRef}
					teacher={teacher}
					setTeacher={setTeacher}
					lessons={events}
					makeButtons={makeButtons}
					header={header}
					footer={footer}
				/>
			</div>
		</div>
	);
}
