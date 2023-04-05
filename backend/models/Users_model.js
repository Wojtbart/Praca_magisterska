const {Sequelize, DataTypes} = require("sequelize");
const sequelize =require('./database').sequelize;

const Users_models = sequelize.define("users", { //table users
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

sequelize.sync();

// sequelize.sync().then(() => {
//     console.log('Stworzono tabele artykuly_olx!');
// }).catch((error) => {
//     console.error('Nie można stworzyć tabeli : ', error);
// });

module.exports=Users_models;