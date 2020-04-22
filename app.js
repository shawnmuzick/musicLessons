const express = require("express");
const apiRouter = require('./routes/apiRouter');
const router = require('./routes/routes');
const passport = require('passport');
const session = require('express-session');
const app = express();
const PORT = process.env.port || 5001;

//Passport config
require('./config/passport.js')(passport);

app.set('view engine','ejs');
app.set('views', 'server/views');
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api',apiRouter);
app.use('/',router);
app.use('/', express.static('build')); 
app.use('/assets', express.static('public'));

app.listen(PORT, ()=>{console.log(`Listening on Port ${PORT}`)});