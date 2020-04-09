const faker = require('faker');
const uuid = require('uuid/v4');
const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gallery'
});

for (var i = 0; i < 300; i++) {
    mysqlConnection.query('INSERT INTO user VALUES(?,?,?)', [uuid(), `${faker.name.findName()}`, `${faker.phone.phoneNumberFormat(1)}`], (err, result, fields) => {
        if (!err) {
            console.log('register successful', result.insertId);
        } else {
            console.log(err);
        }
    });
}