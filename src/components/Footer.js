import React from 'react';
import './footer.css';
export default function Footer() {
	const date = new Date();
	return <footer className="App-header">&#169; {date.getFullYear()}</footer>;
}
