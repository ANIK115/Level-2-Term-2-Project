const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');


const auth = require('./middlewares/auth');
const errorHandling = require('./middlewares/errorHandling');


app.use(cors());
app.options('*',cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


//view engine set up
app.set('view engine','ejs');

app.use(express.static(__dirname + '/public')); 

// DO VERSIONING STUFFS HERE
// app.use(auth.auth);
// app.use(auth.spAuth);

app.use('/api',require('./routes/api/api'));
app.use('/providerapi', require('./routes/service_provider/api'));
app.use('/moderatorapi', require('./routes/moderator/api'));

app.use(errorHandling.notFound);
app.use(errorHandling.errorHandler);



module.exports = app;