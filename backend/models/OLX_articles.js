const {Sequelize, DataTypes} = require("sequelize");
const ini = require('ini');
const fs = require('fs');
const config = ini.parse(fs.readFileSync('../../config.ini','utf-8'));

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

const OLX_articles_models = sequelize.define("olx_articles", {
    Tytul: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Zdjecie: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Cena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Stan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Lokalizacja: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Obserwuj: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    tableName: 'artykuly_olx',
    timestamps: false
  });
// sequelize.sync().then(() => {
//     console.log('Definiujemy tabelę artykuly_olx!');
//  }).catch((error) => {
//     console.error('Unable to create table : ', error);
//  });
 module.exports=OLX_articles_models;