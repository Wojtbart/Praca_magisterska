// const usersService=require('../servicelayer/users');
const Pepper_model=require('../models/Pepper_articles');
// const { Op } = require("sequelize");

const { spawn } = require('child_process')

const getDataFromWebsite= async(req,res)=>{
    try{
        // const website= await usersService.getUser(req.params.website);
        let {websites,notifications,actual_or_mail_hour, phrase, request_number} =  req.body;
        websites=websites.flat()
        console.log("ez")
        console.log(websites)
        console.log(notifications)
        console.log(actual_or_mail_hour)
        console.log(phrase)
        console.log(request_number)
        console.log("ez2")
        console.log(websites[0])
        // phrase='zegarek'
        
        if(websites[0]==='pepper'){
            const python = spawn('python', ['../pepper.py',phrase]); //odpalam tam gdzie znajduje się app.js
            
            python.stdout.on('data', function (data) {
                console.log('Dane z potoku skryptu Pythona ...');
                console.log('Dane: ', data.toString());
            });
            
            python.stderr.on('data', (data) => {
                console.error('Błąd przy wykonywaniu skryptu: ', data.toString());
            });

            python.on('close', (code) => {
                console.log("w funkcji close")
                if(code==0){
                    console.log(`Proces zakończony z kodem: ${code} - sukces`);
                    
                }
                else console.log(`Proces zakończony z kodem: ${code} - błąd`)
            });
          

            python.on('exit', async  function(code) {
                console.log("w funkcji exit");
                console.log(code)
                const articles=  await Pepper_model.findAll({
                    // where:{
                    //     [Op.or]: [  { login: login }, {email:email},{phone:phone} ]
                    // }
                    order: [["id","DESC"]], 
                    limit: parseInt(request_number)
                });
                // console.log(JSON.stringify(articles, null, 2))
                res.status(201).json({status: 'OK', message: 'Poprawnie!',data:articles});
                console.log("wysłałem dane")
                // process.exit()
            })
        }
        
        
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