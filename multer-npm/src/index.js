const app = require('./app');
const { createConnection } = require('./database');

createConnection();
async function main() {
    await app.listen(app.get('port'));
    console.log('server on port ', app.get('port'));
}

main();