const express = require('express');
const path = require('path');
const morgan = require('morgan');
const swig = require('swig');
const app = express();
//Setting

app.set('port', 2000);
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

//Middleware

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

//Routes

app.use(require('./routes/routes'));
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;