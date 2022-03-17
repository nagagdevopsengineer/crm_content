module.exports = {
    /**
     * crons.
     */
    '*/5 * * * * *': () => {
      console.log("file: cron.js ~ executing action ~Every 5sec");
    },  
    '*/10 * * * * *': () => {
      console.log("~ file: cron.js ~ executing action ~Every 10sec");
    },
    '* */5 * * * *': () => {
      console.log(" file: cron.js ~ executing action ~Every 5min");
    },
    '* * */5 * * *': () => {
      console.log(" ~ file: cron.js ~ executing action ~Every 5hour");
    },   
  };