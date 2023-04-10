const emailService=require('../servicelayer/email_service');

const sendMailController= async (req,res)=>{
    try{
        const sendMail= await emailService.sendMailService();
        res.status(201).json({status: 'OK', message: 'Poprawnie wysłano email!'});
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Wystąpił bład w trakcie wysyłania maila!"
        });
    } 
}

module.exports={sendMailController};