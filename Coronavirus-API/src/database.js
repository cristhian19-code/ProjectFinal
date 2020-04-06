const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapter = new FileAsync('db.json');
let db;

async function createConnection() {
    db = await low(adapter);
    db.defaults({ country: [], data: [] }).write();
}

const getConnection = () => db;
module.exports = {
    createConnection,
    getConnection,
}