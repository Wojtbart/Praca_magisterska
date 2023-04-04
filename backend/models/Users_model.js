const {Sequelize, DataTypes} = require("sequelize");
const ini = require('ini');
const fs = require('fs');
const config = ini.parse(fs.readFileSync('../config.ini','utf-8'));

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
    console.log('Ustanowiono połączenie do bazy w USersach.');
}).catch((error) => {
    console.error('Nie można połączyć się z bazą danych: ', error);
});

const Users_models = sequelize.define("users", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    tableName: 'users',
    timestamps: false
  });
// sequelize.sync().then(() => {
//     console.log('Definiujemy tabelę artykuly_olx!');
//  }).catch((error) => {
//     console.error('Unable to create table : ', error);
//  });
 module.exports=Users_models;