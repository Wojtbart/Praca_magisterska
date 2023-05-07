const cron = require("node-cron");
const axios = require('axios');

const url = `http://localhost:9005/getData`;
const urlMail = `http://localhost:9005/email`;
const urlSms = `http://localhost:9005/sms`;
const urlDiscord = `http://localhost:9005/discord`;

let sendSms=false;
let sendEmail=false;
let sendDiscordMessage=false;

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

    for (item in req.body){
      if(req.body.hasOwnProperty(item)) {
        var value = req.body[item];
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

    let hour='';
    let minute='';
    const data=req.body;

    services.forEach(el=>{
      if (el==='email') sendEmail=true;
      if (el==='sms') sendSms=true;
      if (el==='discord') sendDiscordMessage=true;
    })

    if(godzina_maila !== null ) {

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
      }
      else{
        throw new Error("Niepoprawnie ustawiony cron do wykonywania zadań!");
      }  
    }
    else{

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

      }
      else{
        throw new Error("Niepoprawnie ustawiony cron do wykonywania zadań!");
      }
    }
    res.status(201).json({status: 'OK', message: 'Poprawnie zarejestrowano użytkownika!',data:data});
  }
  catch(err){
      console.error(err)
      res.status(500).send({
          message: err.message || "Wystąpił bład w trakcie wykonywania zapytania!"
      });
  } 
}

// TODO JAK USUWAC JOBY

// const job = cron.schedule("*/1 * * * *", () => {
//   // mailService();
//   console.log(new Date().toLocaleString());
// },{
//   scheduled: true,
//   timezone: "Europe/Warsaw"
// });

// var valid = cron.validate('59 * * * *');
// console.log(typeof valid);
// var invalid = cron.validate('60 * * * *');
// console.log(valid);
// console.log(invalid);

// job.start();
// job.stop();
// const cronList = []
// cronList.push(new CronJob('* * * * * *', () => {
//         ...
// }));
// cronList.forEach((cron) => cron.stop()) 
// https://www.reddit.com/r/node/comments/maeshx/cant_stop_cron_job_using_nodecron/
// https://medium.com/@usamayousuf_62526/schedule-tasks-with-cron-job-in-node-js-1f03ad44a627



module.exports={sendNotificationJob};