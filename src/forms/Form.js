import React from 'react';
import { Button } from '../components/';
import './form.css';
export default function Form({ children, submitFn, key = '', id = '' }) {
	return (
		<form className={'form'} onSubmit={submitFn} key={key} id={id}>
			{children}
			<Button type="submit" name={'Submit'} />
		</form>
	);
}
