const Users=require('../models/Users_model');
const ini = require('ini');
const fs = require('fs');
const path = require("path")
const config = ini.parse(fs.readFileSync('../config.ini','utf-8'));
const nodemailer = require('nodemailer');
const handlebars = require("handlebars");

const sendMail = async (req)=>{

    let receiver=null;  
    let {user,data}=req.body;

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
                console.error(error);
            } else {
                console.log("Server SMTP jest gotowy na przyjmowanie wiadomości!");
            }
        });

        receiver= await Users.Users_models.findOne({
            where: {
                id: parseInt(user) 
            }
        }); 

        // Rejestracja bloku pomocniczego `or`
        handlebars.registerHelper('or', function(a, b) {
            return a || b;
        });
        
        // Rejestracja bloku pomocniczego `eq`
        handlebars.registerHelper('eq', function(a, b) {
            return a === b;
        });
        
        const emailTemplateSource = fs.readFileSync(path.join(__dirname, "../templates/template.hbs"), "utf8");

        const tableTemplate = handlebars.compile(emailTemplateSource);
        
        const htmlToSend = tableTemplate({ arrayOlx: data.olx_data, arrayPepper: data.pepper_data, arrayAmazon: data.amazon_data, arrayAllegro: data.allegro_data });

        let mailOptions =  {
            from: config.email.mailSender, 
            to: receiver.email, 
            subject: "Oferty sprzedażowe - mailing!",
            html: htmlToSend
        };

        return mailTransporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.error("Wystąpił błąd:", err.message);
            } else {
                console.log("---------------------");
                console.log("Email został wysłany prawidłowo, komunikat: "  + data.response);
            }
        });
    } catch (err) {
       console.error(err);
    }
}

module.exports={sendMail};