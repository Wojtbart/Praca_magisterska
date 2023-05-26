const {Sequelize, DataTypes} = require("sequelize");
const sequelize =require('./database').sequelize

const Amazon_articles_models = sequelize.define("artykuly_amazon", { 
    Tytul: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Link: {
        type: DataTypes.STRING(1000),
        allowNull: true
    },
    Zdjecie: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    Ocena: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    Ocena_w_gwiazdkach: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    Dostawa: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    Czy_darmowa_dostawa: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    Cena_oryginalna: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    Cena_promocyjna: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    cena_bez_zl: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    Ilosc_komentarzy: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    Ilosc_dostepnych: {
        type: DataTypes.STRING(500),
        allowNull: true
    }
},{
    tableName: 'artykuly_amazon',
    timestamps: false
});

module.exports=Amazon_articles_models;