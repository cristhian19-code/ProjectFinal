const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapater = new FileAsync('db.json');
let db;

async function createConnection() {
    db = await low(adapater);
    db.defaults({ Departamentos: [], CasosTotales: 0 }).write();
}

const getConnection = () => db;

module.exports = {
    createConnection,
    getConnection
}