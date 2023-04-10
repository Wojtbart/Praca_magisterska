const Users=require('../models/Users_model');
const ini = require('ini');
const fs = require('fs');
const config = ini.parse(fs.readFileSync('../config.ini','utf-8'));
const nodemailer = require('nodemailer');

const sendMail = async (req,res)=>{
    let user=null;

    try {

        let mailTransporter = nodemailer.createTransport({
            service: "gmail",  
            auth: {
              user: config.email.mailSender,
              pass: config.email.mailSenderPassword     
            },
            tls: {
              rejectUnauthorized: false,
            }
        });
    
        mailTransporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server SMTP jest gotowy na przyjmowanie wiadomości!");
            }
        });

        user= await Users.findOne({
            where: {
                login: "test" //TO DO pobierac login uzytkownika
            }
        }); 
    
        let info =  {
            from: config.email.mailSender, // sender address '"Wojtek TEST 👻"shipgamesender@gmail.com'
            to: user.email, 
            subject: "Oferty sprzedażowe - mailing",
            text: "Test mail sprzedażowego", // plain text body // html: "<b>Hello world?</b>", // html body
        };
    
        mailTransporter.sendMail(info, function (err, data) {
            if (err) {
                console.log("Wystąpił błąd:", err.message);
            } else {
                console.log("---------------------");
                console.log("Email został wysłany prawidłowo, komunikat: "  + data.response);
            }
        });

    } catch (err) {
       console.log(err);
    }
}

module.exports={sendMail};