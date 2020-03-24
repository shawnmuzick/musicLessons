import express from "express";
import router from './routes.js'

const app = express();
const PORT = process.env.port || 5001;

app.set('view engine','ejs');
app.set('views', 'server/views');

app.use('/',router)
app.use('/', express.static('build')); 
app.use('/assets', express.static('public'));

app.listen(PORT, ()=>{console.log(`Listening on Port ${PORT}`)});