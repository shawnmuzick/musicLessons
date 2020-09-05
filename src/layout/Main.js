import React from 'react';
import './main.css';
export default function Main(props) {
	return (
		<main className="main">
			<div className="inner">
				<>{props[props.view]}</>
			</div>
		</main>
	);
}
