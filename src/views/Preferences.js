import React from 'react';
import { useThemeUpdate, useTheme } from '../contexts/Contexts';

export default function Preferences() {
	const setTheme = useThemeUpdate();
	const theme = useTheme();

	const toggle_theme = (e) => {
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
