const Users=require('../models/Users_model');

const registerUser = async (req,res)=>{
    let usersList={};

    try {
        let {name,surname,email,password,phone,login} =  req.body;

        usersList = await Users.create({
            name: name,
            surname:surname,
            email:email,
            password:password,
            phone:phone,
            login:login
        });
    } catch (err) {
       console.log(err);
    }

    return usersList;
}

const getUser = async (login)=>{
    let user=null;

    try{
        // let {email} =  req.body;

        user= await Users.findOne({
            where: {
                login: login
            }
        });   
    }
    catch(err){
        console.log(err);
    } 
    return user;
}

module.exports={registerUser,getUser};