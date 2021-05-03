const cron = require("node-cron");
const notify = require("./notifier");

async function init() {
  try {
    console.info("Cron Job initializing...");
    // await notify();
    cron.schedule("* * * * *", async () => {
      console.info("Cron Job called at ", Date.now());
      await notify();
    });
  } catch (e) {
    console.log("an error occured: " + JSON.stringify(e, null, 2));
    throw e;
  }
}

module.exports = {
  init,
};
