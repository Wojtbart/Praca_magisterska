const smsDiscordService=require('../servicelayer/smsDiscord_service');

const sendSmsToPhoneController= async (req,res)=>{
    try{
        const sendSms= await smsDiscordService.sendSms();
        res.status(201).json({status: 'OK', message: 'Poprawnie wysłano sms!'});
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Wystąpił bład w trakcie wysyłania sms!"
        });
    } 
}

const sendMessageToDiscordController= async (req,res)=>{
    try{
        const sendMessageToDiscord= await smsDiscordService.sendMessageToDiscord(req,res);
        res.status(201).json({status: 'OK', message: 'Poprawnie wysłano wiadomośc do serwisu Discord!'});
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Wystąpił bład w trakcie wysyłania wiadomości do serwisu Discord!"
        });
    } 
}

module.exports={sendSmsToPhoneController, sendMessageToDiscordController};