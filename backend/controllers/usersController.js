const usersService=require('../servicelayer/users');
const Users=require('../models/Users_model');
const { Op } = require("sequelize");

const registerUser= async(req,res)=>{
    try{

        const {name,surname,email,password,phone,login} =  req.body;

        const user= await Users.Users_models.findAll({
            where:{
                [Op.or]: [  { login: login }, {email:email},{phone:phone} ]
            }
        });

        if(!user || user.length >=1 ){

            let errorMess='';
            if(email==user[0].email) errorMess='Użytkownik o takim emailu już istnieje';
            if(login==user[0].login) errorMess='Użytkownik o takim loginie już istnieje';
            if(phone==user[0].phone) errorMess='Użytkownik o takim numerze telefonu już istnieje';

            res.status(401).json({
                message: "Rejestracja nie powiodła się",
                error: errorMess,
            })
        }
        else{
            const registeredUser= await usersService.registerUser(req,res);
            res.status(201).json({status: 'OK', message: 'Poprawnie zarejestrowano użytkownika!'});
        }

    }
    catch(err){
        console.log(err)
        res.status(500).send({
            message: err.message || "Wystąpił bład w trakcie rejestrowania użytkownika!"
        });
    } 
}

const getUser= async(req,res)=>{
    try{
        const getUser= await usersService.getUser(req.params.login);

        if (getUser === null) {
            console.log('Nie znaleziono!');
            res.status(404).json({status: 'Error', message: 'Nie znaleziono użytkownika o podanym loginie!'});
        } else {
            res.status(201).json({status: 'OK', message: `Znaleziono użytkownika o loginie: ${getUser.login}`,user_id:getUser.id});
        } 
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Wystąpił bład w trakcie wykonywania zapytania!"
        });
    } 
}


const login = async (req,res)=>{

        const { login, password } = req.body;

        try {
            const user = await Users.Users_models.findOne({ where: { login: login, password:password } });

            if (user==null ) {
                errorMess='Niepoprawne dane użytkownika';

                return res.status(401).json({
                    message: "Nie udało się zalogować",
                    error: errorMess,
                })
            }
            else{
                res.status(200).json({
                    message: "Poprawnie udało się zalogować",
                    login:user.login,
                    email:user.email,
                    phone:user.phone,
                })
            }  
        } catch (error) {
          res.status(500).json({
            message: "Wystąpił nieznany błąd",
            error: error.message,
          })
        }
}

const saveConfiguration = async (req,res)=>{
    const { olx, amazon, allegro,pepper, sms,discord,email,aktualna_oferta,godzina_maila } = req.body;

    try {
        // const user = await Users.findOne({ where: { login: login, password:password } });
        // Users.Users_configuration_model

        // let usersList={};
    
            // const userLogin = await Users.findOne({ where: { login: login } });
            // if(userLogin !=null){
            //     res.status(401).json({
            //         message: "Rejestracja nie powiodła się",
            //         error: "Użytkownik o takim loginie już istnieje",
            //     })
            // }
    
            // const userEmail = await Users.findOne({ where: { email:email } });
            // if(userEmail !=null){
            //     res.status(401).json({
            //         message: "Rejestracja nie powiodła się",
            //         error: "Użytkownik o takim mailu już istnieje",
            //     })
            // }
    
            // const userPhone = await Users.findOne({ where: { phone:phone } });
            // if(userPhone !=null){
            //     res.status(401).json({
            //         message: "Rejestracja nie powiodła się",
            //         error: "Użytkownik o takim numerze telefonu już istnieje",
            //     })
            // }
            console.log(req.body)
            usersList = await Users.Users_configuration_model.create({
                olx:olx,
                amazon:amazon,
                allegro:allegro,
                pepper: pepper,
                sms:sms,
                email:email,
                discord:discord,
                aktualna_oferta:aktualna_oferta,
                godzina_maila:godzina_maila,
                user_id:9
            });
            console.log()
           return  res.status(200).json({
                message: "Poprawnie udało się dodać dane",
                // login:user.login,
                // email:user.email,
                // phone:user.phone,
            })
    
        
    } catch (error) {
      res.status(500).json({
        message: "Wystąpił nieznany błąd",
        error: error.message,
      })
    }
}

module.exports={registerUser, getUser, login, saveConfiguration};