import React from 'react';
import { Student, Teacher, Lesson } from './classes';
import { InputGroup } from '../forms/';
import { ListItem } from '../components/';
const maps = {
	makeStudents: (arr) => {
		return arr.map((s) => {
			return new Student(s);
		});
	},

	makeTeachers: (arr) => {
		return arr.map((t) => {
			return new Teacher(t);
		});
	},

	makeLessons: (arr) => {
		return arr.map((l) => {
			return new Lesson(l);
		});
	},

	iterateProps: (o) => {
		return Object.keys(o).map((key) => {
			if (key !== 'lessons') {
				return <p key={key}>{`${key}: ${o[key]}`}</p>;
			} else {
				return null;
			}
		});
	},

	renderCheckboxes: (list, state, handler) => {
		return list.map((i) => {
			return (
				<InputGroup>
					<input type="checkbox" name={i} id={i} value={state[i]} onChange={handler} />
					{i}
				</InputGroup>
			);
		});
	},

	renderProfile: (arr, props) => {
		return arr.map((s) => {
			return (
				<details>
					<summary>{`${s.fname} ${s.lname}`}</summary>
					<ListItem>
						<div className={'photoID'}>
							<img
								src={`/assets/img/students/${s._id}.jpg`}
								alt={`${s.fname}`}
							/>
						</div>
						<div className="student-details">{props(s)}</div>
					</ListItem>
				</details>
			);
		});
	},

	addTeacherLessons: (teacher, lessons) => {
		return;
	},
};
export { maps };
