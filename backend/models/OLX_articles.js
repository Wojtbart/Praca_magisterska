const {Sequelize, DataTypes} = require("sequelize");
const sequelize =require('./database').sequelize

const OLX_articles_models = sequelize.define("artykuly_olx", { 
    Tytul: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Link: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Zdjecie: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Cena: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Stan: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Lokalizacja: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Obserwuj: {
        type: DataTypes.STRING,
        allowNull: true
    },
},{
    tableName: 'artykuly_olx',
    timestamps: false
});

module.exports=OLX_articles_models;