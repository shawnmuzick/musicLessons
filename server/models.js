import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/lessons-app',{useNewUrlParser:true,useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () =>{console.log('Connected to MongoDB!')})
const Schema = mongoose.Schema;
const teacherSchema = new Schema({
    fname: String,
    lname: String,
    id: String,
    phone: String,
    lessons: [],
    hours:[],
    salary: Number
},{collection:'teachers'})
const studentSchema = new Schema({
    fname: String,
    lname: String,
    phone: String,
    img: String,
    trial:{
        trDate: String,
        trConv: Boolean,
        trConvF: String
    },
    lessons: [],
    instrument: String,
    teacher: {
        name: String,
        lname: String
    },
    tuition: Number
},{collection:'students'})
export const teacherModel = mongoose.model('teacherModel',teacherSchema);
export const studentModel = mongoose.model('studentModel', studentSchema)