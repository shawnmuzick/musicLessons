import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Form, InputGroup } from '../forms';
import { fetches } from '../util/';
import { viewState } from '../atoms';

export default function Register() {
	const setView = useSetRecoilState(viewState);
	const [values, setValues] = useState({});
	const handleChange = (e) => {
		const { name, value } = e.target;
		let obj = values;
		obj[name] = value;
		setValues(obj);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		fetches.postUserRegister(
			values.username,
			values.password,
			values.fname,
			values.lname
		)
			.then((data) => {
				if (data.status === 200) {
					setView('Login');
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="view" id="view_register">
			<Form title={'Register'} submitFn={handleSubmit}>
				<h2>Register</h2>
				<InputGroup>
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						name="username"
						value={values.username}
						onChange={handleChange}
					/>
				</InputGroup>
				<InputGroup>
					<label htmlFor="password">Password:</label>
					<input
						type="text"
						name="password"
						value={values.password}
						onChange={handleChange}
					/>
				</InputGroup>
				<InputGroup>
					<label htmlFor="fname">First Name:</label>
					<input
						type="text"
						name="fname"
						value={values.fname}
						onChange={handleChange}
					/>
				</InputGroup>
				<InputGroup>
					<label htmlFor="lname">Last Name:</label>
					<input
						type="text"
						name="lname"
						value={values.lname}
						onChange={handleChange}
					/>
				</InputGroup>
			</Form>
		</div>
	);
}
