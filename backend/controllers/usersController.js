const usersService=require('../servicelayer/users');

const getUser= async(req,res)=>{
    try{
        const getUser= await usersService.getUser(req.params.login);

        if (getUser === null) {
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

const getConfiguration= async(req,res)=>{

    try{
        const getUser= await usersService.getUser(req.params.login);
        if (getUser === null) {
            console.log('Nie znaleziono użytkownika!');
            res.status(404).json({status: 'Error', message: 'Nie znaleziono użytkownika o podanym loginie!'});
            return;
        }

        const getUserConfiguration= await usersService.getUserConfiguration(getUser.id);
        if(getUserConfiguration === null){
            console.log('Nie znaleziono konfiguracji użytkownika!');
            res.status(404).json({status: 'Error', message: 'Nie znaleziono konfiguracji dla tego użytkownika!'});
        }
        else {
            res.status(201).json({status: 'OK', message: `Udalo sie`,data:getUserConfiguration});
        } 
    }
    catch(err){
        console.error(err);
        res.status(500).send({
            message: err.message || "Wystąpił bład w trakcie wykonywania zapytania!"
        });
    } 
}

const login = async (req,res)=>{

    const { login, password } = req.body;

    try {
        const user = await usersService.authorizeUserLogin(login,password);

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
    } 
    catch (error) {
        res.status(500).json({
            message: "Wystąpił nieznany błąd",
            error: error.message,
        })
    }
}

const registerUser= async(req,res)=>{

    const {email,phone,login} =  req.body;
    let errorMess='';

    try{
        const users = await usersService.getUsersWithSameValues(login,email,phone);

        if(!users || users.length >=1 ){

            if(email==users[0].email) errorMess='Użytkownik o takim emailu już istnieje';
            if(login==users[0].login) errorMess='Użytkownik o takim loginie już istnieje';
            if(phone==users[0].phone) errorMess='Użytkownik o takim numerze telefonu już istnieje';

            res.status(401).json({
                message: "Rejestracja nie powiodła się",
                error: errorMess,
            });
        }
        else{
            try{
                const registeredUser= await usersService.registerUser(req,res);
                res.status(201).json({status: 'OK', message: 'Poprawnie zarejestrowano użytkownika!'});   
            }
            catch(err){
                console.error(err);
            } 
        }
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Wystąpił bład w trakcie rejestrowania użytkownika!"
        });
    } 
}

const saveConfiguration = async (req,res)=>{
    const { user_id } = req.body;
    let dataToSend=null;

    try {
        const configUser= await usersService.getUserConfiguration(user_id);

        if( configUser!==null){
            const updateUserConfig= await usersService.updateUserConfiguration(req);
            if (updateUserConfig === null) {
                console.log('Błąd podczas aktualizowania konfiguracji użytkownika!');
                res.status(404).json({status: 'Error', message: 'Błąd podczas aktualizowania konfiguracji użytkownika!'});
                return;
            }
            dataToSend=updateUserConfig;
        }
        else{
            const saveUserConfig= await usersService.saveUserConfiguration(req);
            if (saveUserConfig === null) {
                console.log('Błąd podczas tworzenia konfiguracji użytkownika!');
                res.status(404).json({status: 'Error', message: 'Błąd podczas tworzenia konfiguracji użytkownika!'});
                return;
            }
            dataToSend=saveUserConfig;
        }

        return  res.status(200).json({
            message: "Udało się poprawnie zapisać dane!!"
        })
        
    } 
    catch (error) {

        console.log(error);
        res.status(500).json({
            message: "Wystąpił nieznany błąd",
            error: error.message,
        })
    }
}

module.exports={registerUser, getUser, login, saveConfiguration, getConfiguration};