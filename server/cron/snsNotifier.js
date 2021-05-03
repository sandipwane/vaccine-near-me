const AWS = require("aws-sdk");
const credentials = new AWS.SharedIniFileCredentials({
  profile: "sns-profile",
});
const sns = new AWS.SNS({ credentials: credentials, region: "ap-south-1" });

/* function sendSMS(contact) {
  let params = {
    Protocol: "SMS",
    TopicArn: "arn:aws:sns:ap-south-1:046720774361:Vaccine-Jugaad",
    Endpoint: contact,
  };

  sns.subscribe(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
} */

function sendSMS(message, contact) {
  var params = {
    Message: message,
    PhoneNumber: "+91" + contact,
    MessageAttributes: {
      "AWS.SNS.SMS.SenderID": {
        DataType: "String",
        StringValue: "VCNEARME",
      },
    },
  };

  var publishTextPromise = sns.publish(params)
    .promise();

  publishTextPromise
    .then(function (data) {
      //   res.end(JSON.stringify({ MessageID: data.MessageId }));
      console.info(data);
    })
    .catch(function (err) {
      //   res.end(JSON.stringify({ Error: err }));
      console.error(err);
    });
}

module.exports = {
  sendSMS,
};
