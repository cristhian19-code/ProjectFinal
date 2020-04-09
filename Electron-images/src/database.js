const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapter = new FileAsync('db.json');

let db = null;

const createConnection = async() => {
    db = await low(adapter);
    db.defaults({ user: [] }).write();
}

const getConnection = () => db;

module.exports = {
    createConnection,
    getConnection
}