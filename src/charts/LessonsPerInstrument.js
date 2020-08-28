import React from 'react';
import { Pie } from 'react-chartjs-2';
import { filters } from '../util';
import { instrumentList } from '../forms/instrumentList';

//Lessons by Instructor
export default function LessonsPerInstrument({ lessons }) {
	let data = {
		labels: instrumentList,
		datasets: [
			{
				data: instrumentList.map((i) => {
					return filters.lessonsByInstrument(lessons, i).length;
				}),

				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
			},
		],
	};
	let options = {
		legend: {
			position: 'bottom',
		},

		title: {
			text: 'Distribution of Students by Instructor',
			display: true,
		},

		responsive: true,
		maintainAspectRatio: false,
	};
	return (
		<div className="chartWrap">
			<Pie data={data} options={options} />
		</div>
	);
}
