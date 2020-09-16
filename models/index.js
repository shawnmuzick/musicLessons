const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/lessons-app', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
	console.log('Connected to MongoDB!');
});

const Schema = mongoose.Schema;
const teacherSchema = new Schema(
	{
		fname: String,
		lname: String,
		phone: String,
		email: String,
		hours: Array,
		instruments: Array,
		salary: Number,
	},
	{ collection: 'teachers' }
);
const teacherModel = mongoose.model('teacherModel', teacherSchema);

const invoiceSchema = new Schema(
	{
		date: String,
		account_id: String,
		items: Array,
		total_sale: Number,
		balance: Number,
	},
	{ collection: 'invoices' }
);
const invoiceModel = mongoose.model('invoiceSchema', invoiceSchema);

const lessonSchema = new Schema(
	{
		title: String,
		start: String,
		end: String,
		instrument: String,
		rate: Number,
		isTrial: Boolean,
		trialConverted: Boolean,
		label_color: String,
		attendance_code: String,
		attendance_note: String,
		student_id: String,
		teacher_id: String,
	},
	{ collection: 'lessons' }
);
const lessonModel = mongoose.model('lessonSchema', lessonSchema);

const studentSchema = new Schema(
	{
		fname: String,
		lname: String,
		phone: String,
		email: String,
		tuition: Number,
		user_id: String,
	},
	{ collection: 'students' }
);
const studentModel = mongoose.model('studentModel', studentSchema);

const userSchema = new Schema(
	{
		fname: String,
		lname: String,
		username: String,
		phone: String,
		email: String,
		password: String,
		role: String,
		studentAccounts: Array,
		invoices: Array,
	},
	{ collection: 'users' }
);
const userModel = mongoose.model('userSchema', userSchema);

module.exports = {
	teacherModel,
	studentModel,
	userModel,
	lessonModel,
	invoiceModel,
};
