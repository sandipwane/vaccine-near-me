const cron = require("node-cron");

async function init() {
  try {
    console.info("Cron Job initializing...");  
    cron.schedule("* * * * *", async () => {
      console.info("Cron Job called at ", Date.now());
    });
  } catch (e) {
    console.log("an error occured: " + JSON.stringify(e, null, 2));
    throw e;
  }
}

module.exports = {
  init,
};
