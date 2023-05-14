const cron = require("node-cron");
const axios = require('axios');

const url = `http://localhost:9005/getData`;
const urlMail = `http://localhost:9005/email`;
const urlSms = `http://localhost:9005/sms`;
const urlDiscord = `http://localhost:9005/discord`;

let sendSms=false;
let sendEmail=false;
let sendDiscordMessage=false;
let arrOfJobs=[];

const sendNotificationJob = async (req,res)=>{

  let dataToSend = {
    data: null,
    user: null
  };

  try {

    let {godzina_maila, repeat_after_specified_time, phrase, request_number, user_id} =  req.body;
    let requestArray=[];
    let websites=[];
    let services=[];
    let hour='';
    let minute='';

    for (item in req.body){
      if(req.body.hasOwnProperty(item)) {
        let value = req.body[item];

        if(value){
          if(item=='olx' || item=='amazon'|| item=='allegro'|| item=='pepper') websites.push(item);
          else if(item=='email' || item=='sms'|| item=='discord') services.push(item);
          else requestArray.push(item)
        }
      }
    }
    
    let objData = {
      websites : websites,
      phrase: phrase,
      request_number: request_number
    };

    services.forEach(el=>{
      if (el==='email') sendEmail=true;
      if (el==='sms') sendSms=true;
      if (el==='discord') sendDiscordMessage=true;
    })

    arrOfJobs.forEach(elem=>{
      if(elem[1]===user_id){
        elem[0].stop();
        console.log("Job został zatrzymany dla użytkownika "+user_id);
      }
    });

    if( godzina_maila !== null ) {

      let cronTime=godzina_maila.split(":");
      hour=cronTime[0];
      minute=cronTime[1];

      const cronStr=`${minute} ${hour} * * *`;
      var valid = cron.validate(cronStr);

      if(valid){

        const job = cron.schedule(cronStr, async () => {

          const getDataFromMethod= await axios.post(url, objData)
          .then((res) => {
          return res.data;
          })
          .catch((err) => {
            console.error(err);
          });

          dataToSend.data=getDataFromMethod;
          dataToSend.user=user_id;

          //TU WYSYŁAMY MAILA
          if(sendEmail){
            const sendMail=await axios.post(urlMail, dataToSend)
            .then((res) => {
              return res.data;
            })
            .catch((err) => {
              console.error(err);
            });
          }

          //TU WYYSŁAMY WIADOMOŚC DISCORD
          if(sendDiscordMessage){
            const sendDiscord=await axios.post(urlDiscord, dataToSend)
            .then((res) => {
              return res.data;
            })
            .catch((err) => {
              console.error(err);
            });
          }

           //TU WYYSŁAMY WIADOMOŚC SMS
          if(sendSms){
            const sendSMS=await axios.post(urlSms, dataToSend)
            .then((res) => {
              return res.data;
            })
            .catch((err) => {
              console.error(err);
            });
          }
        },{
          scheduled: true,
          timezone: "Europe/Warsaw"
        });
        arrOfJobs.push([job,user_id]);
        console.log("Poprawnie udało się zarejestrować job do wykonywania zadań");
      }
      else{
        throw new Error("Niepoprawnie ustawiony cron do wykonywania zadań!");
      }  
    }
    else if(repeat_after_specified_time!==0){
      const cronStr=`*/${repeat_after_specified_time} * * * *`;
      var valid = cron.validate(cronStr);

      if(valid){
         const job =  cron.schedule(cronStr, async () => {

          const getDataFromMethod= await axios.post(url, objData)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            console.error(err);
          });

          dataToSend.data=getDataFromMethod;
          dataToSend.user=user_id;

          //TU WYSYŁAMY MAILA
          if(sendEmail){
            const sendMail=await axios.post(urlMail, dataToSend)
            .then((res) => {
              return res.data;
            })
            .catch((err) => {
              console.error(err);
            });
          }

          //TU WYYSŁAMY WIADOMOŚC DISCORD
          if(sendDiscordMessage){
            const sendDiscord=await axios.post(urlDiscord, dataToSend)
            .then((res) => {
              return res.data;
            })
            .catch((err) => {
              console.error(err);
            });
          }

          //TU WYYSŁAMY WIADOMOŚC SMS
          if(sendSms){
            const sendSMS=await axios.post(urlSms, dataToSend)
            .then((res) => {
              return res.data;
            })
            .catch((err) => {
              console.error(err);
            });
          }
         },{
           scheduled: true,
           timezone: "Europe/Warsaw"
         });
        arrOfJobs.push([job,user_id]);
        console.log("Poprawnie udało się zarejestrować job do wykonywania zadań");

      }
      else{
        throw new Error("Niepoprawnie ustawiony cron do wykonywania zadań!");
      }
    }
    else{
      console.log("Tylko usunięto Joby!")
    }

    res.status(201).json({status: 'OK', message: 'Poprawnie udało się zarejestrować joby do wykonywania zadań!'});
  }
  catch(err){
    console.error(err)
    res.status(500).send({
        message: err.message || "Wystąpił bład w trakcie wykonywania zapytania!"
    });
  } 
}

module.exports={sendNotificationJob};