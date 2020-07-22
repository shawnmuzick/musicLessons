import React from 'react';
import { Button } from '.';
import './mainMenu.css';
export default function MainMenu({ setView, menuItems, setMenu, menuState }) {
	const renderMenu = () => {
		return menuItems.map((item) => <Button name={item} key={item} fn={setView} />);
	};
	return (
		<div id="MainMenu">
			<div className="menuHeaderContainer">
				<h2>Main Menu</h2>
				<Button fn={setMenu} name={'x'} value={!menuState} />
			</div>
			{renderMenu()}
		</div>
	);
}
