const {Sequelize, DataTypes} = require("sequelize");
const sequelize =require('./database').sequelize

const Amazon_articles_models = sequelize.define("artykuly3", { 
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
    Ocena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Ocena_w_gwiazdkach: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Dostawa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Czy_darmowa_dostawa: {
        type: DataTypes.STRING,
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

module.exports=Amazon_articles_models;