const {Sequelize, DataTypes} = require("sequelize");
const ini = require('ini');
const fs = require('fs');
const config = ini.parse(fs.readFileSync('../../config.ini','utf-8'));

const OLX_articles_models=require('../models/OLX_articles');

const sequelize = new Sequelize(
    config.mysql.database,
    config.mysql.user,
    config.mysql.password,
    {
        host: config.mysql.host,
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});


const allOLXArticles= async () =>{
    var OLXArticles={};

    try {
        OLXArticles= await OLX_articles_models.findAll(); 
        console.log(OLXArticles.every(user => user instanceof OLX_articles_models)); // true
    } catch (err) {
       console.log(err)    
    }
    return OLXArticles;
};

const oneOLXArticle=  async () =>{
    const movie= await OLX_articles_models.findOne({ where: { id: "1" } });
    if (movie === null) {
        console.log('Not found!');
      } else {
        console.log(movie instanceof OLX_articles_models); // true
        console.log(movie.Tytul); // 'My Title'
      }
}
// oneOLXArticle();
