const app = require('./app');
const { createConnection } = require('./database');

//creacion de la base de datos en formato json
createConnection();


//escuchando el puerto 3000
app.listen(3000);
console.log('server on port ', 3000);