const ini = require('ini');
const fs = require('fs');
const config = ini.parse(fs.readFileSync('../config.ini','utf-8'));
const nodemailer = require('nodemailer');
  
  function sendMailService(){

    let mailTransporter = nodemailer.createTransport({
      service: "gmail", //korzystam z gmaila
      auth: {
        user: config.email.mailSender,
        pass: config.email.mailSenderPassword     
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    let info =  {
      // from: '"Fred Foo 👻"shipgamesender@gmail.com', // sender address
      from: '"Wojtek Kox 👻"shipgamesender@gmail.com', // sender address
      to: "wojtektokoxik@gmail.com", // list of receivers
      subject: "Mail Testowy ✔", // Subject line
      text: "Node.js Cron Job Email Demo Test from Wojtek", // plain text body // html: "<b>Hello world?</b>", // html body
    };

    mailTransporter.sendMail(info, function (err, data) {
      if (err) {
        console.log("Wystąpił błąd:", err.message);
      } else {
        console.log("---------------------");
        console.log("Email wysłany prawidłowo: "  + data.response);
      }
    });
}
const  mailService= (req,res)=>{
  try{
    sendMailService();

    res.status(201).send({
      message: 'Udało się wysłać maila!'
    })
  }
  catch(err){
      res.status(500).send({
          message: err.message || "Wystąpił bład w trakcie wykonywania zapytania!"
      });
  } 
}
module.exports={mailService};