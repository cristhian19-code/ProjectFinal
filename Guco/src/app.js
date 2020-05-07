const express = require('express');
const morgan = require('morgan');
const path = require('path');
const swig = require('swig');
const app = express();

//Setting
app.set('port', 3000);
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
swig.setDefaults({
    cache: false
})

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

//Routes
app.use(require('./routes/routes'));
app.use(express.static(path.join(__dirname, 'public')));
module.exports = app;