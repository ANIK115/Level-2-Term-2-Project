const express = require('express');
const app = express();

const cors = require('cors');


app.use(cors());
app.options('*',cors());
app.use(express.json());


//view engine set up
app.set('view engine','ejs');

// DO VERSIONING STUFFS HERE
app.use('/api',require('./routes/api'));

module.exports = app;