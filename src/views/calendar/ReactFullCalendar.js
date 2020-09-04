import React, { useState } from 'react';
import { FullCalendar, plugins } from './plugins';
import { Teacher, Lesson, fetches } from '../../util/';
import { Button, Header, Modal } from '../../components/';
import moment from 'moment';
import DeleteLesson from '../../forms/DeleteLesson';
export default function ReactFullCalendar({
	calendarRef,
	teacher,
	setTeacher,
	makeButtons,
	header,
	footer,
	lessons,
}) {
	const [open, setOpen] = useState(false);
	const [currentEvent, setCurrentEvent] = useState({});
	// const dayStart = "10:00:00";
	//const dayEnd = "22:00:00";
	const handleModal = () => {
		setOpen(!open);
	};
	const changeView = (args) => {
		const api = calendarRef.current.getApi();
		if (api.view.type !== 'timeGridDay')
			return api.changeView('timeGridDay', args.date);
	};
	//use to refetch teacher and rerender after posts/updates to make them immediately visible
	const getTeacher = () => {
		fetches.getTeacherById(teacher._id)
			.then((res) => {
				const t = new Teacher(res.data);
				setTeacher(t);
			})
			.catch((err) => console.log(err));
	};
	const calendar_event_post_edit = (e, stID) => {
		fetches.putEvent(e, stID).catch((err) => console.log(err));
		getTeacher();
	};
	const calendar_event_post_new = (e, stID) => {
		fetches.postEvent(e, stID).catch((err) => console.log(err));
		getTeacher();
	};
	const calendar_event_handle_click = (e) => {
		const { instrument, icon, rate } = e.extendedProps;
		e.instrument = instrument;
		e.icon = icon;
		e.rate = rate;
		moment.utc(e.start).format();
		const v = new Lesson(e);
		handleModal();
		setCurrentEvent(v);
	};
	const calendar_event_create_new = (edit) => {
		edit.title = edit.draggedEl.title;
		edit.rate = parseFloat(edit.draggedEl.attributes[4].value);
		edit.start = edit.date;
		return new Lesson(edit);
	};
	const calender_event_edit = (edit) => {
		edit.event.rate = parseFloat(edit.event.extendedProps.rate);
		return new Lesson(edit.event);
	};
	const newDrop = (edit) => {
		const api = calendarRef.current.getApi();
		let e, stID;
		api.changeView('timeGridDay', edit.date);
		//if the source is an externally dragged in event
		if (edit.draggedEl) {
			stID = edit.draggedEl.id;
			e = calendar_event_create_new(edit);
		} else {
			stID = edit.event.extendedProps._id;
			e = calender_event_edit(edit);
		}
		if (teacher.checkAvailability(e) === false)
			return window.alert(`Time is outside of ${teacher.fname}'s hours!`);
		if (edit.draggedEl) {
			calendar_event_post_new(e, stID);
		} else {
			calendar_event_post_edit(e, stID);
		}
	};
	return (
		<>
			<FullCalendar
				customButtons={makeButtons}
				dateClick={(args) => changeView(args)}
				eventClick={(e) => calendar_event_handle_click(e.event)}
				//changeView={(args) => changeView(args)}
				eventDrop={(edit) => newDrop(edit)}
				drop={(edit) => newDrop(edit)}
				eventResize={(edit) => newDrop(edit)}
				ref={calendarRef}
				footerToolbar={footer}
				headerToolbar={header}
				plugins={plugins}
				events={lessons}
				droppable={true}
				businessHours={teacher.hours}
				dayMaxEventRows={3}
				eventDurationEditable={true}
				eventStartEditable={true}
				eventOverlap={false}
				editable={true}
				defaultAllDay={false}
				// minTime={dayStart}
				// maxTime={dayEnd}
				timeZone={'UTC'}
				defaultTimedEventDuration={{ minutes: 30 }}
				height={'auto'}
			/>
			<Modal open={open} className={'modal'}>
				<div className={'modalWrapper'}>
					<Header>
						<img
							src={`${currentEvent.icon}.jpg`}
							alt={`${currentEvent.title}`}
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
		</>
	);
}
