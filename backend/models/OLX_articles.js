const {Sequelize, DataTypes} = require("sequelize");
const sequelize =require('./database').sequelize

const OLX_articles_models = sequelize.define("artykuly_olx", { 
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

module.exports=OLX_articles_models;