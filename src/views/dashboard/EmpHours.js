import React from 'react';
import moment from 'moment';
export default function EmpHours({ teacher }) {
	const renderHours = () => {
		return teacher.hours.map((item) => (
			<div key={`${teacher._id} ${item.daysOfWeek}`}>
				{item.daysOfWeek.map((i) => (
					<p key={`${teacher._id} ${i}`}>{`${moment()
						.day(i)
						.format('ddd')} - ${item.startTime} - ${
						item.endTime
					}`}</p>
				))}
			</div>
		));
	};
	if (!teacher.hours) return;
	return (
		<div className={'postedHours'}>
			<p>Posted Hours: </p>
			{renderHours()}
		</div>
	);
}
