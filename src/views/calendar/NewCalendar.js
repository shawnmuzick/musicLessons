import React, { useEffect, useState } from 'react';
import { filters, fetches, Lesson, Invoice } from '../../util';
import { Header, Modal, Button } from '../../components';
import { FullCalendar, plugins } from './plugins';
import moment from 'moment';
import { DeleteLesson } from '../../forms';
import NewLessonModal from './NewLessonModal';
import './calendar.css';
import { userState, teachersState, studentsState, lessonsState } from '../../atoms';
import { useRecoilValue } from 'recoil';

export default function NewCalendar() {
	const calendarRef = React.createRef();
	const [selectedTeacher, setSelectedTeacher] = useState({});
	const [date, setDate] = useState('');
	const [events, setEvents] = useState([]);
	const [businessHours, setBusinessHours] = useState([]);
	const [open, setOpen] = useState(false);
	const [lessonModal, setLessonModal] = useState(false);
	const [currentEvent, setCurrentEvent] = useState({});
	const [formState, setFormState] = useState({
		student: '',
		instrument: '',
		isTrial: false,
	});

	const teachers = useRecoilValue(teachersState);
	const students = useRecoilValue(studentsState);
	const lessons = useRecoilValue(lessonsState);
	const user = useRecoilValue(userState);
	//rerender if lessons changes
	useEffect(() => {
		setEvents(lessons);
	}, [lessons]);

	useEffect(() => {
		if (!selectedTeacher._id) {
			setEvents(lessons);
		} else {
			setEvents(filters.lessonsByTeacher(lessons, selectedTeacher._id));
		}
	}, [selectedTeacher._id, lessons]);

	const handleModal = () => {
		setOpen(!open);
	};
	const calendar_event_put = (e, stID) => {
		fetches.putEvent(e, stID).catch((err) => console.log(err));
	};

	const calender_event_format = (edit) => {
		edit.event.rate = parseFloat(edit.event.extendedProps.rate);
		return new Lesson(edit.event);
	};
	const newDrop = (edit) => {
		const api = calendarRef.current.getApi();
		api.changeView('timeGridDay', edit.date);
		const stID = edit.event.extendedProps._id;
		const e = calender_event_format(edit);

		if (selectedTeacher.checkAvailability(e) === false)
			return window.alert(`Time is outside of ${selectedTeacher.fname}'s hours!`);
		calendar_event_put(e, stID);
	};
	const dateClick = (e) => {
		const api = calendarRef.current.getApi();
		if (api.view.type !== 'timeGridDay') {
			return api.changeView('timeGridDay', e.date);
		}
		setLessonModal(!lessonModal);
		setDate(moment.utc(e.dateStr).format(moment.HTML5_FMT.DATETIME_LOCAL));
	};
	const calendar_event_post = () => {
		const lesson = new Lesson({
			_id: '',
			title: `${formState.student.fname} ${formState.student.lname}'s ${formState.instrument} lesson`,
			start: formState.date,
			end: null,
			instrument: formState.instrument,
			rate: formState.student.tuition,
			isTrial: formState.isTrial,
			trialConverted: false,
			label_color: '',
			attendance_code: 'P',
			addendance_note: '',
			student_id: formState.student._id,
			teacher_id: selectedTeacher._id,
		});
		delete lesson._id;

		fetches.postEvent(lesson)
			.then((res) => console.log(res.data))
			.then((data) => {
				const invoice = new Invoice({
					_id: '',
					date: formState.date,
					account_id: user._id,
					items: [data._id],
					total_sale: data.rate,
					balance: data.rate,
				});
				fetches.postInvoice(invoice).catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	};

	const calendar_event_handle_click = (e) => {
		const { instrument, rate } = e.extendedProps;
		e.instrument = instrument;
		e.rate = rate;
		moment.utc(e.start).format();
		const v = new Lesson(e);
		handleModal();
		setCurrentEvent(v);
	};

	const handleTeacherFilter = (e) => {
		if (e.target.value === '') {
			setSelectedTeacher({});
			setBusinessHours([]);
		}
		for (let i = 0; i < teachers.length; i++) {
			if (teachers[i]._id === e.target.value) {
				setSelectedTeacher(teachers[i]);
			}
		}
		setEvents(filters.lessonsByTeacher(lessons, e.target.value));
		for (let i = 0; i < teachers.length; i++) {
			if (teachers[i]._id === e.target.value) {
				setBusinessHours(teachers[i].hours);
			}
		}
	};
	const renderTeachers = () => {
		return (
			<select
				name=""
				id=""
				onChange={(e) => handleTeacherFilter(e)}
				value={selectedTeacher._id}>
				<option value={''}>Select a Teacher:</option>
				{teachers.map((t) => {
					return (
						<option
							key={t._id}
							value={
								t._id
							}>{`${t.fname} ${t.lname}`}</option>
					);
				})}
			</select>
		);
	};

	return (
		<div className="view">
			<div className="teacherFilter">
				<h2>Select Your Teacher</h2>
				{renderTeachers()}
			</div>
			<FullCalendar
				dateClick={(e) => {
					dateClick(e);
				}}
				eventClick={(e) => calendar_event_handle_click(e.event)}
				eventDrop={(edit) => newDrop(edit)}
				eventResize={(edit) => newDrop(edit)}
				ref={calendarRef}
				headerToolbar={{
					left: 'prev,next,today',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay',
				}}
				plugins={plugins}
				events={events}
				droppable={true}
				businessHours={businessHours}
				dayMaxEventRows={3}
				eventDurationEditable={true}
				eventStartEditable={true}
				eventOverlap={false}
				editable={true}
				defaultAllDay={false}
				slotMinTime={'10:00:00'}
				slotMaxTime={'22:00:00'}
				timeZone={'UTC'}
				defaultTimedEventDuration={{ minutes: 30 }}
				height={'auto'}
			/>
			<NewLessonModal
				lessonModal={lessonModal}
				setLessonModal={setLessonModal}
				calendar_event_post={calendar_event_post}
				selectedTeacher={selectedTeacher}
				formState={formState}
				setFormState={setFormState}
				date={date}
				students={students}
				user={user}
			/>
			<Modal open={open} className={'modal'}>
				<div className={'modalWrapper'}>
					<Header>
						<img
							src={`${currentEvent.instrument}.jpg`}
							alt={`${currentEvent.instrument}`}
						/>
						<h2>{currentEvent.title}</h2>
						<Button name={'x'} fn={handleModal} />
					</Header>
					<DeleteLesson
						fn={fetches.deleteEventById}
						id={currentEvent.id}
					/>
				</div>
			</Modal>
		</div>
	);
}
