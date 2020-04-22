const mongoose = require('mongoose');

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
        lname: String,
        _id: String,
    },
    tuition: Number
},{collection:'students'})
const userSchema = new Schema({
    username: String,
    fname: String,
    lname: String,
    password: String
},{collection:'users'})

 const teacherModel = mongoose.model('teacherModel',teacherSchema);
 const studentModel = mongoose.model('studentModel', studentSchema);
 const userModel = mongoose.model('userSchema',userSchema);
 module.exports={
     teacherModel,studentModel,userModel
 }