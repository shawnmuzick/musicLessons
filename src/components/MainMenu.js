import React from 'react';
import { Button } from '.';
import { viewState } from '../atoms';
import { useSetRecoilState } from 'recoil';

import './mainMenu.css';
export default function MainMenu({ menuItems }) {
	const setView = useSetRecoilState(viewState);

	const renderMenu = () => {
		return menuItems.map((item) => <Button name={item} key={item} fn={setView} />);
	};
	const hideMenu = () => {
		const mainMenu = document.getElementById('MainMenu');
		mainMenu.classList.add('MainMenu-hide');
	};
	return (
		<div id="MainMenu">
			<div className="menuHeaderContainer">
				<h2>Main Menu</h2>
				<Button fn={hideMenu} name={'x'} />
			</div>
			{renderMenu()}
		</div>
	);
}
