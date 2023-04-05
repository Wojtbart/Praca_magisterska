const usersService=require('../servicelayer/users');

const registerUser= async(req,res)=>{
    try{
        const registeredUser= await usersService.registerUser(req);
        res.status(201).json({status: 'OK', message: 'Poprawnie zarejestrowano użytkownika!'});
    }
    catch(err){
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
            res.status(201).json({status: 'OK', message: `Znaleziono użytkownika o loginie: ${getUser.email}`});
        } 
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Wystąpił bład w trakcie wykonywania zapytania!"
        });
    } 
}

module.exports={registerUser, getUser};