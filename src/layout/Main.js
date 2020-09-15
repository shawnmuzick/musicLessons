import React from 'react';
import './main.css';
import { viewState } from '../atoms';
import { useRecoilValue } from 'recoil';

export default function Main(props) {
	const view = useRecoilValue(viewState);
	return (
		<main className="main">
			<div className="inner">
				<>{props[[`${view}`]]}</>
			</div>
		</main>
	);
}
