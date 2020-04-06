const app = require('./app');
const { createConnection } = require('./database');

createConnection();

function main() {
    app.listen(app.get('port'));
    console.log('server on port ', app.get('port'));
}

main()