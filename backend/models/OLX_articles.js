const {Sequelize, DataTypes} = require("sequelize");
const sequelize =require('./database').sequelize

const OLX_articles_models = sequelize.define("artykuly_olx", { //table olx_articles
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

sequelize.sync();

// sequelize.sync().then(() => {
//     console.log('Stworzono tabele artykuly_olx!');
// }).catch((error) => {
//     console.error('Nie można stworzyć tabeli : ', error);
// });

module.exports=OLX_articles_models;