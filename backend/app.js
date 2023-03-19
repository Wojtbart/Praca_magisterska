const express=require('express');
const process = require("process");
const path = require('path');
const cors = require('cors');
const discord = require('./servicelayer/discord');
const PORT=process.env.PORT || 9005;

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


app.post('/testowa', discord.sendSmToDiscord);


// error handler
app.use(function(err, req, res, next) {
    
    res.locals.message = err.message; // set locals, only providing error in development
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);// render the error page
    res.render('error');
});

app.listen(PORT, ()=> console.log(`Nasłuchuje na porcie ${PORT} ...`));

module.exports = app;