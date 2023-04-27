const {Sequelize, DataTypes} = require("sequelize");
const sequelize =require('./database').sequelize

const Amazon_articles_models = sequelize.define("artykuly3", { //table olx_articles
    Tytul: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Zdjecie: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    Ocena: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Ocena_w_gwiazdkach: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Dostawa: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Czy_darmowa_dostawa: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    Cena_oryginalna: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Cena_promocyjna: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cena_bez_zl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Ilosc_komentarzy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Ilosc_dostepnych: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'artykuly3',
    timestamps: false
});

sequelize.sync();

// sequelize.sync().then(() => {
//     console.log('Stworzono tabele artykuly_olx!');
// }).catch((error) => {
//     console.error('Nie można stworzyć tabeli : ', error);
// });

module.exports=Amazon_articles_models;