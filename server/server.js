import express from "express";
import router from './routes.js'

const app = express();

app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true, limit:'50mb'}));
app.use('/',router)
app.use('/', express.static('build')); 
app.use('/assets', express.static('public'));

app.listen(5001, ()=>{console.log('Listening on Port 5001')});