import React from 'react';
import { Modal, Button, Header } from '../../components';
import { Form, InputGroup } from '../../forms';
export default function NewLessonModal({
	lessonModal,
	setLessonModal,
	calendar_event_post,
	selectedTeacher,
	formState,
	setFormState,
	date,
	students,
	user,
}) {
	const handleNewLessonModal = () => {
		setLessonModal(!lessonModal);
	};
	const handleStudentFilter = (e) => {
		if (e.target.value === '') {
			let obj = { ...formState };
			obj.student = '';
			setFormState(obj);
		}

		for (let i = 0; i < students.length; i++) {
			if (students[i]._id === e.target.value) {
				let obj = { ...formState };
				obj.student = students[i];
				setFormState(obj);
			}
		}
	};
	return (
		<Modal open={lessonModal} className={'modal'}>
			<div className="modalWrapper">
				<Header>
					<h2>Book a Lesson</h2>
					<Button name={'x'} fn={handleNewLessonModal} />
				</Header>
				<Form submitFn={calendar_event_post} id="bookingForm">
					<InputGroup>
						<label htmlFor="date">Date/Time:</label>
						<p>{`${date}`}</p>
					</InputGroup>
					<InputGroup>
						<label htmlFor="teacher">Teacher:</label>
						<p>{`${
							selectedTeacher.fname ||
							'Please Select a Teacher'
						} ${selectedTeacher.lname || ''}`}</p>
					</InputGroup>
					<InputGroup>
						<label htmlFor="student">Student:</label>
						<select
							name="student"
							id="student"
							value={formState.student._id}
							onChange={handleStudentFilter}>
							<option value="">Select a student</option>
							{students
								.filter(
									(s) =>
										s.account_id ===
										user._id
								)
								.map((s) => {
									return (
										<option
											key={s._id}
											value={
												s._id
											}>{`${s.fname} ${s.lname}`}</option>
									);
								})}
						</select>
					</InputGroup>
				</Form>
			</div>
		</Modal>
	);
}