const Pepper_model=require('../models/Pepper_articles');
const Olx_model=require('../models/OLX_articles');
const Allegro_model=require('../models/Allegro_articles');
const Amazon_model=require('../models/Amazon_articles');

const getPepperArticles = async (numberLimit)=>{
    let pepperArticles={};

    try {
        pepperArticles= await Pepper_model.findAll({
            order: [["id","DESC"]], 
            limit: parseInt(numberLimit)
        })

    } catch (err) {
       console.error(err);
    }

    return pepperArticles;
}

const getOlxArticles = async (numberLimit)=>{
    let olxArticles={};

    try {
        olxArticles= await Olx_model.findAll({
            order: [["id","DESC"]], 
            limit: parseInt(numberLimit)
        })

    } catch (err) {
       console.error(err);
    }

    return olxArticles;
}

const getAmazonArticles = async (numberLimit)=>{
    let amazonArticles={};

    try {
        amazonArticles= await Amazon_model.findAll({
            order: [["id","DESC"]], 
            limit: parseInt(numberLimit)
        })

    } catch (err) {
       console.error(err);
    }

    return amazonArticles;
}

const getAllegroArticles = async (numberLimit)=>{
    let allegroArticles={};

    try {
        allegroArticles= await Allegro_model.findAll({
            order: [["id","DESC"]], 
            limit: parseInt(numberLimit)
        })

    } catch (err) {
       console.error(err);
    }

    return allegroArticles;
}

module.exports={getPepperArticles, getOlxArticles, getAmazonArticles, getAllegroArticles};