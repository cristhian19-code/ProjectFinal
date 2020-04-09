const express = require('express');
const morgan = require('morgan');
const swig = require('swig');
const path = require('path');
const app = express();

//Setting
app.set('port', process.env.PORT || 4000)
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use(require('./routes/routes'));
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});