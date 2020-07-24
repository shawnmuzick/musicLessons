import React from 'react';
import './notification.css';
export default function Notification({ type, children }) {
	if (type === null) return null;
	else return <div className={type}>{children}</div>;
}
