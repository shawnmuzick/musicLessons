const express = require('express');
const app = express();
const path = require('path');
const static = express.static(path.join(__dirname, '../build'));


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', static);
app.listen(5000, ()=>{console.log('Listening on Port 5000')});