const express = require('express');
const app = express();

const cors = require('cors');


app.use(cors());
app.options('*',cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//view engine set up
app.set('view engine','ejs');

app.use(express.static('public')); 

// DO VERSIONING STUFFS HERE
app.use('/api',require('./routes/api'));

module.exports = app;