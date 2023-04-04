const {Sequelize, DataTypes} = require("sequelize");
const ini = require('ini');
const fs = require('fs');
const config = ini.parse(fs.readFileSync('../config.ini','utf-8'));
const users=require('../models/Users_model');



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


const  registerUser=  (req,res)=>{
    try{
        console.log(req.params)

        let {name,surname,email,password,phone} =  req.body;
        console.log(req.body)
         users.create({
            name: name,
            surname:surname,
            email:email,
            password:password,
            phone:phone
         });
        res.status(201).json({status: 'OK', message: 'Poprawnie dodano użytkownika!'});
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Wystąpił bład w trakcie wykonywanie zapytania"
        });
    } 
}

const  getUser=  async (req,res)=>{
    try{
        console.log(req.params)

        let {email} =  req.body;
        console.log(req.body)
         const kox= await users.findOne({
            where: {
              email: email
            }
          });

          if (kox === null) {
            console.log('Not found!');
            res.status(404).json({status: 'X', message: 'nie znaleziono użytkownika!'});
          } else {
            // console.log(kox instanceof OLX_articles_models); // true
            console.log(kox.phone); // 'My Title'
            res.status(201).json({status: 'OK', message: 'Poprawnie znaleziono użytkownika!'});
          }
        //   console.log(kox)  
        
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Wystąpił bład w trakcie wykonywanie zapytania"
        });
    } 
    // return kox;
}



module.exports={registerUser,getUser};