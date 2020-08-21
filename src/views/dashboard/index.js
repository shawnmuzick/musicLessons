import React from 'react';
import EmpDetails from './EmpDetails';
import { FrmNewTeacher } from '../../forms/';
import { LessonsPerInstructor, StuIns, TConvIns, Charts, LessonsPerMonth } from '../../charts';
import { Header, Modal } from '../../components/';
import { fetches, filters } from '../../util/';
export default function DashboardView({ teachers, students, lessons }) {
	const getTotalLessons = (lessons = []) => {
		return lessons.length;
	};

	const getTotalNetIncome = (lessons = [], teachers = []) => {
		return teachers.reduce((total, t) => {
			return (
				total +
				filters.lessonsByTeacher(lessons, t._id).reduce((teacherTotal, l) => {
					return teacherTotal + l.rate - t.salary;
				}, 0)
			);
		}, 0);
	};

	const getTotalGrossIncome = (lessons = [], teachers = []) => {
		return teachers.reduce((total, t) => {
			return (
				total +
				filters.lessonsByTeacher(lessons, t._id).reduce((teacherTotal, l) => {
					return teacherTotal + l.rate;
				}, 0)
			);
		}, 0);
	};

	const getConversionRate = (lessons = []) => {
		return filters.conversionsTotal(lessons);
	};

	const handleClick = (t, img) => {
		if (t.name === null || t.phone === null) return;
		t.img = img;
		fetches.postTeacher(t);
	};

	const renderEmployees = () => {
		return teachers.map((teacher) => <EmpDetails key={teacher._id} teacher={teacher} />);
	};

	return (
		<div className={'view'} id="view_dashboard">
			<Header>
				<h2>Dashboard</h2>
				<div className="dashHeader">
					<h3>Total Lessons: {getTotalLessons(lessons)}</h3>
					<h3>Total Students: {students.length}</h3>
					<h3>Conversion Rate: {getConversionRate(lessons)}%</h3>
					<h3>Gross Income: ${Math.round(getTotalGrossIncome(lessons, teachers))}</h3>
					<h3>Profit: ${Math.round(getTotalNetIncome(lessons, teachers))}</h3>
				</div>
			</Header>
			<div className="wrapper">
				<Charts>
					<LessonsPerInstructor teachers={teachers} lessons={lessons} />
					<LessonsPerMonth lessons={lessons} />
					<StuIns teachers={teachers} lessons={lessons} students={students} />
					<TConvIns teachers={teachers} lessons={lessons} students={students} />
				</Charts>
				<div className={'forms'}>
					<h3>Faculty</h3>
					{renderEmployees()}
				</div>
			</div>
			<Modal headerTxt={'Enter New Teacher'} btnTxt={'Enter New Teacher'} managed={true}>
				<FrmNewTeacher handleClick={handleClick} />
			</Modal>
		</div>
	);
}
