const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');


const auth = require('./middlewares/auth');


app.use(cors());
app.options('*',cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


//view engine set up
app.set('view engine','ejs');

app.use(express.static(__dirname + '/public')); 

// DO VERSIONING STUFFS HERE
app.use(auth.auth);
app.use(auth.spAuth);
app.use('/api',require('./routes/api/api'));


module.exports = app;