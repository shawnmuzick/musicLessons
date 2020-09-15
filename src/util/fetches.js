import axios from 'axios';
import { maps } from './maps';
const fetches = {
	//get all students and teachers
	getAll: () => {
		return axios
			.all([
				axios.get('/api/teachers'),
				axios.get('/api/students'),
				axios.get('/api/lessons'),
			])
			.then(
				axios.spread((...res) => {
					const a = maps.makeTeachers(res[0].data);
					const b = maps.makeStudents(res[1].data);
					const c = maps.makeLessons(res[2].data);
					return [a, b, c];
				})
			);
	},

	//student functions
	getStudents: async () => {
		const res = await axios.get('/api/students');
		return maps.makeStudents(res.data);
	},

	getStudentById: async (id) => {
		try {
			return axios.get(`/api/students${id}`);
		} catch (err) {
			return console.log(err);
		}
	},

	postStudent: (s, img) => {
		axios.post(`/api/students`, { s, img }).catch((err) => console.log(err));
	},

	putStudent: (s) => {
		//placeholder
	},

	deleteStudentById: async (id) => {
		try {
			return axios.delete(`/api/students${id}`);
		} catch (err) {
			return console.log(err);
		}
	},

	//teacher functions
	getTeachers: async () => {
		const res = await axios.get('/api/teachers');
		return maps.makeTeachers(res.data);
	},

	getTeacherById: (id) => {
		return axios.get(`/api/teachers${id}`);
	},

	postTeacher: async (teacher, img) => {
		try {
			return axios.post(`/api/teachers`, { teacher, img });
		} catch (err) {
			return console.log(err);
		}
	},

	putTeacherById: async (teacher) => {
		try {
			const res = await axios.put(`/api/teachers${teacher._id}`, {
				phone: teacher.phone,
				hours: teacher.hours,
			});
			return console.log(res);
		} catch (err) {
			return console.log(err);
		}
	},

	deleteTeacherById: async (id) => {
		try {
			return axios.delete(`/api/teachers${id}`);
		} catch (err) {
			return console.log(err);
		}
	},

	//event functions
	getEvents: () => {
		return axios.get('/api/lessons');
	},

	getEventById: (id) => {
		return axios.get(`/api/lessons${id}`);
	},

	postEvent: (lesson) => {
		return axios.post(`/api/lessons`, { lesson });
	},

	putEvent: (lesson) => {
		return axios.put(`/api/lessons`, { lesson });
	},

	//invoice functions
	getInvoices: () => {
		return axios.get('/api/invoices');
	},

	getinvoiceById: (id) => {
		return axios.get(`/api/invoices${id}`);
	},

	postInvoice: (invoice) => {
		return axios.post(`/api/invoices`, { invoice });
	},

	putInvoice: (invoice) => {
		return axios.put(`/api/invoices`, { invoice });
	},
	deleteInvoiceById: (id) => {
		return axios.delete(`/api/invoices${id}`);
	},

	//user functions
	init: () => {
		return axios.get('/api/init');
	},

	getUsers: () => {
		console.log('requested users');
		return axios.get('/api/users');
	},

	postUserRegister: async (username, password, fname, lname) => {},

	postUserLogin: async (username, password) => {
		try {
			const res = await axios.post('/login', {
				username,
				password,
			});
			return res.data;
		} catch (err) {
			throw err;
		}
	},
};
export { fetches };
