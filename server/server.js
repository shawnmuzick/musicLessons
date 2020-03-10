import express from "express";
import router from './routes.js'
const app = express();
const staticFolder = express.static('build');
const img = express.static('public/img/faculty');
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true, limit:'50mb'}));
app.use('/',router)
app.use('/img', img);
app.use('/', staticFolder);

app.listen(5001, ()=>{console.log('Listening on Port 5001')});