const mysql=require('mysql');
const Sequelize = require("sequelize");
const config = ini.parse(fs.readFileSync('../../config.ini','utf-8'));

// let connection = mysql.createConnection({
//     host: config.mysql.host,
//     user: config.mysql.user,
//     password: config.password,
//     database: config.mysql.database
// });

// connection.connect(function(err) {
//     if (err) {
//       return console.error('Błąd: ' + err.message);
//     }
//     console.log('Połączono z bazą danych MySQL!!!');
// });



const sequelize = new Sequelize(
 config.mysql.database,
 config.mysql.user,
 config.mysql.password,
  {
    host: config.mysql.host,
    dialect: 'mysql'
  }
);

sequelize.authenticate().then(() => {
  console.log('Ustanowiono połączenie do bazy.');
}).catch((error) => {
  console.error('Nie można połączyć się z bazą danych: ', error);
});