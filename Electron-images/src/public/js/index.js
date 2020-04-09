$(function() {
    const { getConnection } = require('../../database');
    const datos = getConnection().get('user').value();
    console.log(datos);
});