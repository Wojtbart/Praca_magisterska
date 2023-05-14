const Users=require('../models/Users_model');
const { Op } = require("sequelize");

const registerUser = async (req,res)=>{
    let usersList={};

    try {
        const {name,surname,email,password,phone,login} =  req.body;

        usersList = await Users.Users_models.create({
            name: name,
            surname:surname,
            email:email,
            password:password,
            phone:phone,
            login:login
        });

    } catch (err) {
       console.error(err);
    }

    return usersList;
}

const getUser = async (login)=>{
    let user=null;

    try{
        user= await Users.Users_models.findOne({
            where: {
                login: login
            }
        });   
    }
    catch(err){
        console.error(err);
    } 
    return user;
}

const getUserConfiguration = async (userId)=>{
    let userConfiguration=null;

    try{ 

        userConfiguration= await Users.Users_configuration_model.findOne({
            where: {
                user_id: userId
            }
        }); 
    }
    catch(err){
        console.error(err);
    } 
    return userConfiguration;
}

const authorizeUserLogin = async (login, password)=>{
    let getUserToLogin=null;

    try{ 

        getUserToLogin = await Users.Users_models.findOne({
            where: {
                login: login, password:password 
            }
        });
    }
    catch(err){
        console.error(err);
    } 
    return getUserToLogin;
}

const getUsersWithSameValues = async (login, email, phone)=>{
    let getUsers=null;

    try{ 
        getUsers= await Users.Users_models.findAll({
            where:{
                [Op.or]: [  { login: login }, {email:email},{phone:phone} ]
            }
        });
    }
    catch(err){
        console.error(err);
    } 
    return getUsers;
}

const saveUserConfiguration = async (req)=>{

    const { olx, amazon, allegro, pepper, sms, discord, email, aktualna_oferta, godzina_maila, repeat_after_specified_time, user_id } = req.body;
    let saveConfiguration=null;

    try{ 
        saveConfiguration = await Users.Users_configuration_model.create({
            olx:olx,
            amazon:amazon,
            allegro:allegro,
            pepper: pepper,
            sms:sms,
            email:email,
            discord:discord,
            aktualna_oferta:aktualna_oferta,
            godzina_maila:godzina_maila,
            repeat_after_specified_time: repeat_after_specified_time,
            user_id:user_id
        });
    }
    catch(err){
        console.error(err);
    } 
    return saveConfiguration;
}
const updateUserConfiguration = async (req)=>{

    const { olx, amazon, allegro, pepper, sms, discord, email, aktualna_oferta, godzina_maila, repeat_after_specified_time, user_id } = req.body;
    let updateConfiguration=null;

    try{ 
        updateConfiguration=  Users.Users_configuration_model.update({ 
            olx:olx,
            amazon:amazon,
            allegro:allegro,
            pepper: pepper,
            sms:sms,
            email:email,
            discord:discord,
            aktualna_oferta:aktualna_oferta,
            repeat_after_specified_time: repeat_after_specified_time,
            godzina_maila:godzina_maila
            },
            { 
                where:{
                    user_id: user_id 
                }
            }
        ); 
    }
    catch(err){
        console.error(err);
    } 
    return updateConfiguration;
}

module.exports={registerUser,getUser, getUserConfiguration, authorizeUserLogin, getUsersWithSameValues, saveUserConfiguration, updateUserConfiguration};