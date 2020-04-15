const express = require('express');
const path = require('path');
const ejs = require('ejs');
const morgan = require('morgan');
const app = express();

//Settings
app.set('port', 1000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Middleware

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

//Routes

app.use(require('./routes/routes'));

module.exports = app;