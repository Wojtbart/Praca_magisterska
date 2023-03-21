const cron = require("node-cron");

console.log('Zaczynam');

const job = cron.schedule("*/1 * * * *", () => {
  // mailService();
  console.log(new Date().toLocaleString());
},{
  scheduled: true,
  timezone: "Europe/Warsaw"
});

var valid = cron.validate('59 * * * *');
var invalid = cron.validate('60 * * * *');
console.log(valid);
console.log(invalid);

// job.start();
// job.stop();