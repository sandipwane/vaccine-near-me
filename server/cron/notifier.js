// const mongoose  =  require('mongoose');
const RecipientModel = require("../database/recipentModel");
const axios = require("axios");
const moment = require("moment");
const _ = require("lodash");

const LIMIT = 10;

function fetchUpcomingDates(days = 5) {
  let dates = [];
  let today = moment();
  for (let i = 0; i < days; i++) {
    let dateString = today.format("DD-MM-YYYY");
    dates.push(dateString);
    today.add(1, "day");
  }
  return dates;
}

async function getAvailabilityForRecipeint(recipient) {
  const { email, pincode } = recipient;

  try {
    console.info(`checking slots for email ${email} for next 5 days`);
    const dates = fetchUpcomingDates();
    const sessionsList = await Promise.all(
      dates.map(async (date) => {
        const response = await axios.get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`
        );
        let sessions = [];
        if (response && response.data && response.data.sessions) {
          sessions = response.data.sessions;
        }

        // console.info({ pincode, date, sessions });
        return sessions;
      })
    );
    const sessions = _.flatMap(sessionsList.filter(session=> session.length));
    console.info({ email, sessions });
  } catch (error) {
    const message = _.get(error, "response.data.error");
    throw new Error(message);
  }
}

async function checkAvailabilityForRecipients(recipients) {
  for (const index in recipients) {
    try {
      await getAvailabilityForRecipeint(recipients[index]);
    } catch (error) {
        console.info(error)
    }
  }
  //   const promiseList = recipients.map(async (recipient) => {
  //     return await getAvailabilityForRecipeint(recipient);
  //   });

  //   return await Promise.all(promiseList);
}

async function notify() {
  // get 10 emails from recipient

  let records = await RecipientModel.find(
    {
      notified: false,
    },
    { _id: 1 }
  ).lean();
  let total = records ? records.length : 0;
  let skip = 0;
  while (skip < total) {
    const recipients = await RecipientModel.find({ notified: false })
      .lean()
      .skip(skip)
      .limit(LIMIT);

    await checkAvailabilityForRecipients(recipients);
    skip = skip + LIMIT;
  }

  // skip(10).limit(5)

  // iterate and get their data for next 5 days

  // if data is present send email and mark as notified
}

module.exports = notify;
