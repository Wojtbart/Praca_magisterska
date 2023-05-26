const emailDal=require('../dataaccesslayer/emailsDal');

const sendMailService = async (req)=>{
  try {
    const sendMail = await emailDal.sendMail(req);
    return sendMail;
  } 
  catch (error) {
    return null;
  }
}

module.exports={sendMailService};