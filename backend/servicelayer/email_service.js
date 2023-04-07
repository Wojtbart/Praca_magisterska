const emailDal=require('../dataaccesslayer/emailsDal');


// const ini = require('ini');
// const fs = require('fs');
// const config = ini.parse(fs.readFileSync('../config.ini','utf-8'));
// const nodemailer = require('nodemailer');
  
// function sendMailService(){

//   let mailTransporter = nodemailer.createTransport({
//     service: "gmail", 
//     auth: {
//       user: config.email.mailSender,
//       pass: config.email.mailSenderPassword     
//     },
//     tls: {
//       rejectUnauthorized: false,
//     }
//   });

//   mailTransporter.verify(function (error, success) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Server SMTP jest gotowy na przyjmowanie wiadomości");
//     }
//   });

//   let info =  {
//     // from: '"Fred Foo 👻"shipgamesender@gmail.com', // sender address
//     from: '"Wojtek TEST 👻"shipgamesender@gmail.com', // sender address
//     to: "wojtektokoxik@gmail.com", // list of receivers
//     subject: "Mail Testowy ✔", // Subject line
//     text: "Test mail Wojtek", // plain text body // html: "<b>Hello world?</b>", // html body
//   };

//   mailTransporter.sendMail(info, function (err, data) {
//     if (err) {
//       console.log("Wystąpił błąd:", err.message);
//     } else {
//       console.log("---------------------");
//       console.log("Email wysłany prawidłowo: "  + data.response);
//     }
//   });
// }

const sendMailService = async (req,res)=>{
    
  const sendMail = await emailDal.sendMail();
  return (sendMail);
}
// const  mailService= (req,res)=>{
// try{
//   sendMailService();

//   res.status(201).send({
//     message: 'Udało się wysłać maila!'
//   })
// }
// catch(err){
//     res.status(500).send({
//         message: err.message || "Wystąpił bład w trakcie wykonywania zapytania!"
//     });
// } 
// }

// const  addEmailTemplate= (req,res)=>{
// // try{
// //   sendMailService();

// //   res.status(201).send({
// //     message: 'Udało się wysłać maila!'
// //   })
// // }
// // catch(err){
// //     res.status(500).send({
// //         message: err.message || "Wystąpił bład w trakcie wykonywania zapytania!"
// //     });
// // } 
// }

module.exports={sendMailService};