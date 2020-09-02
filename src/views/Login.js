import React, { useState } from 'react';
import { Form, InputGroup } from '../forms';
import { fetches } from '../util/';
import { Notification } from '../components';
export default function Login({ setUser, setView }) {
	const [values, setValues] = useState({});
	const [messageType, setMessageType] = useState(null);
	const [message, setMessage] = useState(null);
	const handleChange = (e) => {
		const { name, value } = e.target;
		let obj = values;
		obj[name] = value;
		setValues(obj);
	};
	const renderMessage = (type, message) => {
		setMessageType(type);
		setMessage(message);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		fetches.postUserLogin(values.username, values.password)
			.then((data) => {
				setUser(data);
				renderMessage(
					'success',
					'You have successfully logged in! Redirecting...'
				);
				setTimeout(() => {
					if (data.role === 'admin') {
						setView('Dashboard');
					} else {
						setView('Calendar');
					}
				}, 3000);
			})
			.catch((err) => {
				renderMessage('error', err.message);
				setValues({});
				document.getElementById('form-login').reset();
			});
	};
	return (
		<div className="view" id="view_login">
			<Notification type={messageType}>{message}</Notification>
			<Form title={'Login'} submitFn={handleSubmit} id={'form-login'}>
				<h2>Login</h2>
				<InputGroup>
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						name="username"
						onChange={handleChange}
					/>
				</InputGroup>
				<InputGroup>
					<label htmlFor="password">Password:</label>
					<input
						type="text"
						name="password"
						onChange={handleChange}
					/>
				</InputGroup>
			</Form>
		</div>
	);
}
