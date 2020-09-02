import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/Contexts';
import { cookie } from '../util';
export default function Preferences() {
	const { theme, setTheme } = useContext(ThemeContext);
	const toggle_theme = (e) => {
		cookie.set('theme', e.target.value);
		setTheme(e.target.value);
	};
	return (
		<div className={'view'} id={'view_preferences'}>
			<h2>Preferences</h2>
			<p>Edit your preferences below:</p>
			<div className="inputGroup">
				Theme:
				<select
					name="theme"
					id="theme"
					value={theme}
					onChange={toggle_theme}>
					<option value="Dark">Dark</option>
					<option value="Light">Light</option>
				</select>
			</div>
		</div>
	);
}
