const {Sequelize, DataTypes} = require("sequelize");
const sequelize =require('./database').sequelize

const Allegro_articles_models = sequelize.define("artykuly_allegro", { //table olx_articles
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image_link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    has_promotion: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price_in_PLN: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    popularity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    delivery_in_PLN: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    seller_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'artykuly_allegro',
    timestamps: false
});

sequelize.sync();

// sequelize.sync().then(() => {
//     console.log('Stworzono tabele artykuly_olx!');
// }).catch((error) => {
//     console.error('Nie można stworzyć tabeli : ', error);
// });

module.exports=Allegro_articles_models;