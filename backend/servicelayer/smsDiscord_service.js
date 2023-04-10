const smsDiscordDal=require('../dataaccesslayer/smsDiscordDal');

const sendSms = async (req,res)=>{
    
  const sendSms = await smsDiscordDal.sendSms();
  return (sendSms);
}

const sendMessageToDiscord = async (req,res)=>{
    
  const sendMessageToDiscord = await smsDiscordDal.sendMessageToDiscord(req,res);
  return (sendMessageToDiscord);
}

module.exports={sendSms, sendMessageToDiscord};