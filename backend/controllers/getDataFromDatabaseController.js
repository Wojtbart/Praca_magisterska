// const usersService=require('../servicelayer/users');
const Pepper_model=require('../models/Pepper_articles');
const Olx_model=require('../models/OLX_articles');
const Allegro_model=require('../models/Allegro_articles');
const Amazon_model=require('../models/Amazon_articles');
const { spawn } = require('child_process')

const getPepperData = (req,res,website) => {

    let {websites,notifications,actual_or_mail_hour, phrase, request_number} =  req.body;

    let pepperArticles=[];
    let arrOfData=[];
    let arrOfArguments=[];
    var numberReturnedRecordsFromBackend=0;
    let numberLimit=0;
    
    arrOfArguments.push('../pepper.py');
    arrOfArguments.push(phrase);
    
    if(website==='pepper'){

        const python = spawn('python',arrOfArguments);
        
        return new Promise((resolveFunc) => {

            python.stdout.on('data', function (data) {
                console.log('Dane pepper: ', data.toString());
                numberReturnedRecordsFromBackend = data.toString().match(/\d+/)[0];
            });
            
            python.stderr.on('data', (data) => {
                console.error('Błąd przy wykonywaniu skryptu: ', data.toString());
            });

            python.on('close', (code) => {
                if(code==0) console.log(`Proces zakończony z kodem: ${code} - sukces`);
                else console.error(`Proces zakończony z kodem: ${code} - błąd`);
            });
        
            python.on('exit', async function(code) {
                
                if (parseInt(request_number) > parseInt(numberReturnedRecordsFromBackend))  numberLimit=numberReturnedRecordsFromBackend;
                else numberLimit=request_number;

                pepperArticles= await Pepper_model.findAll({
                    order: [["id","DESC"]], 
                    limit: parseInt(numberLimit)
                })

                resolveFunc(pepperArticles);
                
                console.log("Wysłano dane serwisu PEPPER!\n");
                arrOfData.push(pepperArticles);
            })
        });
    } 
    return arrOfData; 
}

const getOlxData = (req,res,website) => {

    let {websites,notifications,actual_or_mail_hour, phrase, request_number} =  req.body;

    let olxArticles=[];
    let arrOfData=[];
    let arrOfArguments=[];
    var numberReturnedRecordsFromBackend=0;
    let numberLimit=0;
    
    arrOfArguments.push('../olx_scrapper.py');
    arrOfArguments.push(phrase);
    
    if(website==='olx'){

        const python = spawn('python',arrOfArguments);
        
        return new Promise((resolveFunc) => {

            python.stdout.on('data', function (data) {
                console.log('Dane olx: ', data.toString());
                numberReturnedRecordsFromBackend = data.toString().match(/\d+/)[0];
            });
            
            python.stderr.on('data', (data) => {
                console.error('Błąd przy wykonywaniu skryptu: ', data.toString());
            });

            python.on('close', (code) => {
                if(code==0) console.log(`Proces zakończony z kodem: ${code} - sukces`);
                else console.error(`Proces zakończony z kodem: ${code} - błąd`);
            });
        
            python.on('exit', async function(code) {

                if (parseInt(request_number) > parseInt(numberReturnedRecordsFromBackend))  numberLimit=numberReturnedRecordsFromBackend;
                else numberLimit=request_number;

                olxArticles= await Olx_model.findAll({
                    order: [["id","DESC"]], 
                    limit: parseInt(numberLimit)
                })

                resolveFunc(olxArticles);
                
                console.log("Wysłano dane serwisu OLX!\n");
                arrOfData.push(olxArticles);
            })
        });
    } 
    return arrOfData; 
}

const getAllegroData = (req,res,website) => {

    let {websites,notifications,actual_or_mail_hour, phrase, request_number} =  req.body;

    let allegroArticles=[];
    let arrOfData=[];
    let arrOfArguments=[];
    var numberReturnedRecordsFromBackend=0;
    let numberLimit=0;
    
    arrOfArguments.push('../allegro_scraper.py');
    arrOfArguments.push(phrase);
    
    if(website==='allegro'){

        const python = spawn('python',arrOfArguments);
        
        return new Promise((resolveFunc) => {

            python.stdout.on('data', function (data) {
                console.log('Dane allegro: ', data.toString());
                numberReturnedRecordsFromBackend = data.toString().match(/\d+/)[0];
            });
            
            python.stderr.on('data', (data) => {
                console.error('Błąd przy wykonywaniu skryptu: ', data.toString());
            });

            python.on('close', (code) => {
                if(code==0) console.log(`Proces zakończony z kodem: ${code} - sukces`);
                else console.error(`Proces zakończony z kodem: ${code} - błąd`);
            });
        
            python.on('exit', async function(code) {

                if (parseInt(request_number) > parseInt(numberReturnedRecordsFromBackend)) numberLimit=numberReturnedRecordsFromBackend;
                else numberLimit=request_number;

                allegroArticles= await Allegro_model.findAll({
                    order: [["id","DESC"]], 
                    limit: parseInt(numberLimit)
                })

                resolveFunc(allegroArticles);
                
                console.log("Wysłano dane serwisu Allegro!\n");
                arrOfData.push(allegroArticles);
            })
        });
    } 
    return arrOfData; 
}

const getAmazonData = (req,res,website) => {

    let {websites,notifications,actual_or_mail_hour, phrase, request_number} =  req.body;

    let amazonArticles=[];
    let arrOfData=[];
    let arrOfArguments=[];
    var numberReturnedRecordsFromBackend=0;
    let numberLimit=0;
    
    arrOfArguments.push('../amazon_scrapper.py');
    arrOfArguments.push(phrase);
    
    if(website==='amazon'){

        const python = spawn('python',arrOfArguments);
        
        return new Promise((resolveFunc) => {

            python.stdout.on('data', function (data) {
                console.log('Dane amazon: ', data.toString());
                numberReturnedRecordsFromBackend = data.toString().match(/\d+/)[0];
            });
            
            python.stderr.on('data', (data) => {
                console.error('Błąd przy wykonywaniu skryptu: ', data.toString());
            });

            python.on('close', (code) => {
                if(code==0) console.log(`Proces zakończony z kodem: ${code} - sukces`);
                else console.error(`Proces zakończony z kodem: ${code} - błąd`);
            });
        
            python.on('exit', async function(code) {

                if (parseInt(request_number) > parseInt(numberReturnedRecordsFromBackend)) numberLimit=numberReturnedRecordsFromBackend;
                else numberLimit=request_number;

                amazonArticles= await Amazon_model.findAll({
                    order: [["id","DESC"]], 
                    limit: parseInt(numberLimit)
                })

                resolveFunc(amazonArticles);
                
                console.log("Wysłano dane serwisu Amazon!\n");
                arrOfData.push(amazonArticles);
            })
        });
    } 
    return arrOfData; 
}


const getDataFromWebsite= async (req,res)=>{
    try{

        let {websites,notifications,actual_or_mail_hour, phrase, request_number} =  req.body;
        websites=websites.flat()

        let getDataPepper= [];
        let getDataOlx=[];
        let getDataAmazon=[];
        let getDataAllegro=[];
        for (let i = 0; i < websites.length; i++) {
            if (websites[i]==='pepper') getDataPepper = await (getPepperData(req,res,websites[i]));
            else if (websites[i]==='olx') getDataOlx = await (getOlxData(req,res,websites[i]))
            else if (websites[i]==='allegro') getDataAllegro = await (getAllegroData(req,res,websites[i]));
            else getDataAmazon = await (getAmazonData(req,res,websites[i]));
        }

        await res.status(201).json({status: 'OK', message: 'Poprawnie pobrano dane!',pepper_data:getDataPepper, olx_data:getDataOlx, amazon_data:getDataAmazon, allegro_data: getDataAllegro })

        console.log("Serwer pobrał dane z bazy danych!");

    }
    catch(err){
        console.error(err)
        res.status(500).send({
            message: err.message || "Wystąpił bład w trakcie wykonywania zapytania!"
        });
    } 
}


module.exports={getDataFromWebsite};