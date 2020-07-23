import React from 'react';
import { Header } from '../components/';
import icon from '../icons/menu-24px.svg';
export default function AppHeader() {
	const showMenu = () => {
		const mainMenu = document.getElementById('MainMenu');
		mainMenu.classList.remove('MainMenu-hide');
	};
	return (
		<Header>
			<div id="App-header-wrapper">
				<button id="MainMenuIconWrapper" onClick={() => showMenu()}>
					<img id="MainMenuIcon" src={icon} alt="" />
				</button>
				<h1>Music Lessons</h1>
			</div>
		</Header>
	);
}
