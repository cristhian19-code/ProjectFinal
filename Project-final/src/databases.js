const lowdb = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapter = new FileAsync('datos.json');

//variable para almacenar la conexion
let db;

//funcion para crear la db en formato json
async function createConnection() {
    db = await lowdb(adapter);
    db.defaults({ chat: [], user: [] }).write();
}

//funcion que retorna la variable db y reutizarlo
const getConnection = () => db;


//exportando las funciones
module.exports = {
    createConnection,
    getConnection
}