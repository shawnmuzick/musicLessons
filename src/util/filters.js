const lessonsByTeacher = (lessons = [], teacher_id) => {
	return lessons.filter((l) => l.teacher_id === teacher_id);
};

const lessonsByStudent = (lessons = [], student) => {
	return lessons.filter((l) => l.student_id === student._id);
};

const lessonsByInstrument = (lessons = [], instrument) => {
	return lessons.filter((l) => l.instrument === instrument);
};

const lessonsByAttendanceCode = (lessons = [], code) => {
	return lessons.filter((l) => l.attendance_code === code);
};

const lessonsByMonth = () => {
	return;
};

const lessonsByYear = () => {
	return;
};

const studentsByInstrument = (arr, instrument) => {
	return arr.filter((s) => s.instrument === instrument.toLowerCase());
};

const studentsByTeacher = (lessons = [], teacher_id) => {
	let arr = lessonsByTeacher(lessons, teacher_id);
	let result = [...new Set(arr)];
	return result;
};

const studentsByAccount = () => {
	return;
};

const filters = {
	lessonsByStudent,
	lessonsByTeacher,
	lessonsByInstrument,
	lessonsByMonth,
	lessonsByYear,
	lessonsByAttendanceCode,
	studentsByTeacher,
	studentsByInstrument,
	studentsByAccount,
	search: (arr, filter, query, setState) => {
		return setState(arr.filter(filter(query)));
	},
	filterSearch: (query) => {
		if (!query || query === '') {
			return function (i) {
				return i;
			};
		}
		return function (s) {
			let found = false;
			const regex = new RegExp(`${query}`, 'gi');
			let fields = Object.entries(s).map((entry) => {
				if (typeof entry[1] === 'string') {
					return entry[1];
				}
				return null;
			});
			fields.forEach((f) => {
				if (typeof f !== 'string') {
					return;
				} else {
					if (f.match(regex) !== null) {
						found = true;
						return f;
					}
				}
			});
			return found;
		};
	},
};
export { filters };
