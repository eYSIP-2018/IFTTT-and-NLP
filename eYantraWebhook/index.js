/*
    WebHook for DialogFlow assistant in JavaScript
    To be deployed on webhooks like Google Cloud Functions, AWS Lambda, etc.

    Auther:
        Onk_r Sathe
        RathiRohit
*/

//Get natural-cron.js library for converting english phrases to cron expressions
const getCronString = require('./natural-cron/src/readableToCron').getCronString;

//JSON Object with details of Project, Server and Endpoint API Details
var fulfillment = {
    //DialogFlow project details
    "project": {
        "projectID": "eyantra-iot-f0957"
    },
    //Basic response format of DialogFlow
    "basic_response" : {
        "fulfillmentText": "",
        "fulfillmentMessages": [],
        "source": "example.com",
        "payload": {},
        "outputContexts": [],
        "followupEventInput": {}
    },
    //IoT platform's server details
    "server" : {
        "protocol" : "http",
        "hostname" : "127.0.0.1",
        "port" : 8002
    },
    //Intent <=> API endpoint mapping
    "create.thing": {
        "thing" : {
            "endpoint" : "/thing/create",
            "type" : "POST",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "name" : "",
                "description" : "",
                "ip" : "",
                "parentUnitId" : 1
            }
        }
    },
    "create.unit" : {
        "unit" : {
            "endpoint" : "/unit/create",
            "type" : "POST",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "unitName" : "",
                "description" : "",
                "photo" : "",
                "parentUnitId" : 1
            }
        }
    },
    "create.cron" : {
        "cron" : {
            "endpoint" : "/thing/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        }
    },
    "create.attribute" : {
        "attribute" : {
            "endpoint" : "/thing/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        }
    },
    "create.device" : {
        "device" : {
            "endpoint" : "/device/create",
            "type" : "POST",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "name" : "",
                "description" : "",
                "parentThingId" : 0,
                "ownerUnitId" : 0
            }
        }
    },
    "unit.subunits" : {
        "unit" : {
            "endpoint" : "/unit/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        }
    },
    "object.set-param" : {
        "thing" : {
            "endpoint" : "/thing/update/",
            "type" : "PUT",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "name" : "",
                "description" : "",
                "ip" : ""
            }
        },
        "unit" : {
            "endpoint" : "/unit/update/",
            "type" : "PUT",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "unitName" : "",
                "description" : "",
                "photo" : ""
            }
        },
        "device" : {
            "endpoint" : "/device/update/",
            "type" : "PUT",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "name" : "",
                "description" : "",
            }
        }
    },
    "object.param-change-it-to" :{
        "thing" : {
            "endpoint" : "/thing/update/",
            "type" : "PUT",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "name" : "",
                "description" : "",
                "ip" : ""
            }
        },
        "unit" : {
            "endpoint" : "/unit/update/",
            "type" : "PUT",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "unitName" : "",
                "description" : "",
                "photo" : ""
            }
        },
        "device" : {
            "endpoint" : "/device/update/",
            "type" : "PUT",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "name" : "",
                "description" : "",
            }
        }
    },
    "object.rem-param" : {
        "thing" : {
            "endpoint" : "/thing/update/",
            "type" : "PUT",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "name" : "",
                "description" : "",
                "ip" : ""
            }
        },
        "unit" : {
            "endpoint" : "/unit/update/",
            "type" : "PUT",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "unitName" : "",
                "description" : "",
                "photo" : ""
            }
        },
        "device" : {
            "endpoint" : "/device/update/",
            "type" : "PUT",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "name" : "",
                "description" : "",
            }
        }
    },
    "object.get-param" : {
        "thing" : {
            "endpoint" : "/thing/get/",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {}
        },
        "unit" : {
            "endpoint" : "/unit/get/",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {}
        },
        "device" : {
            "endpoint" : "/device/get/",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {}
        },
        "user" : {
            "endpoint" : "/user/get/",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {}
        }
    },
    "object.delete - yes" : {
        "thing" : {
            "endpoint" : "/thing/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "unit" : {
            "endpoint" : "/unit/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "user" : {
            "endpoint" : "/user/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "device" : {
            "endpoint" : "/device/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "cron" : {
            "endpoint" : "/cron/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        }
    },
    "object.list": {
        "thing" : {
            "endpoint" : "/thing/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "unit" : {
            "endpoint" : "/unit/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "user" : {
            "endpoint" : "/user/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "device" : {
            "endpoint" : "/device/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "cron" : {
            "endpoint" : "/cron/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        }
    },
    "object.list-it": {
        "thing" : {
            "endpoint" : "/thing/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "unit" : {
            "endpoint" : "/unit/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "user" : {
            "endpoint" : "/user/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "device" : {
            "endpoint" : "/device/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "cron" : {
            "endpoint" : "/cron/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        }
    },
    "object.action-id-by-name": {
        "thing" : {
            "endpoint" : "",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "unit" : {
            "endpoint" : "",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "unit-subunits" : {
            "endpoint" : "/unit/subunits/",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {}
        },
        "user" : {
            "endpoint" : "",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "cron" : {
            "endpoint" : "/thing/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "attribute" : {
            "endpoint" : "/attribute/create",
            "type" : "POST",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : false,
            "apiInput" : {
                "name" : "",
                "type" : "",
                "def" : "",
                "parentDeviceId" : "",
                "ownerUnitId" : ""
            }
        },
        "pubsubShadow": {
            "endpoint" : "/pubsub/shadow/",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "pubsubValue": {
            "endpoint" : "/pubsub/value/",
            "type" : "POST",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "value" : "",
                "id" : ""
            }
        }
    },
    "object.get-name": {
        "thing" : {
            "endpoint" : "/thing/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "unit" : {
            "endpoint" : "/unit/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "user" : {
            "endpoint" : "/user/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "device" : {
            "endpoint" : "/device/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "cron" : {
            "endpoint" : "/cron/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
    },
    "object.delete-all - yes": {
        "thing" : {
            "endpoint" : "/thing/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "unit" : {
            "endpoint" : "/unit/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "user" : {
            "endpoint" : "/user/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "device" : {
            "endpoint" : "/device/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "cron" : {
            "endpoint" : "/cron/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        }
    },
    "object.delete": {
        "thing" : {
            "endpoint" : "/thing/delete/",
            "type" : "DELETE",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "unit" : {
            "endpoint" : "/unit/delete/",
            "type" : "DELETE",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "user" : {
            "endpoint" : "/user/delete/",
            "type" : "DELETE",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "device" : {
            "endpoint" : "/device/delete/",
            "type" : "DELETE",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "cron" : {
            "endpoint" : "/cron/delete/",
            "type" : "DELETE",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        }
    },
    "pubsub.get-shadow-by-name" : {
        "pubsub": {
            "endpoint" : "/pubsub/attribute/",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "str" : ""
            }
        }
    },
    "pubsub.set-value-by-name" : {
        "pubsub": {
            "endpoint" : "/pubsub/attribute/",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : "",
                "value" : ""
            }
        }
    },
    "pubsub.get-shadow-by-context" : {
        "pubsub": {
            "endpoint" : "/pubsub/attribute/",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "str" : ""
            }
        }
    },
    "pubsub.set-value-by-context" : {
        "pubsub": {
            "endpoint" : "/pubsub/attribute/",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : "",
                "value" : ""
            }
        }
    },
    "create.cron-add-details" : {
        "cron": {
            "endpoint" : "/cron/create",
            "type" : "POST",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "thingId" : "",
                "name" : "",
                "cronExpression" : "",
                "desiredState" : ""
            }
        }
    },
    "object.get-it" : {
        "thing" : {
            "endpoint" : "/thing/get/",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {}
        },
        "unit" : {
            "endpoint" : "/unit/get/",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {}
        },
        "device" : {
            "endpoint" : "/device/get/",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {}
        },
        "user" : {
            "endpoint" : "/user/get/",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {}
        }
    }
};

//Including requirements for making REST calls to API endpoints
const http = require('http');
const qs = require('querystring');

var queryResult;
var responseText = Object.assign({},fulfillment["basic_response"]);
var intent;
var objectType;
var options;
var reply;
var conversationId;

//Find perticular Key in JSON recursively and return it's value, returns NULL if Key not found
function findKey(key, data) {
    for(var dataKey in data) {
        if(dataKey == key)
            return data[dataKey];
        else if(typeof(data[dataKey]) === "object") {
            var val = findKey(key, data[dataKey]);
            if(val != null)
                return val;
        }
    }
    return null;
}

//find key value from contexts
function fromOutputContext(outputContexts,context,key) {
    for(let outputContext of outputContexts) {
        let contextName = outputContext.name;
        contextName = contextName.slice(contextName.lastIndexOf('/')+1);
        if(contextName == context) {
            return outputContext.parameters[key];
        }
    }
    return null;
}


//Function to make HTTP requests with given Options, Input data & Callback function
function sendRequest(options, apiInput, callback) {
    var request = http.request(options, function (response) {
        var chunks = "";

        response.on("data", function (chunk) {
            chunks+=chunk;
        });

        response.on("end", function () {
            reply = JSON.parse(chunks);
            callback(reply,this.statusCode);
        });
    });
    //If data has to be send with request
    if(apiInput != null)
        request.write(qs.stringify(apiInput));
    request.end();
}

//Main Webhook function
exports.eYantraWebhook = (req, res) => {
    //Check if request has all the required parameters in JSON
    if(req.hasOwnProperty("body") && req.body.hasOwnProperty("queryResult") && req.body.queryResult.hasOwnProperty("intent") && req.body.queryResult.intent.hasOwnProperty("displayName")) {

        //Take out all required major Values from request JSON
        queryResult = req.body.queryResult;
        intent = queryResult.intent.displayName;
        objectType = findKey("object", queryResult);
        token = findKey("accessToken", req.body);
        conversationId = findKey("conversationId", req.body);

        //Initialize responseText with default response JSON
        responseText = Object.assign({},fulfillment["basic_response"]);

        //Check if auth token is available (for requests from web assistant)
        if(token == null) {
            token = findKey("session",req.body);
            if(token != null)
                token = token.split('/').pop();
        }

        //If token is not available
        if(token == null) {
            responseText.fulfillmentText = "not authenticated!";
            res.status(200).send(JSON.stringify(responseText));
        }

        //Set corresponding API endpoint options
        console.log(intent + " " + objectType);
        options = {
            "method": fulfillment[intent][objectType]["type"],
            "hostname": fulfillment["server"]["hostname"],
            "port": fulfillment["server"]["port"],
            "path":  fulfillment[intent][objectType]["endpoint"],
            "headers": {
                "content-type": fulfillment[intent][objectType]["content_type"],
                "cache-control": "no-cache",
                "Cookie": "authorization=; authorization="+token
            }
        };

        //Process intents seperately
        switch(intent) {
            /*Done*/
            case "create.thing" : {
                let apiInput = fulfillment[intent][objectType]["apiInput"];
                apiInput.name = queryResult.parameters.name;
                if(queryResult.parameters.hasOwnProperty("description"))
                    apiInput.description = queryResult.parameters.description;
                if(queryResult.parameters.hasOwnProperty("ip"))
                    apiInput.description = queryResult.parameters.ip;
                apiInput.parentUnitId = queryResult.parameters.parentUnitId;
                console.log("inside thing.create "+options.hostname+options.path);
                sendRequest(options,apiInput,function(reply,statusCode){
                    console.log("inside created " + statusCode);
                    if(statusCode!= "200") {
                        responseText.fulfillmentText = "not authenticated !";
                    }
                    else {
                        if(reply.hasOwnProperty('success')){
                            responseText.fulfillmentText = "Thing created but alredy topic rule is exist!";
                        }
                        else {
                            responseText.fulfillmentText = "Thing created with Id : "+reply.id + " Name : " + reply.name + " parentUnit : " + reply.parentUnit.id + " "+reply.parentUnit.unitName;
                        }
                        responseText.outputContexts = [{
                            "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/object",
                            "lifespanCount": 5,
                            "parameters": {
                              "object" : "thing",
                              "id" : reply.id,
                              "name": apiInput.name
                            }
                        }];
                    }
                    res.status(200).send(JSON.stringify(responseText));
                });
            }
            break;

            /*Done*/
            case "create.unit" : {
                let apiInput = fulfillment[intent][objectType]["apiInput"];
                apiInput.unitName = queryResult.parameters.name;
                if(queryResult.parameters.hasOwnProperty("description"))
                    apiInput.description = queryResult.parameters.description;
                apiInput.parentUnitId = queryResult.parameters.parentUnitId;
                console.log("inside unit.create "+options.hostname+options.path);
                sendRequest(options,apiInput,function(reply,statusCode){
                    console.log("inside created " + statusCode);
                    let description="";
                    if(reply.hasOwnProperty("description"))
                        description = reply.description;
                    if(statusCode!= "200") {
                        responseText.fulfillmentText = "not authenticated !";
                    }
                    else {
                        responseText.fulfillmentText = "Unit created with id : " + reply.id + " Name : " + reply.unitName + " " + description;
                        responseText.outputContexts = [{
                            "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/object",
                            "lifespanCount": 5,
                            "parameters": {
                              "object" : "unit",
                              "id" : reply.id
                            }
                        }];
                    }
                    res.status(200).send(JSON.stringify(responseText));
                });
            }
            break;

            /*Done*/
            case "create.device" : {
                let apiInput = fulfillment[intent][objectType]["apiInput"];
                apiInput.name = queryResult.parameters.name;
                if(queryResult.parameters.hasOwnProperty("description"))
                    apiInput.description = queryResult.parameters.description;
                apiInput.parentThingId = parseInt(queryResult.parameters.parentThingId);
                apiInput.ownerUnitId = parseInt(queryResult.parameters.ownerUnitId);
                console.log("inside device.create "+options.hostname+options.path);
                sendRequest(options,apiInput,function(reply,statusCode){
                    console.log("inside created " + statusCode);
                    if(statusCode!= "200") {
                        responseText.fulfillmentText = "not authenticated !";
                    }
                    else {
                        responseText.fulfillmentText = "Device created with ID : "+reply.id + " Name : " + reply.name;
                        responseText.outputContexts = [{
                            "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/object",
                            "lifespanCount": 5,
                            "parameters": {
                              "object" : "device",
                              "id" : reply.id
                            }
                        }];
                    }
                    res.status(200).send(JSON.stringify(responseText));
                });
            }
            break;

            /*Done*/
            case "create.cron" : {
                let name = queryResult.parameters.name;
                let deviceName = queryResult.parameters.deviceName;
                let conversationId = findKey("conversationId", req.body);

                sendRequest(options,null,function(reply,statusCode){
                    responseText = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": "Found multiple devices with name "+deviceName+", choose one ID to add "+name+" to it"}}],"suggestions": []},"systemIntent": {"intent": "actions.intent.OPTION","data": {"@type": "type.googleapis.com/google.actions.v2.OptionValueSpec","listSelect": {"items": []}}}}}};
                    if(statusCode!= "200") {
                        responseText.fulfillmentText = "not authenticated !";
                    }
                    else {
                        let thingId;
                        let deviceId;
                        let deviceDetails;
                        let deviceData = {};

                        for(let i=0;i<reply.length;i++) {
                            for(let j=0;j<reply[i].devices.length;j++) {
                                // TO DO: change == to strstr
                                if(reply[i].devices[j].name.toUpperCase() == deviceName.toUpperCase()) {
                                    let attributeList=[];
                                    for(let itt = 0;itt < reply[i].devices[j].deviceAttributes.length ;itt++) {
                                        if(reply[i].devices[j].deviceAttributes[itt].actuator)
                                            attributeList.push(reply[i].devices[j].deviceAttributes[itt].name + "-" + reply[i].devices[j].deviceAttributes[itt].type);
                                    }
                                    responseText.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+reply[i].devices[j].id},"title": ""+reply[i].devices[j].id+": "+reply[i].devices[j].name,"description": "in thing: "+reply[i].name+" with attributes ["+attributeList+"]"});
                                    deviceId = reply[i].devices[j].id;
                                    thingId = reply[i].id;
                                    deviceDetails = reply[i].devices[j];

                                    deviceData[""+deviceId] = {"thingId":thingId, "deviceAttributes":reply[i].devices[j].deviceAttributes};
                                }
                            }
                        }
                        if(responseText.payload.google.systemIntent.data.listSelect.items.length > 1) {
                            let tmp = Object.assign({},fulfillment["basic_response"]);
                            tmp.payload = responseText.payload;
                            tmp.outputContexts = [{
                                "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/action-id-by-name",
                                "lifespanCount": 1,
                                "parameters": {
                                  "object" : "cron",
                                  "objectType" : "cron",
                                  "futureAction" : "createCron",
                                  "cronName" : name,
                                  "deviceData" : JSON.stringify(deviceData),
                                  "objectName" : "cron"
                                }
                            }];
                            responseText = tmp;
                        }
                        else if(responseText.payload.google.systemIntent.data.listSelect.items.length == 1) {
                            console.log("in if");
                            responseText = Object.assign({},fulfillment["basic_response"]);
                            responseText.fulfillmentText = "Fine, let me get some details first, which attribute would you like to handle ?";
                            responseText.outputContexts = [{
                                "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/cronDetails",
                                "lifespanCount": 1,
                                "parameters": {
                                  "object" : "cron",
                                  "objectType" : "cron",
                                  "futureAction" : "createCron",
                                  "cronName" : name,
                                  "thingId" : thingId,
                                  "deviceId" : deviceId,
                                  "deviceDetails" : JSON.stringify(deviceDetails)
                                }
                            }];
                        }
                        else if(responseText.payload.google.systemIntent.data.listSelect.items.length == 0) {
                            responseText = Object.assign({},fulfillment["basic_response"]);
                            responseText.fulfillmentText = "No devices found with name "+deviceName;
                        }
                    }
                    res.status(200).send(JSON.stringify(responseText));
                });
            }
            break;

            /*Pending*/
            case "create.attribute" : {
                responseText = Object.assign({},fulfillment["basic_response"]);

                let conversationId = findKey("conversationId", req.body);
                let name = queryResult.parameters.name;
                let type = queryResult.parameters.type;
                let def = queryResult.parameters.defaultValue;
                let deviceName = queryResult.parameters.deviceName;
                let parentDeviceId;
                let ownerUnitId;

                sendRequest(options,null,function(reply,statusCode){
                    responseText.payload = {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": "Found multiple devices with name "+deviceName+", choose one ID to add "+name+" to it"}}],"suggestions": []},"systemIntent": {"intent": "actions.intent.OPTION","data": {"@type": "type.googleapis.com/google.actions.v2.OptionValueSpec","listSelect": {"items": []}}}}};
                    if(statusCode!= "200") {
                        responseText.fulfillmentText = "not authenticated !";
                    }
                    else {
                        let deviceDetails = {};
                        for(let i=0;i<reply.length;i++) {
                            for(let j=0;j<reply[i].devices.length;j++) {
                                if(reply[i].devices[j].name.toUpperCase() == deviceName.toUpperCase()) {
                                    responseText.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+reply[i].devices[j].id},"title": ""+reply[i].devices[j].id+": "+reply[i].devices[j].name,"description": "in thing: "+reply[i].name});
                                    deviceDetails[""+reply[i].devices[j].id] = {"ownerUnitId" : reply[i].parentUnit.id};
                                    parentDeviceId = reply[i].devices[j].id;
                                }
                            }
                        }
                        if(responseText.payload.google.systemIntent.data.listSelect.items.length > 1) {
                            responseText.outputContexts = [{
                                "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/action-id-by-name",
                                "lifespanCount": 1,
                                "parameters": {
                                  "object" : "attribute",
                                  "objectType" : "attribute",
                                  "futureAction" : "createAttribute",
                                  "attributeName" : name,
                                  "type" : type,
                                  "defaultValue" : def,
                                  "deviceName" : deviceName,
                                  "objectName" : "cron",
                                  "deviceDetails" : JSON.stringify(deviceDetails)
                                }
                            }];
                            res.status(200).send(JSON.stringify(responseText));
                        }
                        if(responseText.payload.google.systemIntent.data.listSelect.items.length == 1) {
                            options = {
                                "method": fulfillment["object.action-id-by-name"]["attribute"]["type"],
                                "hostname": fulfillment["server"]["hostname"],
                                "port": fulfillment["server"]["port"],
                                "path":  fulfillment["object.action-id-by-name"]["attribute"]["endpoint"],
                                "headers": {
                                    "content-type": fulfillment["object.action-id-by-name"]["attribute"]["content_type"],
                                    "cache-control": "no-cache",
                                    "Cookie": "authorization=; authorization="+token
                                }
                            };
                            let apiInput = Object.assign({},fulfillment["object.action-id-by-name"]["attribute"]["apiInput"]);
                            apiInput.name = name;
                            apiInput.type = type;
                            apiInput.def = def;
                            apiInput.parentDeviceId = parseInt(parentDeviceId);
                            console.log("device Details " + JSON.stringify(deviceDetails )+ " " + JSON.stringify(parentDeviceId));
                            apiInput.ownerUnitId = parseInt(deviceDetails[""+parentDeviceId].ownerUnitId);

                            sendRequest(options,null,function(reply,statusCode){
                                responseText = Object.assign({},fulfillment["basic_response"]);
                                if(statusCode!= "200") {
                                    responseText.fulfillmentText = "not authenticated !";
                                }
                                else {
                                    responseText.fulfillmentText = "done "+name+" added successfully!";
                                }
                                res.status(200).send(JSON.stringify(responseText));
                            });
                        }
                        else if(responseText.payload.google.systemIntent.data.listSelect.items.length == 0) {
                            responseText = Object.assign({},fulfillment["basic_response"]);
                            responseText.fulfillmentText = "No devices found with name "+deviceName;
                            res.status(200).send(JSON.stringify(responseText));
                        }
                    }
                });
            }
            break;

            /*Done*/
            case "object.delete-all - yes" : {
                switch(objectType) {
                    case "cron" :
                    case "device":
                    case "thing" :
                    case "user" :
                    case "unit" : {
                        var items = [];
                        sendRequest(options,null,function(reply,statusCode){
                            if(reply.length > 0) {
                                for(var i = 0;i<reply.length;i++) {
                                    items.push(reply[i].id);
                                }
                            }
                            else {
                                responseText = Object.assign({},fulfillment["basic_response"]);
                                responseText.fulfillmentText = "No "+objectType+"s found! Try adding some...";
                            }
                            options = {
                                "method": fulfillment["object.delete"][objectType]["type"],
                                "hostname": fulfillment["server"]["hostname"],
                                "port": fulfillment["server"]["port"],
                                "path":  fulfillment["object.delete"][objectType]["endpoint"],
                                "headers": {
                                    "content-type": fulfillment["object.delete"][objectType]["content_type"],
                                    "cache-control": "no-cache",
                                    "Cookie": "authorization=; authorization="+token
                                }
                            };
                            let success = 0;
                            let failed = 0;
                            let start=0;
                            // starting from second
                            if(objectType == "unit" || objectType == "user") {
                                start = 1;
                                failed = 1;
                            }
                            for(let i=start;i<items.length;i++) {
                                let tempoptions = JSON.parse(JSON.stringify(options));
                                tempoptions.path=tempoptions.path+items[i];
                                sendRequest(tempoptions,null,function(reply,statusCode){
                                    if(statusCode == "200") {
                                        success+=1;
                                    }
                                    else {
                                        failed+=1;
                                    }
                                    if((success + failed) == items.length) {
                                        responseText.fulfillmentText = "Successfully deleted "+objectType+"s "+success;
                                        if(failed>0) {
                                            if(failed==1 && (objectType=="unit" ||objectType == "user")) {
                                                responseText.fulfillmentText+= " Cannot delete "+objectType+" with id 1";
                                            }
                                            else {
                                                responseText.fulfillmentText+= " "+failed+" fails Try again deleting !";
                                            }
                                        }
                                        res.status(200).send(JSON.stringify(responseText));
                                    }
                                });
                            }
                        });
                    }
                    break;

                }
            }
            break;

            /*Done*/
            case "object.list-it":
            /*Done*/
            case "object.list" : {
                responseText = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": "Here is the list:"}}],"suggestions": []},"systemIntent": {"intent": "actions.intent.OPTION","data": {"@type": "type.googleapis.com/google.actions.v2.OptionValueSpec","listSelect": {"items": []}}}}}};
                switch(objectType) {
                    case "thing" : {
                        sendRequest(options,null,function(reply,statusCode){
                            var response;
                            if(reply.length > 0) {
                                for(var i = 0;i<reply.length;i++) {
                                    responseText.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+objectType+": "+reply[i].id+reply[i].name},"title": ""+objectType+" "+reply[i].id+" "+reply[i].name});
                                }
                                if(responseText.payload.google.systemIntent.data.listSelect.items.length == 1) {
                                    let tmp = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": ""}},{"simpleResponse": {"textToSpeech": ""}}],"suggestions": []}}}};
                                    tmp.payload.google.richResponse.items[1].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].title;
                                    tmp.payload.google.richResponse.items[0].simpleResponse.textToSpeech = "found only one "+objectType +" : ";
                                    responseText = tmp;
                                }
                                //add suggestions
                                responseText.payload.google.richResponse.suggestions.push({"title":"add new thing"});
                                responseText.payload.google.richResponse.suggestions.push({"title":"list users"});
                            }
                            else {
                                responseText = Object.assign({},fulfillment["basic_response"]);
                                responseText.fulfillmentText = "No "+objectType+"s found! Try adding some...";
                            }
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "unit" : {
                        sendRequest(options,null,function(reply,statusCode){
                            var response;
                            //console.log('in case of unit.list');
                            if(reply.length > 0) {
                                for(var i = 0;i<reply.length;i++) {
                                    responseText.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+objectType+": "+reply[i].id+reply[i].unitName},"title": ""+objectType+" "+reply[i].id+" "+reply[i].unitName});
                                }
                                if(responseText.payload.google.systemIntent.data.listSelect.items.length == 1) {
                                    let tmp = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": ""}},{"simpleResponse": {"textToSpeech": ""}}]}}}};
                                    tmp.payload.google.richResponse.items[1].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].title;
                                    tmp.payload.google.richResponse.items[0].simpleResponse.textToSpeech = "found only one "+objectType +" : ";
                                    responseText = tmp;
                                }
                            }
                            else {
                                responseText = Object.assign({},fulfillment["basic_response"]);
                                responseText.fulfillmentText = "No "+objectType+"s found! Try adding some...";
                            }
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "user" : {
                        sendRequest(options,null,function(reply,statusCode){
                            var response;
                            //console.log('in case of user.list');
                            if(reply.length > 0) {
                                for(var i = 0;i<reply.length;i++) {
                                    responseText.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+objectType+": "+reply[i].id+reply[i].name},"description": ""+reply[i].email,"title": ""+objectType+" "+reply[i].id+" "+reply[i].name});
                                }
                                if(responseText.payload.google.systemIntent.data.listSelect.items.length == 1) {
                                    let tmp = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": ""}},{"simpleResponse": {"textToSpeech": ""}}]}}}};
                                    tmp.payload.google.richResponse.items[1].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].title;
                                    tmp.payload.google.richResponse.items[0].simpleResponse.textToSpeech = "found only one "+objectType +" : ";
                                    responseText = tmp;
                                }
                            }
                            else {
                                responseText = Object.assign({},fulfillment["basic_response"]);
                                responseText.fulfillmentText = "No "+objectType+"s found! Try adding some...";
                            }
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "device" : {
                        sendRequest(options,null,function(reply,statusCode){
                            var response;
                            if(reply.length > 0) {
                                for(var i = 0;i<reply.length;i++) {
                                    responseText.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+objectType+": "+reply[i].id+reply[i].name},"description": ""+reply[i].email,"title": ""+objectType+" "+reply[i].id+" "+reply[i].name});
                                }
                                if(responseText.payload.google.systemIntent.data.listSelect.items.length == 1) {
                                    let tmp = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": ""}},{"simpleResponse": {"textToSpeech": ""}}]}}}};
                                    tmp.payload.google.richResponse.items[1].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].title;
                                    tmp.payload.google.richResponse.items[0].simpleResponse.textToSpeech = "found only one "+objectType +" : ";
                                    responseText = tmp;
                                }
                            }
                            else {
                                responseText = Object.assign({},fulfillment["basic_response"]);
                                responseText.fulfillmentText = "No "+objectType+"s found! Try adding some...";
                            }
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "cron": {
                        sendRequest(options,null,function(reply,statusCode){
                            var response;
                            if(reply.length > 0) {
                                for(var i = 0;i<reply.length;i++) {
                                    responseText.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+objectType+": "+reply[i].id+reply[i].cronName},"title": reply[i].id + " - " + reply[i].cronName + " "+reply[i].cronExpression});
                                }
                                if(responseText.payload.google.systemIntent.data.listSelect.items.length == 1) {
                                    let tmp = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": ""}},{"simpleResponse": {"textToSpeech": ""}}]}}}};
                                    tmp.payload.google.richResponse.items[1].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].title;
                                    tmp.payload.google.richResponse.items[0].simpleResponse.textToSpeech = "found only one "+objectType +" : ";
                                    responseText = tmp;
                                }
                            }
                            else {
                                responseText = Object.assign({},fulfillment["basic_response"]);
                                responseText.fulfillmentText = "No "+objectType+"s found! Try adding some...";
                            }
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                }
            }
            break;

            /*Done*/
            case "object.delete - yes" : {
                console.log("inside " + intent);
                let name = findKey("name.original", req.body);
                let conversationId = findKey("conversationId", req.body);
                console.log("object name :" +  name);
                switch(objectType) {
                    case "thing" : {
                        sendRequest(options,null,function(reply,statusCode){
                            if(statusCode!= "200") {
                                responseText.fulfillmentText = "not authenticated !";
                            }
                            else {
                                let tempIdList = [];
                                for(let i=0;i<reply.length;i++) {
                                    if(reply[i].name.toUpperCase() == name.toUpperCase())
                                        tempIdList.push(reply[i].id);
                                }
                                console.log(tempIdList);
                                if(tempIdList.length > 1) {
                                    //console.log("list found for delete");
                                    responseText.fulfillmentText = "Found multiple "+objectType+"s with name: "+name+"; [";
                                    for(let i=0;i<tempIdList.length;i++) {
                                        if(i==0)
                                            responseText.fulfillmentText += ""+tempIdList[i];
                                        else
                                            responseText.fulfillmentText += ","+tempIdList[i];
                                    }
                                    responseText.fulfillmentText += "], please choose an ID to delete:";
                                    responseText.outputContexts = [{
                                        "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/action-id-by-name",
                                        "lifespanCount": 5,
                                        "parameters": {
                                          "object" : "thing",
                                          "futureAction" : "delete",
                                          "objectName" : name
                                        }
                                    }];
                                    //console.log("in greater than 1 == "+responseText.fulfillmentText);
                                    res.status(200).send(JSON.stringify(responseText));
                                }
                                else if(tempIdList.length == 1){
                                    //console.log("list not found for delete");
                                    options = {
                                        "method": fulfillment["object.delete"][objectType]["type"],
                                        "hostname": fulfillment["server"]["hostname"],
                                        "port": fulfillment["server"]["port"],
                                        "path": fulfillment["object.delete"][objectType]["endpoint"],
                                        "headers": {
                                            "content-type": fulfillment["object.delete"][objectType]["content_type"],
                                            "cache-control": "no-cache",
                                            "Cookie": "authorization=; authorization="+token
                                        }
                                    };
                                    options.path += ""+tempIdList[0];
                                    sendRequest(options,null,function(reply,statusCode){
                                        if(statusCode != "200") {
                                            responseText = Object.assign({},fulfillment["basic_response"]);
                                            responseText.fulfillmentText = "Failed to delete! Make sure you are authenticated or check if the "+objectType+" specified exsists or not";
                                        }
                                        else {
                                            responseText = Object.assign({},fulfillment["basic_response"]);
                                            responseText.fulfillmentText = "Done! "+objectType+" deleted!";
                                        }
                                        //console.log("in 1 == "+responseText.fulfillmentText);
                                        res.status(200).send(JSON.stringify(responseText));
                                    });
                                }
                                else {
                                    responseText = Object.assign({},fulfillment["basic_response"]);;
                                    responseText.fulfillmentText = "No "+objectType+" found with name: "+name;
                                    //console.log("in other == "+responseText.fulfillmentText);
                                    res.status(200).send(JSON.stringify(responseText));
                                }
                            }
                        });
                    }
                    break;
                    case "device" : {
                        sendRequest(options,null,function(reply,statusCode){
                            if(statusCode!= "200") {
                                responseText.fulfillmentText = "not authenticated !";
                            }
                            else {
                                let tempIdList = [];
                                for(let i=0;i<reply.length;i++) {
                                    if(reply[i].name.toUpperCase() == name.toUpperCase())
                                        tempIdList.push(reply[i].id);
                                }
                                console.log(tempIdList);
                                if(tempIdList.length > 1) {
                                    //console.log("list found for delete");
                                    responseText.fulfillmentText = "Found multiple "+objectType+"s with name: "+name+"; [";
                                    for(let i=0;i<tempIdList.length;i++) {
                                        if(i==0)
                                            responseText.fulfillmentText += ""+tempIdList[i];
                                        else
                                            responseText.fulfillmentText += ","+tempIdList[i];
                                    }
                                    responseText.fulfillmentText += "], please choose an ID to delete:";
                                    responseText.outputContexts = [{
                                        "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/action-id-by-name",
                                        "lifespanCount": 5,
                                        "parameters": {
                                          "object" : "device",
                                          "futureAction" : "delete",
                                          "objectName" : name
                                        }
                                    }];
                                    //console.log("in greater than 1 == "+responseText.fulfillmentText);
                                    res.status(200).send(JSON.stringify(responseText));
                                }
                                else if(tempIdList.length == 1){
                                    //console.log("list not found for delete");
                                    options = {
                                        "method": fulfillment["object.delete"][objectType]["type"],
                                        "hostname": fulfillment["server"]["hostname"],
                                        "port": fulfillment["server"]["port"],
                                        "path": fulfillment["object.delete"][objectType]["endpoint"],
                                        "headers": {
                                            "content-type": fulfillment["object.delete"][objectType]["content_type"],
                                            "cache-control": "no-cache",
                                            "Cookie": "authorization=; authorization="+token
                                        }
                                    };
                                    options.path += ""+tempIdList[0];
                                    sendRequest(options,null,function(reply,statusCode){
                                        if(statusCode != "200") {
                                            responseText = Object.assign({},fulfillment["basic_response"]);
                                            responseText.fulfillmentText = "Failed to delete! Make sure you are authenticated or check if the "+objectType+" specified exsists or not";
                                        }
                                        else {
                                            responseText = Object.assign({},fulfillment["basic_response"]);
                                            responseText.fulfillmentText = "Done! "+objectType+" deleted!";
                                        }
                                        //console.log("in 1 == "+responseText.fulfillmentText);
                                        res.status(200).send(JSON.stringify(responseText));
                                    });
                                }
                                else {
                                    responseText = Object.assign({},fulfillment["basic_response"]);;
                                    responseText.fulfillmentText = "No "+objectType+" found with name: "+name;
                                    //console.log("in other == "+responseText.fulfillmentText);
                                    res.status(200).send(JSON.stringify(responseText));
                                }
                            }
                        });
                    }
                    break;
                    case "unit" : {
                        sendRequest(options,null,function(reply,statusCode){
                            if(statusCode!= "200") {
                                responseText.fulfillmentText = "not authenticated !";
                            }
                            else {
                                let tempIdList = [];
                                console.log(616);
                                for(let i=0;i<reply.length;i++) {
                                    console.log(reply[i].unitName+" "+name);
                                    if(reply[i].unitName.toUpperCase() == name.toUpperCase())
                                        tempIdList.push(reply[i].id);
                                }
                                console.log("Matching "+tempIdList);
                                if(tempIdList.length > 1) {
                                    responseText = Object.assign({},fulfillment["basic_response"]);;
                                    responseText.fulfillmentText = "Found multiple "+objectType+"s with name: "+name+"; [";
                                    for(let i=0;i<tempIdList.length;i++) {
                                        if(i==0)
                                            responseText.fulfillmentText += ""+tempIdList[i];
                                        else
                                            responseText.fulfillmentText += ","+tempIdList[i];
                                    }
                                    responseText.fulfillmentText += "], please choose an ID to delete:";
                                    responseText.outputContexts = [{
                                        "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/action-id-by-name",
                                        "lifespanCount": 5,
                                        "parameters": {
                                          "object" : "unit",
                                          "futureAction" : "delete",
                                          "objectName" : name
                                        }
                                    }];
                                    res.status(200).send(JSON.stringify(responseText));
                                }
                                else if(tempIdList.length == 1){
                                    options = {
                                        "method": fulfillment["object.delete"][objectType]["type"],
                                        "hostname": fulfillment["server"]["hostname"],
                                        "port": fulfillment["server"]["port"],
                                        "path": fulfillment["object.delete"][objectType]["endpoint"],
                                        "headers": {
                                            "content-type": fulfillment["object.delete"][objectType]["content_type"],
                                            "cache-control": "no-cache",
                                            "Cookie": "authorization=; authorization="+token
                                        }
                                    };
                                    options.path += ""+tempIdList[0];
                                    sendRequest(options,null,function(reply,statusCode){
                                        if(statusCode != "200") {
                                            responseText = Object.assign({},fulfillment["basic_response"]);
                                            responseText.fulfillmentText = "Failed to delete! Make sure you are authenticated or check if the "+objectType+" specified exsists or not";
                                        }
                                        else {
                                            responseText = Object.assign({},fulfillment["basic_response"]);
                                            responseText.fulfillmentText = "Done! "+objectType+" deleted!";
                                        }
                                        res.status(200).send(JSON.stringify(responseText));
                                    });
                                }
                                else {
                                    responseText = Object.assign({},fulfillment["basic_response"]);;
                                    responseText.fulfillmentText = "No "+objectType+" found with name: "+name;
                                    res.status(200).send(JSON.stringify(responseText));
                                }
                            }
                        });
                    }
                    break;
                    case "user" : {
                        sendRequest(options,null,function(reply,statusCode){
                            if(statusCode!= "200") {
                                responseText.fulfillmentText = "not authenticated !";
                            }
                            else {
                                let tempIdList = [];
                                for(let i=0;i<reply.length;i++) {
                                    if(reply[i].name.toUpperCase() == name.toUpperCase())
                                        tempIdList.push(reply[i].id);
                                }
                                if(tempIdList.length > 1) {
                                    responseText.fulfillmentText = "Found multiple "+objectType+"s with name: "+name+"; [";
                                    for(let i=0;i<tempIdList.length;i++) {
                                        if(i==0)
                                            responseText.fulfillmentText += ""+tempIdList[i];
                                        else
                                            responseText.fulfillmentText += ","+tempIdList[i];
                                    }
                                    responseText.fulfillmentText += "], please choose an ID to delete:";
                                    responseText.outputContexts = [{
                                        "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/action-id-by-name",
                                        "lifespanCount": 5,
                                        "parameters": {
                                          "object" : "user",
                                          "futureAction" : "delete",
                                          "objectName" : name
                                        }
                                    }];
                                    res.status(200).send(JSON.stringify(responseText));
                                }
                                else if(tempIdList.length == 1){
                                    options = {
                                        "method": fulfillment["object.delete"][objectType]["type"],
                                        "hostname": fulfillment["server"]["hostname"],
                                        "port": fulfillment["server"]["port"],
                                        "path": fulfillment["object.delete"][objectType]["endpoint"],
                                        "headers": {
                                            "content-type": fulfillment["object.delete"][objectType]["content_type"],
                                            "cache-control": "no-cache",
                                            "Cookie": "authorization=; authorization="+token
                                        }
                                    };
                                    options.path += ""+tempIdList[0];
                                    sendRequest(options,null,function(reply,statusCode){
                                        if(statusCode != "200") {
                                            responseText = Object.assign({},fulfillment["basic_response"]);
                                            responseText.fulfillmentText = "Failed to delete! Make sure you are authenticated or check if the "+objectType+" specified exsists or not";
                                        }
                                        else {
                                            responseText = Object.assign({},fulfillment["basic_response"]);
                                            responseText.fulfillmentText = "Done! "+objectType+" deleted!";
                                        }
                                        res.status(200).send(JSON.stringify(responseText));
                                    });
                                }
                                else {
                                    responseText = Object.assign({},fulfillment["basic_response"]);;
                                    responseText.fulfillmentText = "No "+objectType+" found with name: "+name;
                                    res.status(200).send(JSON.stringify(responseText));
                                }
                            }
                        });
                    }
                    break;
                    case "cron" : {
                        sendRequest(options,null,function(reply,statusCode){
                            if(statusCode!= "200") {
                                responseText.fulfillmentText = "not authenticated !";
                            }
                            else {
                                let tempIdList = [];
                                for(let i=0;i<reply.length;i++) {
                                    if(reply[i].cronName.toUpperCase() == name.toUpperCase())
                                        tempIdList.push(reply[i].id);
                                }
                                console.log(tempIdList);
                                if(tempIdList.length > 1) {
                                    //console.log("list found for delete");
                                    responseText.fulfillmentText = "Found multiple "+objectType+"s with name: "+name+"; [";
                                    for(let i=0;i<tempIdList.length;i++) {
                                        if(i==0)
                                            responseText.fulfillmentText += ""+tempIdList[i];
                                        else
                                            responseText.fulfillmentText += ","+tempIdList[i];
                                    }
                                    responseText.fulfillmentText += "], please choose an ID to delete:";
                                    responseText.outputContexts = [{
                                        "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/action-id-by-name",
                                        "lifespanCount": 5,
                                        "parameters": {
                                          "object" : "cron",
                                          "futureAction" : "delete",
                                          "objectName" : name
                                        }
                                    }];
                                    //console.log("in greater than 1 == "+responseText.fulfillmentText);
                                    res.status(200).send(JSON.stringify(responseText));
                                }
                                else if(tempIdList.length == 1){
                                    //console.log("list not found for delete");
                                    options = {
                                        "method": fulfillment["object.delete"][objectType]["type"],
                                        "hostname": fulfillment["server"]["hostname"],
                                        "port": fulfillment["server"]["port"],
                                        "path": fulfillment["object.delete"][objectType]["endpoint"],
                                        "headers": {
                                            "content-type": fulfillment["object.delete"][objectType]["content_type"],
                                            "cache-control": "no-cache",
                                            "Cookie": "authorization=; authorization="+token
                                        }
                                    };
                                    options.path += ""+tempIdList[0];
                                    sendRequest(options,null,function(reply,statusCode){
                                        if(statusCode != "200") {
                                            responseText = Object.assign({},fulfillment["basic_response"]);
                                            responseText.fulfillmentText = "Failed to delete! Make sure you are authenticated or check if the "+objectType+" specified exsists or not";
                                        }
                                        else {
                                            responseText = Object.assign({},fulfillment["basic_response"]);
                                            responseText.fulfillmentText = "Done! "+objectType+" deleted!";
                                        }
                                        //console.log("in 1 == "+responseText.fulfillmentText);
                                        res.status(200).send(JSON.stringify(responseText));
                                    });
                                }
                                else {
                                    responseText = Object.assign({},fulfillment["basic_response"]);;
                                    responseText.fulfillmentText = "No "+objectType+" found with name: "+name;
                                    //console.log("in other == "+responseText.fulfillmentText);
                                    res.status(200).send(JSON.stringify(responseText));
                                }
                            }
                        });
                    }
                    break;
                }
            }
            break;

            /*Done*/
            case "pubsub.get-shadow-by-context" :
            case "pubsub.get-shadow-by-name" : {
                console.log("inside " + intent);
                let name = queryResult.parameters.device;
                let attribute = queryResult.parameters.attribute;
                console.log("object name :" +  name +" attribute: "+attribute);
                options.path+=''+attribute;
                console.log(options.path);
                sendRequest(options,null,function(reply,statusCode){
                    if(statusCode!= "200") {
                        responseText.fulfillmentText = "not authenticated !";
                    }
                    else {
                        let tempAttributeList = [];
                        for(let i=0; i<reply.length; i++) {
                            if(reply[i].deviceName.toUpperCase() == name.toUpperCase()) {
                                tempAttributeList.push({"attributeId":reply[i].deviceAttributeId,"deviceId":reply[i].deviceId,"deviceName":reply[i].deviceName,"parentThingId":reply[i].parentThingId,"parentThingName" : reply[i].parentThingName});
                            }
                        }
                        if(tempAttributeList.length > 1) {
                            responseText = Object.assign({},fulfillment["basic_response"]);;
                            let tmpPayload = {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": "Found more than one devices with that name... Choose one of these IDs..."}}]},"systemIntent": {"intent": "actions.intent.OPTION","data": {"@type": "type.googleapis.com/google.actions.v2.OptionValueSpec","listSelect": {"items": []}}}}};
                            for(let i=0; i<tempAttributeList.length; i++) {
                                tmpPayload.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+tempAttributeList[i].deviceId+""+tempAttributeList[i].deviceName+""+tempAttributeList[i].parentThingId+""+tempAttributeList[i].attributeId},"title": ""+tempAttributeList[i].deviceName+" (ID:"+tempAttributeList[i].deviceId+")", "description":"ParentThing: "+tempAttributeList[i].parentThingName});
                            }
                            responseText.outputContexts = [{
                                "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/action-id-by-name",
                                "lifespanCount": 5,
                                "parameters": {
                                  "object" : "device",
                                  "futureAction" : "pubsubShadow",
                                  "objectName" : name
                                }
                            }];
                            responseText.payload = tmpPayload;
                            res.status(200).send(JSON.stringify(responseText));
                        }
                        else if(tempAttributeList.length == 1) {
                            let id = tempAttributeList[0].parentThingId;
                            console.log("pubsub id "+ id);
                            options.method = fulfillment["object.action-id-by-name"]["pubsubShadow"]["type"];
                            options.path = fulfillment["object.action-id-by-name"]["pubsubShadow"]["endpoint"];
                            options.path += ""+id;
                            console.log(options.path);
                            sendRequest(options,null,function(reply,statusCode){
                                if(statusCode != "200") {
                                    responseText = Object.assign({},fulfillment["basic_response"]);
                                    responseText.fulfillmentText = "Failed to get shadow ! Make sure you are authenticated or check if the device specified exsists or not";
                                }
                                else {
                                    responseText = Object.assign({},fulfillment["basic_response"]);
                                    if(reply.state.reported.hasOwnProperty("device"+tempAttributeList[0].deviceId+"."+tempAttributeList[0].attributeId)) {
                                        responseText.fulfillmentText = "The "+attribute+" is "+reply.state.reported["device"+tempAttributeList[0].deviceId+"."+tempAttributeList[0].attributeId];
                                        responseText.outputContexts = [{
                                            "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/pubsubs",
                                            "lifespanCount": 1,
                                            "parameters": {
                                              "device" : tempAttributeList[0].deviceId,
                                              "attribute" : tempAttributeList[0].attributeId,
                                              "thing" : tempAttributeList[0].parentThingId,
                                              "deviceName" : tempAttributeList[0].deviceName
                                            }
                                        }];
                                    } else
                                        responseText.fulfillmentText = "Oops! I can't find the "+attribute+"! Check if the device is on and connected.";
                                }
                                res.status(200).send(JSON.stringify(responseText));
                            });
                        }
                        else {
                            responseText = Object.assign({},fulfillment["basic_response"]);;
                            responseText.fulfillmentText = "Required device/attribute not found";
                            res.status(200).send(JSON.stringify(responseText));
                        }
                    }
                });
            }
            break;

            /*Done*/
            case "pubsub.set-value-by-context" :
            case "pubsub.set-value-by-name" : {
                console.log("inside " + intent);
                let name = findKey("device", queryResult.parameters);
                let attribute = findKey("attribute", queryResult.parameters);
                let value = findKey("value",queryResult.parameters);
                console.log("object name :" +  name +" attribute: "+attribute + " value : " + value);
                options.path+=''+attribute;
                console.log(options.path);
                sendRequest(options,null,function(reply,statusCode){
                    if(statusCode!= "200") {
                        responseText.fulfillmentText = "not authenticated !";
                    }
                    else {
                        let tempAttributeList = [];
                        for(let i=0; i<reply.length; i++) {
                            if(reply[i].deviceName.toUpperCase() == name.toUpperCase()) {
                                tempAttributeList.push({"attributeId":reply[i].deviceAttributeId,"deviceId":reply[i].deviceId,"deviceName":reply[i].deviceName,"parentThingId":reply[i].parentThingId,"parentThingName" : reply[i].parentThingName});
                            }
                        }
                        if(tempAttributeList.length > 1) {
                            responseText = Object.assign({},fulfillment["basic_response"]);
                            let tmpPayload = {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": "Found more than one devices with that name... Choose one of these IDs..."}}]},"systemIntent": {"intent": "actions.intent.OPTION","data": {"@type": "type.googleapis.com/google.actions.v2.OptionValueSpec","listSelect": {"items": []}}}}};
                            for(let i=0; i<tempAttributeList.length; i++) {
                                tmpPayload.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+tempAttributeList[i].deviceId+""+tempAttributeList[i].deviceName+""+tempAttributeList[i].parentThingId+""+tempAttributeList[i].attributeId},"title": ""+tempAttributeList[i].deviceName+" (ID:"+tempAttributeList[i].deviceId+")", "description":"ParentThing: "+tempAttributeList[i].parentThingName});
                            }
                            responseText.outputContexts = [{
                                "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/action-id-by-name",
                                "lifespanCount": 5,
                                "parameters": {
                                  "object" : "device",
                                  "futureAction" : "pubsubValue",
                                  "objectName" : name,
                                  "attributeName" : attribute
                                }
                            }];
                            responseText.payload = tmpPayload;
                            res.status(200).send(JSON.stringify(responseText));
                        }
                        else if(tempAttributeList.length == 1) {
                            let id = tempAttributeList[0].attributeId;
                            console.log("pubsub id "+ id);
                            options.method = fulfillment["object.action-id-by-name"]["pubsubValue"]["type"];
                            options.path = fulfillment["object.action-id-by-name"]["pubsubValue"]["endpoint"];
                            options.path += ""+id;
                            console.log(options.path);
                            sendRequest(options,{"value" : value},function(reply,statusCode){
                                if(statusCode != "200") {
                                    responseText = Object.assign({},fulfillment["basic_response"]);
                                    responseText.fulfillmentText = "Failed to get shadow ! Make sure you are authenticated or check if the device specified exsists or not";
                                }
                                else {
                                    responseText = Object.assign({},fulfillment["basic_response"]);
                                    if(reply.state.desired.hasOwnProperty("device"+tempAttributeList[0].deviceId+"."+tempAttributeList[0].attributeId)) {
                                        responseText.fulfillmentText = "The "+attribute+" is "+reply.state.desired["device"+tempAttributeList[0].deviceId+"."+tempAttributeList[0].attributeId];
                                        responseText.outputContexts = [{
                                            "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/pubsubs",
                                            "lifespanCount": 1,
                                            "parameters": {
                                              "device" : tempAttributeList[0].deviceId,
                                              "attribute" : tempAttributeList[0].attributeId,
                                              "thing" : tempAttributeList[0].parentThingId,
                                              "deviceName" : tempAttributeList[0].deviceName
                                            }
                                        }];
                                    }
                                    else
                                        responseText.fulfillmentText = "Oops! I can't find the "+attribute+"! Check if the device is on and connected.";
                                }
                                res.status(200).send(JSON.stringify(responseText));
                            });
                        }
                        else {
                            responseText = Object.assign({},fulfillment["basic_response"]);;
                            responseText.fulfillmentText = "Required device/attribute not found";
                            res.status(200).send(JSON.stringify(responseText));
                        }
                    }
                });
            }
            break;

            /*Done*/
            case "object.action-id-by-name" : {
                //console.log("inside " + intent);
                let id = findKey("id", queryResult.parameters);
                let futureAction = findKey("futureAction",queryResult.outputContexts);
                let objectName = findKey("objectName",queryResult.outputContexts);
                objectType = findKey("object",queryResult.outputContexts);
                switch(objectType) {
                    case "thing" : {
                        switch(futureAction) {
                            case "delete" : {
                                //console.log("deleting id " + id);
                                options.path = fulfillment["object.delete"]["thing"]["endpoint"];
                                options.method = fulfillment["object.delete"]["thing"]["type"];
                                options.path += ""+id;
                                console.log(options.path);
                                //console.log(JSON.stringify(options));
                                sendRequest(options,null,function(reply,statusCode){
                                    if(statusCode != "200") {
                                        responseText = Object.assign({},fulfillment["basic_response"]);
                                        responseText.fulfillmentText = "Failed to delete! Make sure you are authenticated or check if the "+objectType+" specified exsists or not";
                                    }
                                    else {
                                        responseText = Object.assign({},fulfillment["basic_response"]);
                                        responseText.fulfillmentText = "Done! "+objectType+" deleted!";
                                    }
                                    res.status(200).send(JSON.stringify(responseText));
                                });
                            }
                            break;
                            case "update" : {
                                //console.log("deleting id " + id);
                                options.path = fulfillment["object.delete"]["thing"]["endpoint"];
                                options.method = fulfillment["object.delete"]["thing"]["type"];
                                options.path += ""+id;
                                console.log(options.path);
                                //console.log(JSON.stringify(options));
                                sendRequest(options,null,function(reply,statusCode){
                                    if(statusCode != "200") {
                                        responseText = Object.assign({},fulfillment["basic_response"]);
                                        responseText.fulfillmentText = "Failed to delete! Make sure you are authenticated or check if the "+objectType+" specified exsists or not";
                                    }
                                    else {
                                        responseText = Object.assign({},fulfillment["basic_response"]);
                                        responseText.fulfillmentText = "Done! "+objectType+" deleted!";
                                    }
                                    res.status(200).send(JSON.stringify(responseText));
                                });
                            }
                            break;
                        }
                    }
                    break;
                    case "unit" : {
                        switch(futureAction) {
                            case "delete" : {
                                //console.log("deleting id " + id);
                                options.path = fulfillment["object.delete"]["unit"]["endpoint"];
                                options.method = fulfillment["object.delete"]["unit"]["type"];
                                options.path += ""+id;
                                console.log(options.path);
                                //console.log(JSON.stringify(options));
                                sendRequest(options,null,function(reply,statusCode){
                                    if(statusCode != "200") {
                                        responseText = Object.assign({},fulfillment["basic_response"]);
                                        responseText.fulfillmentText = "Failed to delete! Make sure you are authenticated or check if the "+objectType+" specified exsists or not";
                                    }
                                    else {
                                        responseText = Object.assign({},fulfillment["basic_response"]);
                                        responseText.fulfillmentText = "Done! "+objectType+" deleted!";
                                    }
                                    res.status(200).send(JSON.stringify(responseText));
                                });
                            }
                            break;
                            case "update" : {

                            }
                            break;
                            case "unit-subunits" : {
                                options = {
                                    "method": fulfillment["object.action-id-by-name"]["unit-subunits"]["type"],
                                    "hostname": fulfillment["server"]["hostname"],
                                    "port": fulfillment["server"]["port"],
                                    "path": fulfillment["object.action-id-by-name"]["unit-subunits"]["endpoint"],
                                    "headers": {
                                        "content-type": fulfillment["object.action-id-by-name"]["unit-subunits"]["content_type"],
                                        "cache-control": "no-cache",
                                        "Cookie": "authorization=; authorization="+token
                                    }
                                };
                                options.path += ""+id;
                                sendRequest(options,null,function(reply,statusCode){
                                    if(statusCode != "200") {
                                        responseText = Object.assign({},fulfillment["basic_response"]);
                                        responseText.fulfillmentText = "Ooops! can't get the subunits, make sure you logged in to perform the action!";
                                    }
                                    else {
                                        responseText = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": "Here is the list:"}}]},"systemIntent": {"intent": "actions.intent.OPTION","data": {"@type": "type.googleapis.com/google.actions.v2.OptionValueSpec","listSelect": {"items": []}}}}}};
                                        if(reply.length > 0) {
                                            for(var i = 0;i<reply.length;i++) {
                                                responseText.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+reply[i].id+": "+reply[i].unitName},"title": ""+reply[i].id+": "+reply[i].unitName, "description":reply[i].description});
                                            }
                                            if(responseText.payload.google.systemIntent.data.listSelect.items.length == 1) {
                                                let tmp = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": ""}},{"simpleResponse": {"textToSpeech": ""}}]}}}};
                                                tmp.payload.google.richResponse.items[1].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].title;
                                                tmp.payload.google.richResponse.items[0].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].description;
                                                responseText = tmp;
                                            }
                                        }
                                        else {
                                            responseText = Object.assign({},fulfillment["basic_response"]);
                                            responseText.fulfillmentText = "No subunits found!";
                                        }
                                    }
                                    res.status(200).send(JSON.stringify(responseText));
                                });
                            }
                            break;
                        }
                    }
                    break;
                    case "device" : {
                        switch(futureAction) {
                            case "delete" : {
                                //console.log("deleting id " + id);
                                options.path = fulfillment["object.delete"]["thing"]["endpoint"];
                                options.method = fulfillment["object.delete"]["thing"]["type"];
                                options.path += ""+id;
                                console.log(options.path);
                                //console.log(JSON.stringify(options));
                                sendRequest(options,null,function(reply,statusCode){
                                    if(statusCode != "200") {
                                        responseText = Object.assign({},fulfillment["basic_response"]);
                                        responseText.fulfillmentText = "Failed to delete! Make sure you are authenticated or check if the "+objectType+" specified exsists or not";
                                    }
                                    else {
                                        responseText = Object.assign({},fulfillment["basic_response"]);
                                        responseText.fulfillmentText = "Done! "+objectType+" deleted!";
                                    }
                                    res.status(200).send(JSON.stringify(responseText));
                                });
                            }
                            break;
                            case "pubsubShadow" : {
                                let attribute = findKey("attributeName",req.body);
                                options.method = fulfillment["pubsub.get-shadow-by-name"]["pubsub"]["type"];
                                options.path = fulfillment["pubsub.get-shadow-by-name"]["pubsub"]["endpoint"];
                                options.path+=''+attribute;
                                console.log(options.path);
                                sendRequest(options,null,function(reply,statusCode){
                                    if(statusCode!= "200") {
                                        responseText.fulfillmentText = "not authenticated !";
                                    }
                                    else {
                                        let tempAttributeList = [];
                                        for(let i=0; i<reply.length; i++) {
                                            if(reply[i].deviceId == id && [i].deviceName.toUpperCase() == name.toUpperCase()) {
                                                tempAttributeList.push({"attributeId":reply[i].deviceAttributeId,"deviceId":reply[i].deviceId,"deviceName":reply[i].deviceName,"parentThingId":reply[i].parentThingId,"parentThingName" : reply[i].parentThingName});
                                            }
                                        }
                                        id = tempAttributeList[0].parentThingId;
                                        console.log("pubsub id "+ id);
                                        options.method = fulfillment["object.action-id-by-name"]["pubsubShadow"]["type"];
                                        options.path = fulfillment["object.action-id-by-name"]["pubsubShadow"]["endpoint"];
                                        options.path += ""+id;
                                        console.log(options.path);
                                        sendRequest(options,null,function(reply,statusCode){
                                            if(statusCode != "200") {
                                                responseText = Object.assign({},fulfillment["basic_response"]);
                                                responseText.fulfillmentText = "Failed to get shadow ! Make sure you are authenticated or check if the device specified exsists or not";
                                            }
                                            else {
                                                responseText = Object.assign({},fulfillment["basic_response"]);
                                                if(reply.state.reported.hasOwnProperty("device"+tempAttributeList[0].deviceId+"."+tempAttributeList[0].attributeId)) {
                                                    responseText.fulfillmentText = "The "+attribute+" is "+reply.state.reported["device"+tempAttributeList[0].deviceId+"."+tempAttributeList[0].attributeId];
                                                    responseText.outputContexts = [{
                                                        "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/pubsubs",
                                                        "lifespanCount": 1,
                                                        "parameters": {
                                                          "device" : tempAttributeList[0].deviceId,
                                                          "attribute" : tempAttributeList[0].attributeId,
                                                          "thing" : tempAttributeList[0].parentThingId,
                                                          "deviceName" : tempAttributeList[0].deviceName
                                                        }
                                                    }];
                                                }
                                                else
                                                    responseText.fulfillmentText = "Oops! I can't find the "+attribute+"! Check if the device is on and connected.";
                                            }
                                            res.status(200).send(JSON.stringify(responseText));
                                        });
                                    }
                                });
                            }
                            break;
                            case "pubsubValue" : {
                                let attribute = findKey("attributeName",req.body);
                                options.method = fulfillment["pubsub.get-shadow-by-name"]["pubsubValue"]["type"];
                                options.path = fulfillment["pubsub.get-shadow-by-name"]["pubsubValue"]["endpoint"];
                                options.path+=''+attribute;
                                console.log(options.path);
                                sendRequest(options,null,function(reply,statusCode){
                                    if(statusCode!= "200") {
                                        responseText.fulfillmentText = "not authenticated !";
                                    }
                                    else {
                                        let tempAttributeList = [];
                                        for(let i=0; i<reply.length; i++) {
                                            if(reply[i].deviceId == id && [i].deviceName.toUpperCase() == name.toUpperCase()) {
                                                tempAttributeList.push({"attributeId":reply[i].deviceAttributeId,"deviceId":reply[i].deviceId,"deviceName":reply[i].deviceName,"parentThingId":reply[i].parentThingId,"parentThingName" : reply[i].parentThingName});
                                            }
                                        }
                                        id = tempAttributeList[0].attributeId;
                                        let value = findKey("value",queryResult.outputContexts);
                                        console.log("pubsub id "+ id);
                                        options.method = fulfillment["object.action-id-by-name"]["pubsubValue"]["type"];
                                        options.path = fulfillment["object.action-id-by-name"]["pubsubValue"]["endpoint"];
                                        options.path += ""+id;
                                        console.log(options.path);
                                        sendRequest(options,{"value" : value},function(reply,statusCode){
                                            if(statusCode != "200") {
                                                responseText = Object.assign({},fulfillment["basic_response"]);
                                                responseText.fulfillmentText = "Failed to set atrribute ! Make sure you are authenticated or check if the device specified exsists or not";
                                            }
                                            else {
                                                responseText = Object.assign({},fulfillment["basic_response"]);
                                                if(reply.state.desired.hasOwnProperty("device"+tempAttributeList[0].deviceId+"."+tempAttributeList[0].attributeId)) {
                                                    responseText.fulfillmentText = "The "+attribute+" is "+reply.state.desired["device"+tempAttributeList[0].deviceId+"."+tempAttributeList[0].attributeId];
                                                    responseText.outputContexts = [{
                                                        "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/pubsubs",
                                                        "lifespanCount": 1,
                                                        "parameters": {
                                                          "device" : tempAttributeList[0].deviceId,
                                                          "attribute" : tempAttributeList[0].attributeId,
                                                          "thing" : tempAttributeList[0].parentThingId,
                                                          "deviceName" : tempAttributeList[0].deviceName
                                                        }
                                                    }];
                                                }
                                                else
                                                    responseText.fulfillmentText = "Oops! I can't find the "+attribute+"! Check if the device is on and connected.";
                                            }
                                            res.status(200).send(JSON.stringify(responseText));
                                        });
                                    }
                                });
                            }
                            break;
                            case "update" : {

                            }
                            break;
                        }
                        break;
                    }
                    break;
                    case "cron" : {
                        switch (futureAction) {
                            case "createCron": {
                                let deviceData = JSON.parse(findKey("deviceData",queryResult.outputContexts));
                                let name = findKey("cronName",queryResult.outputContexts);
                                let conversationId = findKey("conversationId", req.body);
                                if(deviceData.hasOwnProperty(""+id)) {
                                    responseText = Object.assign({},fulfillment["basic_response"]);
                                    responseText.fulfillmentText = "Fine, let me get some details first, which attribute would you like to handle ?";
                                    responseText.outputContexts = [{
                                        "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/cronDetails",
                                        "lifespanCount": 1,
                                        "parameters": {
                                          "object" : "cron",
                                          "objectType" : "cron",
                                          "futureAction" : "createCron",
                                          "cronName" : name,
                                          "thingId" : deviceData[""+id].thingId,
                                          "deviceId" : id,
                                          "deviceDetails" : JSON.stringify({"deviceAttributes": deviceData[""+id].deviceAttributes})
                                        }
                                    }];
                                }
                                else {
                                    responseText = Object.assign({},fulfillment["basic_response"]);
                                    responseText.fulfillmentText = "Can't find that ID with the specified device name! Please try adding the cron again...";
                                }
                                res.status(200).send(JSON.stringify(responseText));
                            }
                            break;
                            case "delete" : {
                                //console.log("deleting id " + id);
                                options.path = fulfillment["object.delete"]["cron"]["endpoint"];
                                options.method = fulfillment["object.delete"]["cron"]["type"];
                                options.path += ""+id;
                                console.log(options.path);
                                //console.log(JSON.stringify(options));
                                sendRequest(options,null,function(reply,statusCode){
                                    if(statusCode != "200") {
                                        responseText = Object.assign({},fulfillment["basic_response"]);
                                        responseText.fulfillmentText = "Failed to delete! Make sure you are authenticated or check if the "+objectType+" specified exsists or not";
                                    }
                                    else {
                                        responseText = Object.assign({},fulfillment["basic_response"]);
                                        responseText.fulfillmentText = "Done! "+objectType+" deleted!";
                                    }
                                    res.status(200).send(JSON.stringify(responseText));
                                });
                            }
                            break;
                        }
                    }
                    break;
                    case "attribute" : {
                        switch (futureAction) {
                            case "createAttribute" : {
                                let deviceDetails = JSON.parse(findKey("deviceDetails",queryResult.outputContexts));
                                if(deviceDetails.hasOwnProperty(""+id)) {
                                    let name = findKey("attributeName",queryResult.outputContexts);
                                    let type = findKey("type",queryResult.outputContexts);
                                    let def = findKey("defaultValue",queryResult.outputContexts);
                                    let apiInput = Object.assign({},fulfillment[intent][objectType]["apiInput"]);
                                    apiInput.name = name;
                                    apiInput.type = type;
                                    apiInput.def = def;
                                    apiInput.parentDeviceId = id;
                                    apiInput.ownerUnitId = parseInt(""+deviceDetails[""+id].ownerUnitId);
                                    console.log(name + " "+type + " " + def + " " + options.path+ " "+ id+" "+apiInput.ownerUnitId);
                                    sendRequest(options,apiInput,function(reply,statusCode){
                                        responseText = Object.assign({},fulfillment["basic_response"]);
                                        if(statusCode!= "200") {
                                            console.log("failed");
                                            responseText.fulfillmentText = "not authenticated !";
                                        }
                                        else {
                                            console.log("success");
                                            responseText.fulfillmentText = "done "+name+" added successfully!";
                                        }
                                        res.status(200).send(JSON.stringify(responseText));
                                    });
                                }
                                else {
                                    responseText = Object.assign({},fulfillment["basic_response"]);
                                    responseText.fulfillmentText = "Sorry, that ID didn't match with specified device name!";
                                    res.status(200).send(JSON.stringify(responseText));
                                }
                            }
                            break;
                        }
                    }
                    break;
                }
            }
            break;

            /*Done*/
            case "object.get-name" : {
                responseText = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": "Here is the list:"}}]},"systemIntent": {"intent": "actions.intent.OPTION","data": {"@type": "type.googleapis.com/google.actions.v2.OptionValueSpec","listSelect": {"items": []}}}}}};
                switch(objectType) {
                    case "thing" : {
                        let name = queryResult.parameters.name;
                        let thing;
                        sendRequest(options,null,function(reply,statusCode){
                            for(let i = 0;i<reply.length;i++) {
                                if(reply[i].name.toUpperCase() == name.toUpperCase()) {
                                    let storageEnabled = "and storage not enabled.";
                                    if(reply[i].storageEnabled == true)
                                    storageEnabled = "and storage enabled.";
                                    responseText.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+objectType+": "+reply[i].id+reply[i].name},"title": ""+reply[i].name+" (ID:"+reply[i].id+"): "+reply[i].description,"description": "Unit: "+reply[i].parentUnit.unitName+"(ID:"+reply[i].parentUnit.id+") The thing has "+reply[i].devices.length+" devices, "+reply[i].crons.length+" crons, "+reply[i].rules.length+"rules "+storageEnabled});
                                    thing = reply[i];
                                }
                            }
                            if(responseText.payload.google.systemIntent.data.listSelect.items.length == 1) {
                                let tmp = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": ""}},{"simpleResponse": {"textToSpeech": ""}}]}}}};
                                tmp.payload.google.richResponse.items[0].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].title;
                                tmp.payload.google.richResponse.items[1].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].description;
                                responseText.payload = tmp.payload;
                                responseText.outputContexts = [{
                                    "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/object",
                                    "lifespanCount": 5,
                                    "parameters": {
                                      "object" : "thing",
                                      "id" : thing.id,
                                      "name": thing.name,
                                      "description":thing.description
                                    }
                                }];
                            }
                            else if(responseText.payload.google.systemIntent.data.listSelect.items.length == 0) {
                                responseText = Object.assign({},fulfillment["basic_response"]);
                                responseText.fulfillmentText = "No "+objectType+"s with name: "+name;
                            }
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "unit" : {
                        let name = queryResult.parameters.name;
                        let unit;
                        sendRequest(options,null,function(reply,statusCode){
                            for(let i = 0;i<reply.length;i++) {
                                if(reply[i].unitName.toUpperCase() == name.toUpperCase()) {
                                    responseText.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+objectType+": "+reply[i].id+reply[i].unitName},"title": "(ID:"+reply[i].id+")"+reply[i].unitName,"description": ""+reply[i].description});
                                    unit = reply[i];
                                }
                            }
                            if(responseText.payload.google.systemIntent.data.listSelect.items.length == 1) {
                                let tmp = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": ""}},{"simpleResponse": {"textToSpeech": ""}}]}}}};
                                tmp.payload.google.richResponse.items[0].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].title;
                                tmp.payload.google.richResponse.items[1].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].description;
                                responseText.payload = tmp.payload;
                                responseText.outputContexts = [{
                                    "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/object",
                                    "lifespanCount": 5,
                                    "parameters": {
                                      "object" : "unit",
                                      "id" : unit.id,
                                      "unitName" : unit.unitName,
                                      "description" : unit.description,
                                      "photo" : unit.photo
                                    }
                                }];
                            }
                            else if(responseText.payload.google.systemIntent.data.listSelect.items.length == 0) {
                                responseText = Object.assign({},fulfillment["basic_response"]);
                                responseText.fulfillmentText = "No "+objectType+"s with name: "+name;
                            }
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "user" : {
                        let name = queryResult.parameters.name;
                        let user;
                        sendRequest(options,null,function(reply,statusCode){
                            for(let i = 0;i<reply.length;i++) {
                                if(reply[i].name.toUpperCase() == name.toUpperCase()) {
                                    responseText.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+objectType+": "+reply[i].id+reply[i].name},"title": "(ID:"+reply[i].id+")"+reply[i].name,"description": ""+reply[i].email});
                                    user = reply[i];
                                }
                            }
                            if(responseText.payload.google.systemIntent.data.listSelect.items.length == 1) {
                                let tmp = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": ""}},{"simpleResponse": {"textToSpeech": ""}}]}}}};
                                tmp.payload.google.richResponse.items[0].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].title;
                                tmp.payload.google.richResponse.items[1].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].description;
                                responseText.payload = tmp.payload;
                                responseText.outputContexts = [{
                                    "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/object",
                                    "lifespanCount": 5,
                                    "parameters": {
                                      "object" : "user",
                                      "id" : user.id,
                                      "name":user.name,
                                      "email":user.email
                                    }
                                }];
                            }
                            else if(responseText.payload.google.systemIntent.data.listSelect.items.length == 0) {
                                responseText = Object.assign({},fulfillment["basic_response"]);
                                responseText.fulfillmentText = "No "+objectType+"s with name: "+name;
                            }
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "device" :  {
                        let name = queryResult.parameters.name;
                        let device;
                        sendRequest(options,null,function(reply,statusCode){

                            for(let i = 0;i<reply.length;i++) {
                                if(reply[i].name.toUpperCase() == name.toUpperCase()) {
                                    let storageEnabled = "and storage not enabled.";
                                    if(reply[i].storageEnabled == true)
                                        storageEnabled = "and storage enabled.";
                                    responseText.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+objectType+": "+reply[i].id+reply[i].name},"title": ""+reply[i].name+" (ID:"+reply[i].id+"): ","description":reply[i].description});
                                    device = reply[i];
                                }
                            }
                            if(responseText.payload.google.systemIntent.data.listSelect.items.length == 1) {
                                let tmp = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": ""}},{"simpleResponse": {"textToSpeech": ""}}]}}}};
                                tmp.payload.google.richResponse.items[0].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].title;
                                tmp.payload.google.richResponse.items[1].simpleResponse.textToSpeech = "Description: "+responseText.payload.google.systemIntent.data.listSelect.items[0].description=="" ? "device does not have description" :responseText.payload.google.systemIntent.data.listSelect.items[0].description;
                                //console.log(JSON.stringify(tmp));
                                //console.log(responseText.payload.google.systemIntent.data.listSelect.items[0].description=="" ? "device does not have description" :responseText.payload.google.systemIntent.data.listSelect.items[0].description);
                                //console.log(tmp.payload.google.richResponse.items[1].simpleResponse.textToSpeech);
                                responseText.payload = tmp.payload;
                                responseText.outputContexts = [{
                                    "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/object",
                                    "lifespanCount": 5,
                                    "parameters": {
                                      "object" : "device",
                                      "id" : device.id,
                                      "name":device.name,
                                      "deviceAttributes":device.deviceAttributes
                                    }
                                }];
                            }
                            else if(responseText.payload.google.systemIntent.data.listSelect.items.length == 0) {
                                responseText = Object.assign({},fulfillment["basic_response"]);
                                responseText.fulfillmentText = "No "+objectType+"s with name: "+name;
                            }
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "cron" :  {
                        let name = queryResult.parameters.name;
                        let cron;
                        sendRequest(options,null,function(reply,statusCode){

                            for(let i = 0;i<reply.length;i++) {
                                if(reply[i].cronName.toUpperCase() == name.toUpperCase()) {
                                    responseText.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+objectType+": "+reply[i].id+reply[i].name},"title": ""+reply[i].cronName+" (ID:"+reply[i].id+"): ","cronExpression":reply[i].cronExpression});
                                    cron = reply[i];
                                }
                            }
                            if(responseText.payload.google.systemIntent.data.listSelect.items.length == 1) {
                                let tmp = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": ""}},{"simpleResponse": {"textToSpeech": ""}}]}}}};
                                tmp.payload.google.richResponse.items[0].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].title;
                                tmp.payload.google.richResponse.items[1].simpleResponse.textToSpeech = "Description: "+responseText.payload.google.systemIntent.data.listSelect.items[0].cronExpression=="" ? "device does not have description" :responseText.payload.google.systemIntent.data.listSelect.items[0].cronExpression;
                                //console.log(JSON.stringify(tmp));
                                //console.log(responseText.payload.google.systemIntent.data.listSelect.items[0].description=="" ? "device does not have description" :responseText.payload.google.systemIntent.data.listSelect.items[0].description);
                                //console.log(tmp.payload.google.richResponse.items[1].simpleResponse.textToSpeech);
                                responseText.payload = tmp.payload;
                                responseText.outputContexts = [{
                                    "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/object",
                                    "lifespanCount": 5,
                                    "parameters": {
                                      "object" : "device",
                                      "id" : cron.id,
                                      "cronName":cron.cronName,
                                      "cronExpression":cron.cronExpression,
                                      "desiredState":cron.desiredState,
                                      "cloudwatchResource":cron.cloudwatchResource
                                    }
                                }];
                            }
                            else if(responseText.payload.google.systemIntent.data.listSelect.items.length == 0) {
                                responseText = Object.assign({},fulfillment["basic_response"]);
                                responseText.fulfillmentText = "No "+objectType+"s with name: "+name;
                            }
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                }
            }
            break;

            /*Pending*/
            case "object.get-it" : {
                switch (objectType) {
                    case "thing": {
                        let param = findKey("param",queryResult.parameters);
                        let id = findKey("id",queryResult.outputContexts);
                        options.path += ""+id;
                        console.log(param + " "+id + " " + options.path);
                        sendRequest(options,null,function(reply,statusCode) {
                            responseText = Object.assign({},fulfillment["basic_response"]);
                            if(statusCode == "405")
                                responseText.fulfillmentText = "not authenticated !";
                            else if(statusCode == "404")
                                responseText.fulfillmentText = "Looks like something is not right... May be the "+objectType+" does not exsist!";
                            else if(statusCode == "200") {
                                responseText.fulfillmentText = ""+param+" of the "+objectType+" is: "+reply[param];
                                if(reply[param] == "")
                                    responseText.fulfillmentText = ""+param+" of the "+objectType+" is not set";
                            } else
                                responseText.fulfillmentText = "Sorry! I failed to do that... Please try again";
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "unit": {
                        let param = findKey("param",queryResult.parameters);
                        // changing common name to unitName
                        if(param == "name"){
                            param = "unitName";
                        }
                        let id = findKey("id",queryResult.outputContexts);
                        options.path += ""+id;
                        sendRequest(options,null,function(reply,statusCode) {
                            responseText = Object.assign({},fulfillment["basic_response"]);
                            if(statusCode == "405")
                                responseText.fulfillmentText = "not authenticated !";
                            else if(statusCode == "404")
                                responseText.fulfillmentText = "Looks like something is not right... May be the "+objectType+" does not exsist!";
                            else if(statusCode == "200") {
                                responseText.fulfillmentText = ""+param+" of the "+objectType+" is: "+reply[param];
                                if(reply[param] == "")
                                    responseText.fulfillmentText = ""+param+" of the "+objectType+" is not set";
                            } else
                                responseText.fulfillmentText = "Sorry! I failed to do that... Please try again";
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "device": {
                        let param = findKey("param",queryResult.parameters);
                        let id = findKey("id",queryResult.outputContexts);
                        options.path += ""+id;
                        sendRequest(options,null,function(reply,statusCode) {
                            responseText = Object.assign({},fulfillment["basic_response"]);
                            if(statusCode == "405")
                                responseText.fulfillmentText = "not authenticated !";
                            else if(statusCode == "404")
                                responseText.fulfillmentText = "Looks like something is not right... May be the "+objectType+" does not exsist!";
                            else if(statusCode == "200") {
                                responseText.fulfillmentText = ""+param+" of the "+objectType+" is: "+reply[param];
                                if(reply[param] == "")
                                    responseText.fulfillmentText = ""+param+" of the "+objectType+" is not set";
                            } else
                                responseText.fulfillmentText = "Sorry! I failed to do that... Please try again";
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "user": {
                        let param = findKey("param",queryResult.parameters);
                        let id = findKey("id",queryResult.outputContexts);
                        options.path += ""+id;
                        sendRequest(options,null,function(reply,statusCode) {
                            responseText = Object.assign({},fulfillment["basic_response"]);
                            if(statusCode == "405")
                                responseText.fulfillmentText = "not authenticated !";
                            else if(statusCode == "404")
                                responseText.fulfillmentText = "Looks like something is not right... May be the "+objectType+" does not exsist!";
                            else if(statusCode == "200") {
                                responseText.fulfillmentText = ""+param+" of the "+objectType+" is: "+reply[param];
                                if(reply[param] == "")
                                    responseText.fulfillmentText = ""+param+" of the "+objectType+" is not set";
                            }
                            else
                                responseText.fulfillmentText = "Sorry! I failed to do that... Please try again";
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    default:
                    break;
                }
            }
            break;
            /*Done*/
            case "object.param-change-it-to" :
            /*Done*/
            case "object.set-param" : {
                switch (objectType) {
                    case "thing": {
                        let param = queryResult.parameters.param;
                        let newValue = queryResult.parameters.newValue;
                        let id = fromOutputContext(queryResult.outputContexts,'object','id');
                        let apiInput = fulfillment[intent][objectType]["apiInput"];
                        apiInput['name'] = fromOutputContext(queryResult.outputContexts,'object','name');
                        apiInput['description'] = fromOutputContext(queryResult.outputContexts,'object','description');
                        apiInput[param] = newValue;
                        options.path += ""+id;
                        sendRequest(options,apiInput,function(reply,statusCode) {
                            responseText = Object.assign({},fulfillment["basic_response"]);
                            if(statusCode == "405")
                                responseText.fulfillmentText = "not authenticated !";
                            else if(statusCode == "404")
                                responseText.fulfillmentText = "Looks like something is not right... May be the "+objectType+" you want to update does not exsists!";
                            else if(statusCode == "200")
                                responseText.fulfillmentText = "Updated the "+param+" to "+newValue;
                            else
                                responseText.fulfillmentText = "Sorry! I failed to do that... Please try again";
                            responseText.outputContexts = [{
                                "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/param",
                                "lifespanCount": 1,
                                "parameters": {
                                  "object" : "thing",
                                  "param" : param
                                }
                            }];
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "unit": {
                        let param = queryResult.parameters.param;
                        if(param == "name") {
                            param = "unitName";
                        }
                        let newValue = findKey("newValue",queryResult.parameters);
                        let id = fromOutputContext(queryResult.outputContexts,'object','id');
                        let apiInput = fulfillment[intent][objectType]["apiInput"];
                        apiInput['unitName'] = fromOutputContext(queryResult.outputContexts,'object','name');
                        apiInput['description'] = fromOutputContext(queryResult.outputContexts,'object','description');
                        apiInput[param] = newValue;
                        options.path += ""+id;
                        sendRequest(options,apiInput,function(reply,statusCode) {
                            responseText = Object.assign({},fulfillment["basic_response"]);
                            if(statusCode == "405")
                                responseText.fulfillmentText = "not authenticated !";
                            else if(statusCode == "404")
                                responseText.fulfillmentText = "Looks like something is not right... May be the "+objectType+" you want to update does not exsists!";
                            else if(statusCode == "200")
                                responseText.fulfillmentText = "Updated the "+param+" to "+newValue;
                            else
                                responseText.fulfillmentText = "Sorry! I failed to do that... Please try again";
                            responseText.outputContexts = [{
                                "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/param",
                                "lifespanCount": 1,
                                "parameters": {
                                  "object" : "unit",
                                  "param" : param
                                }
                            }];
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "device": {
                        let param = queryResult.parameters.param;
                        let newValue = queryResult.parameters.newValue;
                        let id = fromOutputContext(queryResult.outputContexts,'object','id');
                        let apiInput = fulfillment[intent][objectType]["apiInput"];
                        apiInput['name'] = fromOutputContext(queryResult.outputContexts,'object','name');
                        apiInput['description'] = fromOutputContext(queryResult.outputContexts,'object','description');
                        apiInput[param] = newValue;
                        options.path += ""+id;
                        sendRequest(options,apiInput,function(reply,statusCode) {
                            responseText = Object.assign({},fulfillment["basic_response"]);
                            if(statusCode == "405")
                                responseText.fulfillmentText = "not authenticated !";
                            else if(statusCode == "404")
                                responseText.fulfillmentText = "Looks like something is not right... May be the "+objectType+" you want to update does not exsists!";
                            else if(statusCode == "200")
                                responseText.fulfillmentText = "Updated the "+param+" to "+newValue;
                            else
                                responseText.fulfillmentText = "Sorry! I failed to do that... Please try again";
                            responseText.outputContexts = [{
                                "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/param",
                                "lifespanCount": 1,
                                "parameters": {
                                  "object" : "device",
                                  "param" : param
                                }
                            }];
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    default:
                    break;
                }
            }
            break;

            /*Done*/
            case "object.rem-param" : {
                switch (objectType) {
                    case "thing": {
                        let param = findKey("param",queryResult.parameters);
                        let id = findKey("id",queryResult.outputContexts);
                        let apiInput = fulfillment[intent][objectType]["apiInput"];
                        apiInput[param] = "";
                        options.path += ""+id;
                        sendRequest(options,apiInput,function(reply,statusCode) {
                            responseText = Object.assign({},fulfillment["basic_response"]);
                            if(statusCode == "405")
                                responseText.fulfillmentText = "not authenticated !";
                            else if(statusCode == "404")
                                responseText.fulfillmentText = "Looks like something is not right... May be the "+objectType+" does not exsists or "+param+" can't be removed!";
                            else if(statusCode == "200")
                                responseText.fulfillmentText = "Removed the "+param;
                            else
                                responseText.fulfillmentText = "Sorry! I failed to do that... Please try again";
                            responseText.outputContexts = [{
                                "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/param",
                                "lifespanCount": 1,
                                "parameters": {
                                  "object" : "thing",
                                  "param" : param
                                }
                            }];
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "unit": {
                        let param = findKey("param",queryResult.parameters);
                        if(param == "name")
                            param = "unitName";
                        let id = findKey("id",queryResult.outputContexts);
                        let apiInput = fulfillment[intent][objectType]["apiInput"];
                        apiInput[param] = "";
                        options.path += ""+id;
                        sendRequest(options,apiInput,function(reply,statusCode) {
                            responseText = Object.assign({},fulfillment["basic_response"]);
                            if(statusCode == "405")
                                responseText.fulfillmentText = "not authenticated !";
                            else if(statusCode == "404")
                                responseText.fulfillmentText = "Looks like something is not right... May be the "+objectType+" does not exsists or "+param+" can't be removed!";
                            else if(statusCode == "200")
                                responseText.fulfillmentText = "Removed the "+param;
                            else
                                responseText.fulfillmentText = "Sorry! I failed to do that... Please try again";
                            responseText.outputContexts = [{
                                "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/param",
                                "lifespanCount": 1,
                                "parameters": {
                                  "object" : "unit",
                                  "param" : param
                                }
                            }];
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "device": {
                        let param = findKey("param",queryResult.parameters);
                        let id = findKey("id",queryResult.outputContexts);
                        let apiInput = fulfillment[intent][objectType]["apiInput"];
                        apiInput[param] = "";
                        options.path += ""+id;
                        sendRequest(options,apiInput,function(reply,statusCode) {
                            responseText = Object.assign({},fulfillment["basic_response"]);
                            if(statusCode == "405")
                                responseText.fulfillmentText = "not authenticated !";
                            else if(statusCode == "404")
                                responseText.fulfillmentText = "Looks like something is not right... May be the "+objectType+" does not exsists or "+param+" can't be removed!";
                            else if(statusCode == "200")
                                responseText.fulfillmentText = "Removed the "+param;
                            else
                                responseText.fulfillmentText = "Sorry! I failed to do that... Please try again";
                            responseText.outputContexts = [{
                                "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/param",
                                "lifespanCount": 1,
                                "parameters": {
                                  "object" : "device",
                                  "param" : param
                                }
                            }];
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    default:
                    break;
                }
            }
            break;

            /*Done*/
            case "object.get-param" : {
                switch (objectType) {
                    case "thing": {
                        let param = findKey("param",queryResult.parameters);
                        let id = findKey("id",queryResult.outputContexts);
                        options.path += ""+id;
                        console.log(param + " "+id + " " + options.path);
                        sendRequest(options,null,function(reply,statusCode) {
                            responseText = Object.assign({},fulfillment["basic_response"]);
                            if(statusCode == "405")
                                responseText.fulfillmentText = "not authenticated !";
                            else if(statusCode == "404")
                                responseText.fulfillmentText = "Looks like something is not right... May be the "+objectType+" does not exsist!";
                            else if(statusCode == "200") {
                                responseText.fulfillmentText = ""+param+" of the "+objectType+" is: "+reply[param];
                                if(reply[param] == "")
                                    responseText.fulfillmentText = ""+param+" of the "+objectType+" is not set";
                            } else
                                responseText.fulfillmentText = "Sorry! I failed to do that... Please try again";
                            responseText.outputContexts = [{
                                "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/param",
                                "lifespanCount": 1,
                                "parameters": {
                                  "object" : "thing",
                                  "param" : param
                                }
                            }];
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "unit": {
                        let param = findKey("param",queryResult.parameters);
                        // changing common name to unitName
                        if(param == "name"){
                            param = "unitName";
                        }
                        let id = findKey("id",queryResult.outputContexts);
                        options.path += ""+id;
                        sendRequest(options,null,function(reply,statusCode) {
                            responseText = Object.assign({},fulfillment["basic_response"]);
                            if(statusCode == "405")
                                responseText.fulfillmentText = "not authenticated !";
                            else if(statusCode == "404")
                                responseText.fulfillmentText = "Looks like something is not right... May be the "+objectType+" does not exsist!";
                            else if(statusCode == "200") {
                                responseText.fulfillmentText = ""+param+" of the "+objectType+" is: "+reply[param];
                                if(reply[param] == "")
                                    responseText.fulfillmentText = ""+param+" of the "+objectType+" is not set";
                            } else
                                responseText.fulfillmentText = "Sorry! I failed to do that... Please try again";
                            responseText.outputContexts = [{
                                "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/param",
                                "lifespanCount": 1,
                                "parameters": {
                                    "object" : "unit",
                                    "param" : param
                                }
                            }];
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "device": {
                        let param = findKey("param",queryResult.parameters);
                        let id = findKey("id",queryResult.outputContexts);
                        options.path += ""+id;
                        sendRequest(options,null,function(reply,statusCode) {
                            responseText = Object.assign({},fulfillment["basic_response"]);
                            if(statusCode == "405")
                                responseText.fulfillmentText = "not authenticated !";
                            else if(statusCode == "404")
                                responseText.fulfillmentText = "Looks like something is not right... May be the "+objectType+" does not exsist!";
                            else if(statusCode == "200") {
                                responseText.fulfillmentText = ""+param+" of the "+objectType+" is: "+reply[param];
                                if(reply[param] == "")
                                    responseText.fulfillmentText = ""+param+" of the "+objectType+" is not set";
                            } else
                                responseText.fulfillmentText = "Sorry! I failed to do that... Please try again";
                            responseText.outputContexts = [{
                                "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/param",
                                "lifespanCount": 1,
                                "parameters": {
                                    "object" : "device",
                                    "param" : param
                                }
                            }];
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "user": {
                        let param = findKey("param",queryResult.parameters);
                        let id = findKey("id",queryResult.outputContexts);
                        options.path += ""+id;
                        sendRequest(options,null,function(reply,statusCode) {
                            responseText = Object.assign({},fulfillment["basic_response"]);
                            if(statusCode == "405")
                                responseText.fulfillmentText = "not authenticated !";
                            else if(statusCode == "404")
                                responseText.fulfillmentText = "Looks like something is not right... May be the "+objectType+" does not exsist!";
                            else if(statusCode == "200") {
                                responseText.fulfillmentText = ""+param+" of the "+objectType+" is: "+reply[param];
                                if(reply[param] == "")
                                    responseText.fulfillmentText = ""+param+" of the "+objectType+" is not set";
                            }
                            else
                                responseText.fulfillmentText = "Sorry! I failed to do that... Please try again";
                            responseText.outputContexts = [{
                                "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/param",
                                "lifespanCount": 1,
                                "parameters": {
                                    "object" : "user",
                                    "param" : param
                                }
                            }];
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    default:
                    break;
                }
            }
            break;

            /*Done*/
            case "unit.subunits" : {
                let name = queryResult.parameters.name;
                let conversationId = findKey("conversationId", req.body);
                responseText = Object.assign({},fulfillment["basic_response"]);
                sendRequest(options,null,function(reply,statusCode){
                    if(statusCode!= "200") {
                        responseText.fulfillmentText = "not authenticated !";
                    }
                    else {
                        let tempIdList = [];
                        for(let i=0;i<reply.length;i++) {
                            if(reply[i].unitName.toUpperCase() == name.toUpperCase())
                                tempIdList.push(reply[i].id);
                        }
                        if(tempIdList.length > 1) {
                            responseText = Object.assign({},fulfillment["basic_response"]);;
                            responseText.fulfillmentText = "Found multiple "+objectType+"s with name: "+name+"; [";
                            for(let i=0;i<tempIdList.length;i++) {
                                if(i==0)
                                    responseText.fulfillmentText += ""+tempIdList[i];
                                else
                                    responseText.fulfillmentText += ","+tempIdList[i];
                            }
                            responseText.fulfillmentText += "], please choose an ID to get it's subunits:";
                            responseText.outputContexts = [{
                                "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/action-id-by-name",
                                "lifespanCount": 5,
                                "parameters": {
                                  "object" : "unit",
                                  "futureAction" : "unit-subunits",
                                  "objectName" : name
                                }
                            }];
                            res.status(200).send(JSON.stringify(responseText));
                        }
                        else if(tempIdList.length == 1){
                            options = {
                                "method": fulfillment["object.action-id-by-name"]["unit-subunits"]["type"],
                                "hostname": fulfillment["server"]["hostname"],
                                "port": fulfillment["server"]["port"],
                                "path": fulfillment["object.action-id-by-name"]["unit-subunits"]["endpoint"],
                                "headers": {
                                    "content-type": fulfillment["object.action-id-by-name"]["unit-subunits"]["content_type"],
                                    "cache-control": "no-cache",
                                    "Cookie": "authorization=; authorization="+token
                                }
                            };
                            options.path += ""+tempIdList[0];
                            sendRequest(options,null,function(reply,statusCode){
                                if(statusCode != "200") {
                                    responseText = Object.assign({},fulfillment["basic_response"]);
                                    responseText.fulfillmentText = "Ooops! can't get the subunits, make sure you logged in to perform the action!";
                                }
                                else {
                                    responseText = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": "Here is the list:"}}]},"systemIntent": {"intent": "actions.intent.OPTION","data": {"@type": "type.googleapis.com/google.actions.v2.OptionValueSpec","listSelect": {"items": []}}}}}};
                                    if(reply.length > 0) {
                                        for(var i = 0;i<reply.length;i++) {
                                            responseText.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+reply[i].id+": "+reply[i].unitName},"title": ""+reply[i].id+": "+reply[i].unitName, "description":reply[i].description});
                                        }
                                        if(responseText.payload.google.systemIntent.data.listSelect.items.length == 1) {
                                            let tmp = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": ""}},{"simpleResponse": {"textToSpeech": ""}}]}}}};
                                            tmp.payload.google.richResponse.items[1].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].title;
                                            tmp.payload.google.richResponse.items[0].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].description;
                                            responseText = tmp;
                                        }
                                    }
                                    else {
                                        responseText = Object.assign({},fulfillment["basic_response"]);
                                        responseText.fulfillmentText = "No subunits found!";
                                    }
                                }
                                res.status(200).send(JSON.stringify(responseText));
                            });
                        }
                        else {
                            responseText = Object.assign({},fulfillment["basic_response"]);;
                            responseText.fulfillmentText = "No "+objectType+" found with name: "+name;
                            res.status(200).send(JSON.stringify(responseText));
                        }
                    }
                });
            }
            break;

            /*Done*/
            case "create.cron-add-details" : {
                let deviceId = queryResult.parameters.deviceId;
                let cronName = queryResult.parameters.cronName;
                let thingId = queryResult.parameters.thingId;
                let attributeName = queryResult.parameters.attributeName;
                let desiredValue = queryResult.parameters.desiredValue;
                let cronExpression = queryResult.parameters.cronExpression;
                let deviceDetails = JSON.parse(queryResult.parameters.deviceDetails);
                let attribute = null;
                for(let i=0;i<deviceDetails.deviceAttributes.length;i++) {
                    if(deviceDetails.deviceAttributes[i].name.toUpperCase() == attributeName.toUpperCase()) {
                        attribute = deviceDetails.deviceAttributes[i];
                        break;
                    }
                }
                let desiredState;
                if(attribute != null) {
                    if(attribute.type != "String")
                        desiredValue = desiredValue.toLowerCase();
                    if((attribute.type == "Boolean") && ["1","on","true","glow","start","open"].includes(desiredValue))
                        desiredValue = 1;
                    else if((attribute.type == "Boolean") && ["0","off","false","glow","stop","close"].includes(desiredValue))
                        desiredValue = 0;
                    else if((attribute.type == "Double" || attribute.type == "Integer") && (!isNaN(parseFloat(desiredValue))))
                        desiredValue = parseFloat(desiredValue);
                    desiredState = "{\"device"+deviceId+"."+attribute.id+"\":"+desiredValue+"}";

                    let apiInput = fulfillment[intent][objectType]["apiInput"];
                    apiInput.thingId = parseInt(thingId);
                    apiInput.name = cronName;

                    //Get cron expression
                    cronExpression = getCronString(cronExpression);
                    if(!cronExpression.includes('ERROR')) {
                        apiInput.cronExpression = cronExpression;
                        apiInput.desiredState = desiredState;
                        responseText = Object.assign({},fulfillment["basic_response"]);;
                        sendRequest(options,apiInput,function(reply,statusCode){
                            if(statusCode!= "200") {
                                responseText.fulfillmentText = "not authenticated !";
                            }
                            else {
                                console.log("success");
                                responseText.fulfillmentText = "Created cron "+cronName+" successfully!";
                            }
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    else {
                        responseText = Object.assign({},fulfillment["basic_response"]);
                        responseText.fulfillmentText = "Sorry, can not create Cron from that, please try creating cron again!";
                        res.status(200).send(JSON.stringify(responseText));
                    }
                }
                else {
                    responseText = Object.assign({},fulfillment["basic_response"]);
                    responseText.fulfillmentText = ""+attributeName+" not found in device!";
                    res.status(200).send(JSON.stringify(responseText));
                }
            }
            break;

            default: {
                responseText = Object.assign({},fulfillment["basic_response"]);
                responseText.fulfillmentText = "fulfillment not defined";
                res.status(200).send(JSON.stringify(responseText));
            }

        }
    }
    //Bad request
    else {
        responseText.fulfillmentText = "";
        console.log(JSON.stringify(req));
        res.status(200).send(JSON.stringify(responseText));
    }
};
