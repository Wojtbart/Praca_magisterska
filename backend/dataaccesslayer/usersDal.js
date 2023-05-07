const Users=require('../models/Users_model');

const registerUser = async (req,res)=>{
    let usersList={};

    try {
        const {name,surname,email,password,phone,login} =  req.body;

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

module.exports={registerUser,getUser};