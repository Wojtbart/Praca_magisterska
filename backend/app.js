const express=require('express');
const process = require("process");
const path = require('path');
const cors = require('cors');

// const users=require('./servicelayer/users');
// const discord = require('./servicelayer/discord');
// const email = require('./servicelayer/email_service');

var notificationServices = require('./routes/notificationServices');
var users = require('./routes/users');

const PORT=process.env.PORT || 9005;

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.set('view engine', 'pug')
app.set("views", path.join(__dirname, "views"));

// ENDPOINTS
// app.get('/', (req, res) => {
//   res.render('index',{title:'Projekt z mikroserwisami'});
// });

app.use('/login', (req, res) => {
  res.send({
    token: 'test_token'
  });
});

app.use('/', notificationServices);
app.use('/', users);

// app.post('/addEmailTemplate',email.addEmailTemplate);
// app.post('/sms', discord.sendSmstoPhone);
// app.post('/email', email.mailService);
// app.post('/discord',discord.sendSmstoDiscordService);

//error handler
app.use(function(req, res, next) {
  var err = new Error('Nie znaleziono tej strony');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
    res.locals.message = err.message; 
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

app.listen(PORT, ()=> console.log(`Listening on ${PORT} ...`));

module.exports = app;