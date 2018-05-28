/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 *
 *
 */

const http = require('http');
const qs = require('querystring');
var responseText = {
"fulfillmentText": "",
"fulfillmentMessages": [],
"source": "example.com",
"payload": {},
"outputContexts": [],
"followupEventInput": {}
};

exports.eYantraWebHook = (req, res) => {
  let queryResult = req.body.queryResult;
  var reply;
  console.log("====> displayName : "+ queryResult.intent.displayName);
  if(queryResult.intent.displayName == "auth_token") {
    var email_id = queryResult.parameters.email;
    var pass = queryResult.parameters.password;
    var options = {
      "method": "POST",
      "hostname": "432345e0.ngrok.io",
      "port": null,
      "path": "/auth/token",
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache"
      }
    };

    var request = http.request(options, function (response) {
      var chunks = "";

      response.on("data", function (chunk) {
        chunks+=chunk;
      });

      response.on("end", function () {
        var reply = JSON.parse(chunks);
        console.log("Reply from api "+chunks+" "+JSON.stringify(reply));
        if(reply.hasOwnProperty("user")) {
            responseText.fulfillmentText = "You are successfully logged in ;-) " + reply.user.name;
        }
        else {
            responseText.fulfillmentText = "Invalid password or username";
        }
        res.status(200).send(JSON.stringify(responseText));
      });
    });

    request.write(qs.stringify({ email: email_id, password: pass }));
    request.end();
  }
  else {
    res.status(200).send(JSON.stringify({
      "fulfillmentText": "This is a else text response from gcp",
      "fulfillmentMessages": [
      ],
      "source": "https://us-central1-my-weather-e9394.cloudfunctions.net/eYantraWebHook",
      "payload": {
      },
      "outputContexts": [
      ],
      "followupEventInput": {
      }
    }));
  }
};