const usersDal=require('../dataaccesslayer/usersDal');

const registerUser = async (req,res)=>{
    
    const registeredUser = await usersDal.registerUser(req,res);
    return (registeredUser);
}

const getUser = async (login)=>{
    
    const getUsers = await usersDal.getUser(login);
    return (getUsers);
}

module.exports={registerUser,getUser};