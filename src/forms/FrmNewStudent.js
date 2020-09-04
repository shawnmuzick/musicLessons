import React, { useState } from 'react';
import { Student } from '../util/';
import { Form, InputGroup } from '../forms/';

export default function FrmNewStudent({ handleClick, user }) {
	const [student, setStudent] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		const s = student;
		s[name] = value;
		setStudent(s);
	};
	const handleImg = (e) => {
		const s = student;
		let reader = new FileReader();
		reader.onload = function () {
			var b64 = reader.result.split(',')[1];
			s.img = b64;
		};
		reader.readAsDataURL(e.target.files[0]);
		setStudent(s);
	};
	const handleSubmit = (e) => {
		let img = student.img;
		const s = new Student(student);
		handleClick(s, img);
	};
	if (!user._id) {
		return <div>You must be logged in!</div>;
	} else {
		return (
			<Form submitFn={handleSubmit}>
				<InputGroup>
					<label htmlFor="img">Photo ID: </label>
					<input
						type="file"
						name="img"
						accept="image/jpeg"
						onChange={handleImg}
					/>
				</InputGroup>
				<InputGroup>
					<label htmlFor="fname">First Name: </label>
					<input type="text" name="fname" onChange={handleChange} />
				</InputGroup>
				<InputGroup>
					<label htmlFor="lname">Last Name: </label>
					<input type="text" name="lname" onChange={handleChange} />
				</InputGroup>
				<InputGroup>
					<label htmlFor="phone">Phone: </label>
					<input type="text" name="phone" onChange={handleChange} />
				</InputGroup>
				<InputGroup>
					<label htmlFor="email">Email: </label>
					<input type="text" name="phone" onChange={handleChange} />
				</InputGroup>
				<InputGroup>
					<label htmlFor="tuition">Tuition: </label>
					<input
						type="number"
						step="0.01"
						name="tuition"
						onChange={handleChange}
					/>
				</InputGroup>
			</Form>
		);
	}
}
