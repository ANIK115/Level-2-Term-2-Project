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
app.use(auth);


//view engine set up
app.set('view engine','ejs');

app.use(express.static('public')); 

// DO VERSIONING STUFFS HERE
app.use('/api',require('./routes/api'));

module.exports = app;