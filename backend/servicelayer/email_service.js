const emailDal=require('../dataaccesslayer/emailsDal');

const sendMailService = async (req,res)=>{
    
  const sendMail = await emailDal.sendMail(req);
  return (sendMail);
}

const addEmailTemplate= (req,res)=>{

}

module.exports={sendMailService, addEmailTemplate};