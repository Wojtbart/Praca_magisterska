// const usersService=require('../servicelayer/users');
const Pepper_model=require('../models/Pepper_articles');
const Olx_model=require('../models/OLX_articles');
const Allegro_model=require('../models/Allegro_articles');
const Amazon_model=require('../models/Amazon_articles');
// const { Op } = require("sequelize");

const { spawn } = require('child_process')



const getData=   (req,res)=>{
    // return new Promise(function(resolve, reject) {
    let {websites,notifications,actual_or_mail_hour, phrase, request_number} =  req.body;
        websites=websites.flat()

        let pepper_articles=[];
        let is_reveice_pepper_data=false;
        let olx_articles=[];
        let is_reveice_olx_data=false;
        let arrOfData=[]

         for (let i = 0; i < websites.length; i++) {

            if(websites[i]==='pepper'){
                const python = spawn('python', ['../pepper.py',phrase]); //odpalam tam gdzie znajduje się app.js
                
                return new Promise((resolveFunc) => {
                python.stdout.on('data', function (data) {
                    console.log('Dane z potoku skryptu Pythona ...');
                    console.log('Dane: ', data.toString());
                });
                
                python.stderr.on('data', (data) => {
                    console.error('Błąd przy wykonywaniu skryptu: ', data.toString());
                    // process.stdout.write(x.toString());
                });

                python.on('close', (code) => {
                    if(code==0){
                        console.log(`Proces zakończony z kodem: ${code} - sukces`);
                    }
                    else console.log(`Proces zakończony z kodem: ${code} - błąd`)
                });
            
                python.on('exit',async  function(code) {
                    console.log("w funkcji exit");
                    console.log(code)
                    pepper_articles= await Pepper_model.findAll({
                        order: [["id","DESC"]], 
                        limit: parseInt(request_number)
                    })
                    resolveFunc(pepper_articles)
                    
                    console.log("Wysłałem dane serwisu PEPPER!")
                    is_reveice_pepper_data=true;
                    arrOfData.push(pepper_articles);
                })
                });
            }
        
          
        }
        
        return arrOfData; 
}

const getDataOlx=   (req,res)=>{
    // return new Promise(function(resolve, reject) {
    let {websites,notifications,actual_or_mail_hour, phrase, request_number} =  req.body;
        websites=websites.flat()

        let pepper_articles=[];
        let is_reveice_pepper_data=false;
        let olx_articles=[];
        let is_reveice_olx_data=false;
        let arrOfData=[]
        for (let i = 0; i < websites.length; i++) {
        if(websites[i]=='olx'){
            const python = spawn('python', ['../olx_scrapper.py',phrase]); //odpalam tam gdzie znajduje się app.js
            return new Promise((resolveFunc) => {   
                python.stdout.on('data', function (data) {
                    console.log('Dane z potoku skryptu Pythona ...');
                    console.log('Dane: ', data.toString());
                });
                
                python.stderr.on('data', (data) => {
                    console.error('Błąd przy wykonywaniu skryptu: ', data.toString());
                });

                python.on('close', (code) => {
                    if(code==0){
                        console.log(`Proces zakończony z kodem: ${code} - sukces`);
                    }
                    else console.log(`Proces zakończony z kodem: ${code} - błąd`)
                });
            

                python.on('exit', async  function(code) {
                    // console.log("w funkcji exit");
                    // console.log(code)
                    olx_articles=  Olx_model.findAll({
                        order: [["id","DESC"]], 
                        limit: parseInt(request_number)
                    })
                    resolveFunc(olx_articles)
                    console.log("Wysłałem dane serwisu OLX!");
                    is_reveice_olx_data=true;
                    arrOfData.push(olx_articles);
                })
            });
        }
    }
            // else if(websites[i]==='allegro'){
            //     // console.log("jestem tu")
            //     const python = spawn('python', ['../allegro_scraper.py',phrase]); //odpalam tam gdzie znajduje się app.js
                
            //     python.stdout.on('data', function (data) {
            //         console.log('Dane z potoku skryptu Pythona ...');
            //         console.log('Dane: ', data.toString());
            //     });
                
            //     python.stderr.on('data', (data) => {
            //         console.error('Błąd przy wykonywaniu skryptu: ', data.toString());
            //     });

            //     python.on('close', (code) => {
            //         // console.log("w funkcji close")
            //         if(code==0){
            //             console.log(`Proces zakończony z kodem: ${code} - sukces`);
            //         }
            //         else console.log(`Proces zakończony z kodem: ${code} - błąd`)
            //     });
            

            //     python.on('exit', async  function(code) {
            //         // console.log("w funkcji exit");
            //         console.log(code)
            //         const articles=  await Allegro_model.findAll({
            //             // where:{
            //             //     [Op.or]: [  { login: login }, {email:email},{phone:phone} ]
            //             // }
            //             order: [["id","DESC"]], 
            //             limit: parseInt(request_number)
            //         });
            //         // console.log(JSON.stringify(articles, null, 2))
            //         // res.status(201).json({status: 'OK', message: 'Poprawnie!',data:articles});
            //         console.log("Poprawnie wysłano dane !")
            //         // process.exit()
            //     })
            // 
        
        return arrOfData; //tu był return
    // }); 
}

const getDataAllegro = (req,res) => {

    let {websites,notifications,actual_or_mail_hour, phrase, request_number} =  req.body;
        websites=websites.flat()

        let pepper_articles=[];
        let is_reveice_pepper_data=false;
        let olx_articles=[];
        let is_reveice_olx_data=false;
        let arrOfData=[]

        for (let i = 0; i < websites.length; i++) {

        if(websites[i]=='allegro'){
            const python = spawn('python', ['../allegro_scrapper.py',phrase]); //odpalam tam gdzie znajduje się app.js
            return new Promise((resolveFunc) => {   
                python.stdout.on('data', function (data) {
                    console.log('Dane z potoku skryptu Pythona ...');
                    console.log('Dane: ', data.toString());
                });
                
                python.stderr.on('data', (data) => {
                    console.error('Błąd przy wykonywaniu skryptu: ', data.toString());
                });

                python.on('close', (code) => {
                    if(code==0){
                        console.log(`Proces zakończony z kodem: ${code} - sukces`);
                    }
                    else console.log(`Proces zakończony z kodem: ${code} - błąd`)
                });
            

                python.on('exit', async  function(code) {
                    // console.log("w funkcji exit");
                    // console.log(code)
                    allegro_articles=  Allegro_model.findAll({
                        order: [["id","DESC"]], 
                        limit: parseInt(request_number)
                    })
                    resolveFunc(allegro_articles)
                    console.log("Wysłałem dane serwisu OLX!");
                    is_reveice_olx_data=true;
                    arrOfData.push(allegro_articles);
                })
            });
        }
        }   
        
        return arrOfData; 
}

const getDataAmazon = (req,res) => {

    let {websites,notifications,actual_or_mail_hour, phrase, request_number} =  req.body;
        websites=websites.flat()

        let pepper_articles=[];
        let is_reveice_pepper_data=false;
        let olx_articles=[];
        let is_reveice_olx_data=false;
        let arrOfData=[]
        for (let i = 0; i < websites.length; i++) {

        if(websites[i]=='amazon'){
            const python = spawn('python', ['../amazon_scrapper.py',phrase]); //odpalam tam gdzie znajduje się app.js
            return new Promise((resolveFunc) => {   
                python.stdout.on('data', function (data) {
                    console.log('Dane z potoku skryptu Pythona ...');
                    console.log('Dane: ', data.toString());
                });
                
                python.stderr.on('data', (data) => {
                    console.error('Błąd przy wykonywaniu skryptu: ', data.toString());
                });

                python.on('close', (code) => {
                    if(code==0){
                        console.log(`Proces zakończony z kodem: ${code} - sukces`);
                    }
                    else console.log(`Proces zakończony z kodem: ${code} - błąd`)
                });
            

                python.on('exit', async  function(code) {
                    // console.log("w funkcji exit");
                    // console.log(code)
                    amazon_articles=  Amazon_model.findAll({
                        order: [["id","DESC"]], 
                        limit: parseInt(request_number)
                    })
                    resolveFunc(amazon_articles)
                    console.log("Wysłałem dane serwisu OLX!");
                    is_reveice_olx_data=true;
                    arrOfData.push(amazon_articles);
                })
            });
        }
    }   
        
        return arrOfData; 
}


const getDataFromWebsite= async (req,res)=>{
    try{
        // const website= await usersService.getUser(req.params.website);
        let {websites,notifications,actual_or_mail_hour, phrase, request_number} =  req.body;
        websites=websites.flat()

        // let pepper_articles=[];
        // let is_reveice_pepper_data=false;
        // let olx_articles=[];
        // let is_reveice_olx_data=false;

        // for (let i = 0; i < websites.length; i++) {

        //     if(websites[i]==='pepper'){
        //         const python = spawn('python', ['../pepper.py',phrase]); //odpalam tam gdzie znajduje się app.js
                
        //         python.stdout.on('data', function (data) {
        //             console.log('Dane z potoku skryptu Pythona ...');
        //             console.log('Dane: ', data.toString());
        //         });
                
        //         python.stderr.on('data', (data) => {
        //             console.error('Błąd przy wykonywaniu skryptu: ', data.toString());
        //         });

        //         python.on('close', (code) => {
        //             if(code==0){
        //                 console.log(`Proces zakończony z kodem: ${code} - sukces`);
        //             }
        //             else console.log(`Proces zakończony z kodem: ${code} - błąd`)
        //         });
            
        //         python.on('exit', async  function(code) {
        //             console.log("w funkcji exit");
        //             console.log(code)
        //             pepper_articles=  await Pepper_model.findAll({
        //                 order: [["id","DESC"]], 
        //                 limit: parseInt(request_number)
        //             });
                    
        //             console.log("Wysłałem dane serwisu PEPPER!")
        //             is_reveice_pepper_data=true;
        //         })
        //     }
        //     else if(websites[i]==='olx'){
        //         const python = spawn('python', ['../olx_scrapper.py',phrase]); //odpalam tam gdzie znajduje się app.js
                
        //         python.stdout.on('data', function (data) {
        //             console.log('Dane z potoku skryptu Pythona ...');
        //             console.log('Dane: ', data.toString());
        //         });
                
        //         python.stderr.on('data', (data) => {
        //             console.error('Błąd przy wykonywaniu skryptu: ', data.toString());
        //         });

        //         python.on('close', (code) => {
        //             if(code==0){
        //                 console.log(`Proces zakończony z kodem: ${code} - sukces`);
        //             }
        //             else console.log(`Proces zakończony z kodem: ${code} - błąd`)
        //         });
            

        //         python.on('exit', async  function(code) {
        //             // console.log("w funkcji exit");
        //             // console.log(code)
        //             olx_articles=  await Olx_model.findAll({
        //                 order: [["id","DESC"]], 
        //                 limit: parseInt(request_number)
        //             });

        //             console.log("Wysłałem dane serwisu OLX!");
        //             is_reveice_olx_data=true;
        //         })
        //     }
        //     else if(websites[i]==='allegro'){
        //         // console.log("jestem tu")
        //         const python = spawn('python', ['../allegro_scraper.py',phrase]); //odpalam tam gdzie znajduje się app.js
                
        //         python.stdout.on('data', function (data) {
        //             console.log('Dane z potoku skryptu Pythona ...');
        //             console.log('Dane: ', data.toString());
        //         });
                
        //         python.stderr.on('data', (data) => {
        //             console.error('Błąd przy wykonywaniu skryptu: ', data.toString());
        //         });

        //         python.on('close', (code) => {
        //             // console.log("w funkcji close")
        //             if(code==0){
        //                 console.log(`Proces zakończony z kodem: ${code} - sukces`);
        //             }
        //             else console.log(`Proces zakończony z kodem: ${code} - błąd`)
        //         });
            

        //         python.on('exit', async  function(code) {
        //             // console.log("w funkcji exit");
        //             console.log(code)
        //             const articles=  await Allegro_model.findAll({
        //                 // where:{
        //                 //     [Op.or]: [  { login: login }, {email:email},{phone:phone} ]
        //                 // }
        //                 order: [["id","DESC"]], 
        //                 limit: parseInt(request_number)
        //             });
        //             // console.log(JSON.stringify(articles, null, 2))
        //             // res.status(201).json({status: 'OK', message: 'Poprawnie!',data:articles});
        //             console.log("Poprawnie wysłano dane !")
        //             // process.exit()
        //         })
        //     }
        // }
        let getDataa= [];
        let getDataaOlx=[];
        let getDataaAmazon=[];
        let getDataaAllegro=[];
        for (let i = 0; i < websites.length; i++) {
            if (websites[i]==='pepper') getDataa= await (getData(req,res));
            else if (websites[i]==='olx') getDataaOlx= await (getDataOlx(req,res))
            else if (websites[i]==='allegro') getDataaAllegro= await (getDataAllegro(req,res));
            else if (websites[i]==='amazon') getDataaAmazon= await (getDataAmazon(req,res));
            // else getDataaAmazon= await (getDataAmazon(req,res));
        }

        // const getDataa= await (getData(req,res));
        // const getDataaOlx= await (getDataOlx(req,res));
        await res.status(201).json({status: 'OK', message: 'Poprawnie!',pepper_data:getDataa,olx_data:getDataaOlx, amazon_data:getDataaAmazon,allegro_data: getDataaAllegro })

        // const kozak=getDataa.then(
        //     data =>{
        //         console.log("1")
        //         console.log(data)
        //         console.log("2")
        //         return data;
        //     } 
            
        // ).then( el=>
        //     // res.status(201).json({status: 'OK', message: 'Poprawnie!',pepper_data:pepper_articles,olx_data:olx_articles })
        //     res.status(201).json({status: 'OK', message: 'Poprawnie!',dataa:el})
        // )
        // .catch((err) => {
        //     console.log(err);
        // });

        console.log("po",getDataa)
        console.log("Udało się")
        console.log("po",getDataaOlx)
        // console.log(is_reveice_olx_data)
        // console.log(is_reveice_pepper_data)
        // if(is_reveice_olx_data && is_reveice_pepper_data) 
        // res.status(201).json({status: 'OK', message: 'Poprawnie!',pepper_data:pepper_articles,olx_data:olx_articles });
        // res.status(201).json({status: 'OK', message: 'Poprawnie!',data:"DANE"});

        // if(!user || user.length >=1 ){

        //     let errorMess='';
        //     if(email==user[0].email) errorMess='Użytkownik o takim emailu już istnieje';
        //     if(login==user[0].login) errorMess='Użytkownik o takim loginie już istnieje';
        //     if(phone==user[0].phone) errorMess='Użytkownik o takim numerze telefonu już istnieje';

        //     res.status(401).json({
        //         message: "Rejestracja nie powiodła się",
        //         error: errorMess,
        //     })
        // }
        // else{
        //     const registeredUser= await usersService.registerUser(req,res);
        //     res.status(201).json({status: 'OK', message: 'Poprawnie zarejestrowano użytkownika!'});
        // }

    }
    catch(err){
        console.log(err)
        res.status(500).send({
            message: err.message || "Wystąpił bład w trakcie wykonywania zapytania!"
        });
    } 
}


module.exports={getDataFromWebsite};