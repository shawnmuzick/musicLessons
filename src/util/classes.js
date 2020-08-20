const moment = require('moment');

class Person {
	constructor(_id, fname, lname, phone, email) {
		this._id = _id || '';
		this.fname = fname;
		this.lname = lname;
		this.phone = phone;
		this.email = email;
	}
	getFullName() {
		return `${this.fname} ${this.lname}`;
	}
}

class User extends Person {
	constructor({ _id, fname, lname, username, phone, email, password, role, studentAccounts, invoices }) {
		super(_id, fname, lname, phone, email);
		this.username = username;
		this.password = password;
		this.role = role;
		this.studentAccounts = studentAccounts;
		this.invoices = invoices;
	}
}

class Teacher extends Person {
	constructor({ _id, fname, lname, phone, email, hours, salary }) {
		super(_id, fname, lname, phone, email);
		this.hours = hours;
		this.text = fname;
		this.salary = salary;
	}
	lessonsPerMonth() {
		let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		return arr;
	}
	getConvRate() {
		return (this.trConv / (this.trConv + this.trFail)) * 100;
	}
	getGrossIncome() {
		return 0;
	}
	changeAvailability(hours) {
		let newHours = Object.keys(hours).map((key) => {
			return {
				daysOfWeek: [key],
				startTime: hours[key].startTime,
				endTime: hours[key].endTime,
			};
		});
		this.hours = newHours;
		//makes this chainable!
		return this;
	}
	checkAvailability(eventObject) {
		const time = moment.utc(eventObject.start).format('HH:mm');
		const day = moment.utc(eventObject.start).day();
		let isAvailable = false;
		this.hours.forEach((h) => {
			h.daysOfWeek.forEach((d) => {
				d = Number(d);
				if (d === day) {
					if (time >= h.startTime && time < h.endTime) {
						isAvailable = true;
					} else {
						isAvailable = false;
					}
				}
			});
		});
		return isAvailable;
	}
}

class Student extends Person {
	constructor({ _id, user_id, fname, lname, phone, email, tuition }) {
		super(_id, fname, lname, phone, email);
		this.account_id = user_id;
		this.tuition = tuition;
	}
}

class Lesson {
	constructor({
		_id,
		title,
		start,
		end,
		instrument,
		rate,
		isTrial,
		trialConverted,
		label_color,
		attendance_code,
		attendance_note,
		invoice_id,
		student_id,
		teacher_id,
	}) {
		this._id = _id;
		this.title = title;
		this.start = moment.utc(start).format();
		this.end = end ? moment.utc(end).format() : moment.utc(start).add(30, 'm').format();
		this.instrument = instrument;
		this.rate = rate;
		this.isTrial = isTrial;
		this.trialConverted = trialConverted;
		this.backgroundColor = label_color;
		this.borderColor = label_color;
		this.attendance_code = attendance_code;
		this.attendance_note = attendance_note;
		this.invoice_id = invoice_id;
		this.student_id = student_id;
		this.teacher_id = teacher_id;
	}
}

class Invoice {
	constructor(_id, date, account_id, items, total_sale, balance) {
		this._id = _id;
		this.date = date;
		this.account_id = account_id;
		this.items = items;
		this.total_sale = total_sale;
		this.balance = balance;
	}
}

export { Teacher, Student, Lesson, Invoice, User };
