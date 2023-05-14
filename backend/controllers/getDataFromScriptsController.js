const dataFromPlatformsService=require('../servicelayer/dataFromPlatforms_service');
const { spawn } = require('child_process');

let REGEX=/\d+/;

const getPepperData = (req,website) => {

    let {phrase, request_number} =  req.body;

    let arrOfData=[];
    let arrOfArguments=[];
    let numberReturnedRecordsFromBackend=0;
    let numberLimit=0;
    
    arrOfArguments.push('../pepper.py');
    arrOfArguments.push(phrase);
    
    if(website==='pepper'){

        const python = spawn('python',arrOfArguments);
        
        return new Promise((resolveFunc) => {

            python.stdout.on('data', function (data) {
                console.log('Dane pepper: ', data.toString());
                numberReturnedRecordsFromBackend = data.toString().match(REGEX)[0];
            });
            
            python.stderr.on('data', (data) => {
                console.error('Błąd przy wykonywaniu skryptu: ', data.toString());
            });

            python.on('close', (code) => {
                if(code==0) console.log(`Proces zakończony z kodem: ${code} - sukces\n`);
                else console.error(`Proces zakończony z kodem: ${code} - błąd\n`);
            });
        
            python.on('exit', async function(code) {
                
                if (parseInt(request_number) > parseInt(numberReturnedRecordsFromBackend))  numberLimit=numberReturnedRecordsFromBackend;
                else numberLimit=request_number;

                const pepperArticles= await dataFromPlatformsService.getPepperArticles(numberLimit);
                resolveFunc(pepperArticles);
                arrOfData.push(pepperArticles);
            })
        });
    } 
    return arrOfData; 
}

const getOlxData = (req,website) => {

    let {phrase, request_number} =  req.body;

    let arrOfData=[];
    let arrOfArguments=[];
    let numberReturnedRecordsFromBackend=0;
    let numberLimit=0;
    
    arrOfArguments.push('../olx_scrapper.py');
    arrOfArguments.push(phrase);
    
    if(website==='olx'){

        const python = spawn('python',arrOfArguments);
        
        return new Promise((resolveFunc) => {

            python.stdout.on('data', function (data) {
                console.log('Dane olx: ', data.toString());
                numberReturnedRecordsFromBackend = data.toString().match(REGEX)[0];
            });
            
            python.stderr.on('data', (data) => {
                console.error('Błąd przy wykonywaniu skryptu: ', data.toString());
            });

            python.on('close', (code) => {
                if(code==0) console.log(`Proces zakończony z kodem: ${code} - sukces\n`);
                else console.error(`Proces zakończony z kodem: ${code} - błąd\n`);
            });
        
            python.on('exit', async function(code) {

                if (parseInt(request_number) > parseInt(numberReturnedRecordsFromBackend))  numberLimit=numberReturnedRecordsFromBackend;
                else numberLimit=request_number;

                const olxArticles= await dataFromPlatformsService.getOlxArticles(numberLimit);
                resolveFunc(olxArticles);
                arrOfData.push(olxArticles);
            })
        });
    } 
    return arrOfData; 
}

const getAllegroData = (req, website) => {

    let {phrase, request_number} =  req.body;

    let arrOfData=[];
    let arrOfArguments=[];
    let numberReturnedRecordsFromBackend=0;
    let numberLimit=0;
    
    arrOfArguments.push('../allegro_scraper.py');
    arrOfArguments.push(phrase);
    
    if(website==='allegro'){

        const python = spawn('python',arrOfArguments);
        
        return new Promise((resolveFunc) => {

            python.stdout.on('data', function (data) {
                console.log('Dane allegro: ', data.toString());
                numberReturnedRecordsFromBackend = data.toString().match(REGEX)[0];
            });
            
            python.stderr.on('data', (data) => {
                console.error('Błąd przy wykonywaniu skryptu: ', data.toString());
            });

            python.on('close', (code) => {
                if(code==0) console.log(`Proces zakończony z kodem: ${code} - sukces\n`);
                else console.error(`Proces zakończony z kodem: ${code} - błąd\n`);
            });
        
            python.on('exit', async function(code) {

                if (parseInt(request_number) > parseInt(numberReturnedRecordsFromBackend)) numberLimit=numberReturnedRecordsFromBackend;
                else numberLimit=request_number;

                const allegroArticles= await dataFromPlatformsService.getAllegroArticles(numberLimit);
                resolveFunc(allegroArticles);
                arrOfData.push(allegroArticles);
            })
        });
    } 
    return arrOfData; 
}

const getAmazonData = (req, website) => {

    let {phrase, request_number} =  req.body;

    let arrOfData=[];
    let arrOfArguments=[];
    let numberReturnedRecordsFromBackend=0;
    let numberLimit=0;
    
    arrOfArguments.push('../amazon_scrapper.py');
    arrOfArguments.push(phrase);
    
    if(website==='amazon'){

        const python = spawn('python',arrOfArguments);
        
        return new Promise((resolveFunc) => {

            python.stdout.on('data', function (data) {
                console.log('Dane amazon: ', data.toString());
                numberReturnedRecordsFromBackend = data.toString().match(REGEX)[0];
            });
            
            python.stderr.on('data', (data) => {
                console.error('Błąd przy wykonywaniu skryptu: ', data.toString());
            });

            python.on('close', (code) => {
                if(code==0) console.log(`Proces zakończony z kodem: ${code} - sukces\n`);
                else console.error(`Proces zakończony z kodem: ${code} - błąd\n`);
            });
        
            python.on('exit', async function(code) {

                if (parseInt(request_number) > parseInt(numberReturnedRecordsFromBackend)) numberLimit=numberReturnedRecordsFromBackend;
                else numberLimit=request_number;

                const amazonArticles= await dataFromPlatformsService.getAmazonArticles(numberLimit);
                resolveFunc(amazonArticles);
                arrOfData.push(amazonArticles);
            })
        });
    } 
    return arrOfData; 
}

const getDataFromWebsite= async (req,res)=>{
    try{

        let {websites} =  req.body;
        websites=websites.flat()

        let getDataPepper= [];
        let getDataOlx=[];
        let getDataAmazon=[];
        let getDataAllegro=[];
        
        for (let i = 0; i < websites.length; i++) {
            if (websites[i]==='pepper') getDataPepper = await (getPepperData(req, websites[i]));
            else if (websites[i]==='olx') getDataOlx = await (getOlxData(req, websites[i]))
            else if (websites[i]==='allegro') getDataAllegro = await (getAllegroData(req, websites[i]));
            else getDataAmazon = await (getAmazonData(req,websites[i]));
        }

        await res.status(201).json({status: 'OK', message: 'Poprawnie pobrano dane!',pepper_data:getDataPepper, olx_data:getDataOlx, amazon_data:getDataAmazon, allegro_data: getDataAllegro });
        console.log("Serwer pobrał dane z bazy danych!");
    }
    catch(err){
        console.error(err);
        res.status(500).send({
            message: err.message || "Wystąpił bład w trakcie wykonywania zapytania!"
        });
    } 
}

module.exports={getDataFromWebsite};