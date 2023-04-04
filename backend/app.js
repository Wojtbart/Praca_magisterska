const express=require('express');
const process = require("process");
const path = require('path');
const cors = require('cors');
const discord = require('./servicelayer/discord');
const email = require('./servicelayer/email_service');
const {Sequelize, DataTypes} = require("sequelize");
// const ini = require('ini');
// const fs = require('fs');
// const config = ini.parse(fs.readFileSync('./config.ini','utf-8'));
const PORT=process.env.PORT || 9005;
const users=require('./servicelayer/users');

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.set('view engine', 'pug')
app.set("views", path.join(__dirname, "views"));

// app.use(require('./routes'));

app.get('/', (req, res) => {
  res.render('index',{title:'Projekt z mikroserwisami'});
});

// app.post('/register-user', (req, res) => {
// 	let {name,lastName,email,password,confirmPassword,phone} =  req.body;
// 	 User.create({
// 	  name: name,
// 	  lastName:lastName,
// 	  email:email,
// 	  password:password,
// 	  phone:phone
// 	}).then(function(item){
//   res.json({
//     "Message" : "Created item.",
//     "Item" : item
//   });
// }).catch(function (err) {
//   // handle error;
// });
// 	if (error) throw error;
// 	  res.status(201).send({
// 		message: 'Poprawnie dodano użytkownika!',
// 		//data: user
// 	  })
// });



// const sequelize = new Sequelize(
//     config.mysql.database,
//     config.mysql.user,
//     config.mysql.password,
//     {
//         host: config.mysql.host,
//         dialect: 'mysql'
//     }
// );

//const allOLXArticles= async () =>{
//    var OLXArticles={};

//    try {
//        OLXArticles= await OLX_articles_models.findAll(); 
//        console.log(OLXArticles.every(user => user instanceof OLX_articles_models)); // true
//    } catch (err) {
//       console.log(err)    
//    }
 //   return OLXArticles;
//};

app.get('*', (req, res) => {
  res.status(404).send('Nie znaleziono')
})
const emailKtóryWyłączyć=1;
//pozostałę endpointy
app.post(`/stopSendingEmail/:userId?emailId=${emailKtóryWyłączyć}`, (req, res) => {

  res.status(201).send({
    message: 'Email wyłączony!',
    data: user
  })
});

app.post('/addRequest', (req, res) => {

  res.status(201).send({
    message: 'Dodano request!',
    data: user
  })
});

app.post('/addEmailTemplate', (req, res) => {

  res.status(201).send({
    message: 'Dodano szablon!',
    data: user
  })
});




app.post('/sms', discord.sendSmstoPhone);
app.post('/email', email.mailService);
app.post('/discord',discord.sendSmstoDiscordService);
app.post('/registerUser', users.registerUser);
app.post('/getUser', users.getUser);

app.use('/login', (req, res) => {
  res.send({
    token: 'test1234'
  });
});


// error handler
app.use(function(err, req, res, next) {
    
    res.locals.message = err.message; // set locals, only providing error in development
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);// render the error page
    res.render('error');
});

app.listen(PORT, ()=> console.log(`Nasłuchuje na porcie ${PORT} ...`));

module.exports = app;