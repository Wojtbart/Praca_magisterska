const {Sequelize, DataTypes} = require("sequelize");
const sequelize =require('./database').sequelize

const Pepper_articles_models = sequelize.define("artykuly_pepper", { //table olx_articles
    Tytul: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Cena_oryginalna: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Obnizka_w_procentach: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Cena_promocyjna: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Dostawa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Zdjecie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Opis: {
        type: DataTypes.STRING,
        allowNull: false
    },
    uzytkownik_wystawiajacy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ilosc_komentarzy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Czy_promocja_trwa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Opublikowano: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Kupony_promocyjne: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Firma_sprzedajaca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    tableName: 'artykuly_pepper',
    timestamps: false
});

sequelize.sync();

// sequelize.sync().then(() => {
//     console.log('Stworzono tabele artykuly_olx!');
// }).catch((error) => {
//     console.error('Nie można stworzyć tabeli : ', error);
// });

module.exports=Pepper_articles_models;