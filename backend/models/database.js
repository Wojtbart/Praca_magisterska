const mysql=require('mysql');
const config = ini.parse(fs.readFileSync('../../config.ini','utf-8'));

let connection = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.password,
    database: config.mysql.database
});

connection.connect(function(err) {
    if (err) {
      return console.error('Błąd: ' + err.message);
    }
    console.log('Połączono z bazą danych MySQL!!!');
});
