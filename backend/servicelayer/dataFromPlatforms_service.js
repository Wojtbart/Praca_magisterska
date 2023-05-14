const dataFromPlatformsDal=require('../dataaccesslayer/dataFromPlatformsDal');

const getPepperArticles = async (numberLimit)=>{
    
    const PepperArticles= await dataFromPlatformsDal.getPepperArticles(numberLimit);
    return (PepperArticles);
}

const getOlxArticles = async (numberLimit)=>{
    
    const OlxArticles= await dataFromPlatformsDal.getOlxArticles(numberLimit);
    return (OlxArticles);
}

const getAmazonArticles = async (numberLimit)=>{
    
    const AmazonArticles= await dataFromPlatformsDal.getAmazonArticles(numberLimit);
    return (AmazonArticles);
}

const getAllegroArticles = async (numberLimit)=>{
    
    const AllegroArticles= await dataFromPlatformsDal.getAllegroArticles(numberLimit);
    return (AllegroArticles);
}

module.exports={getPepperArticles, getOlxArticles, getAmazonArticles, getAllegroArticles};
