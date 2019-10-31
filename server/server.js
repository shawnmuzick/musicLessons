import express from "express";
const app = express();
const staticFolder = express.static('build');


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', staticFolder);
app.listen(5000, ()=>{console.log('Listening on Port 5000')});