const theme_settings = {
	set: (theme) => {
		if (theme === 'Light') {
			document.documentElement.style.setProperty('--ui-background-color', 'white');
			document.documentElement.style.setProperty('--ui-text-color', 'black');
			document.documentElement.style.setProperty('--main-background-color', '#eee');
			document.documentElement.style.setProperty('--main-text-color', 'black');
			document.documentElement.style.setProperty('--menu-toggle-button-color', 'black');
		} else if (theme === 'Dark') {
			document.documentElement.style.setProperty('--ui-background-color', '');
			document.documentElement.style.setProperty('--ui-text-color', '');
			document.documentElement.style.setProperty('--main-background-color', '');
			document.documentElement.style.setProperty('--main-text-color', '');
			document.documentElement.style.setProperty('--menu-toggle-button-color', '');
		}
	},
};
export { theme_settings };
