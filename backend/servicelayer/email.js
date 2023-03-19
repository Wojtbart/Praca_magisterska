var nodemailer = require('nodemailer');
  
  function mailService(){
    // let transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: testAccount.user, // generated ethereal user
    //     pass: testAccount.pass, // generated ethereal password
    //   },
    // });

  //korzystam z gmaila
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shipgamesender@gmail.com",
// use generated app password for gmail
     // pass: "okretyOkrety2",
      pass: "xksigqjsowczylik"      
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
      text: "Node.js Cron Job Email Demo Test from Wojtek", // plain text body
     // html: "<b>Hello world?</b>", // html body
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
// mailService();