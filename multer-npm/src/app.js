const express = require('express');
const morgan = require('morgan');
const path = require('path');
const swig = require('swig');
const app = express();

app.set('port', 3000);
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes/routes'));
module.exports = app;