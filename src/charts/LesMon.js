import React from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
//Lessons by Instructor
export default function LessonsPerMonth({ lessons }) {
	let arr = [];

	for (let i = 0; i < 12; i++) {
		arr[i] = {
			name: moment().month(i).format('MMM'),
			value: 0,
		};
	}

	//check lessons and log add increment the month's value where match
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < lessons.length; j++) {
			if (moment(lessons[j].start).format('MMM') === arr[i].name) {
				arr[i].value++;
			}
		}
	}

	let data = {
		labels: arr.map((m) => {
			return m.name;
		}),
		datasets: [
			{
				label: '2020',
				data: arr.map((m) => {
					return m.value;
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
			text: 'Lessons per Month',
			display: true,
		},
		responsive: true,
		maintainAspectRatio: false,
	};

	return (
		<div className="chartWrap">
			<Line data={data} options={options} />
		</div>
	);
}
