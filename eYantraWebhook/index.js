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

exports.eYantraWebhook = (req, res) => {
    let queryResult = req.body.queryResult;
    var reply;

    console.log("====> displayName : "+ queryResult.intent.displayName);
    switch (queryResult.intent.displayName) {
        case "cron.add":
        {
            var email_id = queryResult.parameters.email;
            var pass = queryResult.parameters.password;
            var options = {
                    "method": "POST",
                    "hostname": "432345e0.ngrok.io",
                    "port": null,
                    // change required
                    "path": "",
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
                // change required
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

            // change required
            request.write(qs.stringify({ email: email_id, password: pass }));
            request.end();
        }
        break;

        case "cron.delete":
        {
            var email_id = queryResult.parameters.email;
            var pass = queryResult.parameters.password;
            var options = {
                    "method": "POST",
                    "hostname": "432345e0.ngrok.io",
                    "port": null,
                    // change required
                    "path": "",
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
                // change required
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

            // change required
            request.write(qs.stringify({ email: email_id, password: pass }));
            request.end();
        }
        break;

        case "cron.delete-it":
        {
            var email_id = queryResult.parameters.email;
            var pass = queryResult.parameters.password;
            var options = {
                    "method": "POST",
                    "hostname": "432345e0.ngrok.io",
                    "port": null,
                    // change required
                    "path": "",
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
                // change required
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

            // change required
            request.write(qs.stringify({ email: email_id, password: pass }));
            request.end();
        }
        break;
        case "cron.get":
        {
            var email_id = queryResult.parameters.email;
            var pass = queryResult.parameters.password;
            var options = {
                    "method": "POST",
                    "hostname": "432345e0.ngrok.io",
                    "port": null,
                    // change required
                    "path": "",
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
                // change required
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

            // change required
            request.write(qs.stringify({ email: email_id, password: pass }));
            request.end();
        }
        break;
        case "cron.thing-it":
        {
            var email_id = queryResult.parameters.email;
            var pass = queryResult.parameters.password;
            var options = {
                    "method": "POST",
                    "hostname": "432345e0.ngrok.io",
                    "port": null,
                    // change required
                    "path": "",
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
                // change required
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

            // change required
            request.write(qs.stringify({ email: email_id, password: pass }));
            request.end();
        }
        break;
        case "pubsub.get":
        {
            var email_id = queryResult.parameters.email;
            var pass = queryResult.parameters.password;
            var options = {
                    "method": "POST",
                    "hostname": "432345e0.ngrok.io",
                    "port": null,
                    // change required
                    "path": "",
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
                // change required
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

            // change required
            request.write(qs.stringify({ email: email_id, password: pass }));
            request.end();
        }
        break;
        case "pubsub.get-it":
        break;
        case "pubsub.list":
        break;
        case "pubsub.set":
        break;
        case "pubsub.set-it":
        break;
        case "thing.add":
        break;
        case "thing.description-change-it-to":
        break;
        case "thing.get":
        break;
        case "thing.ip-change-it-to":
        break;
        case "thing.list":
        break;
        case "thing.list-it":
        break;
        case "thing.name-change-it-to":
        break;
        case "thing.parentID-change-it-to":
        break;
        case "thing.remove-description":
        break;
        case "thing.remove-ip":
        break;
        case "thing.set-description":
        break;
        case "thing.set-ip":
        break;
        case "thing.set-name":
        break;
        case "thing.set-parentID":
        break;
        case "thing.thing":
        break;
        case "thing.update":
        break;
        case "unit.add":
        break;
        case "unit.description-change-it-to":
        break;
        case "unit.get":
        break;
        case "unit.list":
        break;
        case "unit.list-it":
        break;
        case "unit.name-change-it-to":
        break;
        case "unit.get":
        break;
        case "unit.list":
        break;
        case "unit.list-it":
        break;
        case "unit.name-change-it-to":
        break;
        case "unit.parentID-change-it-to":
        break;
        case "unit.remove-description":
        break;
        case "unit.remove-parentID":
        break;
        case "unit.set-description":
        break;
        case "unit.set-name":
        break;
        case "unit.set-parentID":
        break;
        case "unit.unit":
        break;
        case "unit.update":
        break;
        default:

    }
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
          "fulfillmentMessages": [],
          "source": "https://us-central1-my-weather-e9394.cloudfunctions.net/eYantraWebHook",
          "payload": {},
          "outputContexts": [],
          "followupEventInput": {}
        }));
    }
};
