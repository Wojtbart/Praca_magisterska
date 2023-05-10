const {Sequelize, DataTypes} = require("sequelize");
const sequelize =require('./database').sequelize;

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
    login: {
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

const Users_configuration_model = sequelize.define("user_configuration", { 
    olx: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    amazon: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    allegro: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    pepper: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    sms: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    discord: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    email: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    aktualna_oferta: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    godzina_maila: {
        type: DataTypes.STRING,
        allowNull: true
    },
    repeat_after_specified_time: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    } 
},{
    tableName: 'user_configuration',
    timestamps: false
});
Users_models.hasOne(Users_configuration_model,{foreignKey: {
    name: 'user_id'
}});

module.exports={Users_models,Users_configuration_model};