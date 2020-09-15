import React, { useContext, createContext, useState } from 'react';
import { theme_settings, cookie } from '../util/';

export const ThemeContext = createContext();
export const ThemeUpdateContext = createContext();

export function useTheme() {
	return useContext(ThemeContext);
}

export function useThemeUpdate() {
	return useContext(ThemeUpdateContext);
}

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState('Dark');
	let browser_cookies = cookie.parse();

	if (browser_cookies.theme && browser_cookies.theme !== theme) {
		updateTheme(browser_cookies.theme);
		theme_settings.set(browser_cookies.theme);
	}

	function updateTheme(t) {
		console.log(t);
		setTheme(t);
		cookie.set('theme', t);
		theme_settings.set(t);
	}

	return (
		<ThemeContext.Provider value={theme}>
			<ThemeUpdateContext.Provider value={updateTheme}>
				{children}
			</ThemeUpdateContext.Provider>
		</ThemeContext.Provider>
	);
}
