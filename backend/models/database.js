const ini = require('ini');
const fs = require('fs');
const config = ini.parse(fs.readFileSync('../config.ini','utf-8'));
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.mysql.database,
  config.mysql.user,
  config.mysql.password,
  {
    host: config.mysql.host,
    dialect: config.mysql.dialect,
    dialectModule: require('mysql2'),
    operationsAliases: false,
  }
);
 
sequelize.authenticate().then(() => {
  console.log('Nawiązano pomyślnie  połączenie do bazy MySQL.');
}).catch((error) => {
  console.error('Nie można połączyć się z bazą danych: ', error);
});

module.exports={sequelize};