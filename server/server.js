import express from "express";
import router from './routes.js'
const app = express();
const staticFolder = express.static('build');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/',router)
app.use('/', staticFolder);
app.listen(5001, ()=>{console.log('Listening on Port 5001')});