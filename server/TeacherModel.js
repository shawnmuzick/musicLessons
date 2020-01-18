import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/lessons-app',{useNewUrlParser:true,useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () =>{console.log('Connected to MongoDB!')})
const Schema = mongoose.Schema;
const teacherSchema = new Schema({
    name: String,
    lname: String,
    id: String,
    phone: String,
    lessons: [],
    hours:[]
},{collection:'teachers'})
const teacherModel = mongoose.model('teacherModel',teacherSchema);
export default teacherModel;