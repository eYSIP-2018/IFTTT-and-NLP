var fulfillment = {
    "project": {
        "projectID": "eyantra-iot-f0957"
    },
    "basic_response" : {
        "fulfillmentText": "",
        "fulfillmentMessages": [],
        "source": "example.com",
        "payload": {},
        "outputContexts": [],
        "followupEventInput": {}
    },
    "server" : {
        "protocol" : "https",
        "hostname" : "cd8e9a8c.ngrok.io",
        "port" : null
    },
    "thing.create": {
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
            "endpoint" : "/cron/create",
            "type" : "POST",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : false,
            "apiInput" : {
                "thingId" : "",
                "name" : "",
                "cronExpression" : "",
                "desiredState" : ""
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
                "ip" : "",
                "parentUnitId" : 1
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
    },
    "pubsub.get-shadow-by-name" : {
        "pubsubShadow": {
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
    "pubsub.set-value-by-name" : {
        "pubsubValue": {
            "endpoint" : "/thing/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : "",
                "value" : ""
            }
        }
    }
};

const http = require('http');
const qs = require('querystring');

var queryResult;
var responseText = fulfillment["basic_response"];
var intent;
var objectType;
var options;
var reply;
var conversationId;
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
    if(apiInput != null)
        request.write(qs.stringify(apiInput));
    request.end();
}

exports.eYantraWebhook = (req, res) => {
    if(req.hasOwnProperty("body") && req.body.hasOwnProperty("queryResult") && req.body.queryResult.hasOwnProperty("intent") && req.body.queryResult.intent.hasOwnProperty("displayName")) {
        queryResult = req.body.queryResult;
        console.log("Intent : "+ queryResult.intent.displayName);
        intent = queryResult.intent.displayName;
        objectType = findKey("object", queryResult);
        token = findKey("accessToken", req.body);
        conversationId = findKey("conversationId", req.body);
        responseText = fulfillment["basic_response"];
        if(token == null) {
            token = findKey("session",req.body);
            if(token != null)
                token = token.split('/').pop();
        }
        if(token == null) {
            token = findKey("session",req.body);
            if(token != null)
                token = token.split('/').pop();
        }
        if(token == null) {
            responseText.fulfillmentText = "not authenticated!";
            res.status(200).send(JSON.stringify(responseText));
        }
        console.log("Token: "+token);
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
        switch(intent) {
            /*done*/
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
                        responseText.fulfillmentText = "Thing created with Id : "+reply.id + " Name : " + reply.name + " parentUnit : " + reply.parentUnit.id + " "+reply.parentUnit.unitName;
                        responseText.outputContexts = [{
                            "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/object",
                            "lifespanCount": 5,
                            "parameters": {
                              "object" : "thing",
                              "id" : reply.id
                            }
                        }];
                    }
                    res.status(200).send(JSON.stringify(responseText));
                });
            }
            break;

            /*done*/
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

            /*done*/
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
            /*Pending*/
            case "create.cron" : {
                let apiInput = fulfillment[intent][objectType]["apiInput"];
                apiInput.name = queryResult.parameters.name;
                apiInput.thingId = queryResult.parameters.thingId;
                apiInput.desiredstate = queryResult.parameters.desiredstate;
                apiInput.cronExpression = queryResult.parameters.cronExpression;

                //console.log("inside cron.create "+options.hostname+options.path);
                sendRequest(options,apiInput,function(reply,statusCode){
                    console.log("inside created " + statusCode);
                    if(statusCode!= "200") {
                        responseText.fulfillmentText = "not authenticated !";
                    }
                    else {
                        responseText.fulfillmentText = "Thing created with Name : " + reply.name + " parentUnit : " + reply.parentUnit.id + " "+reply.parentUnit.unitName;
                    }
                    res.status(200).send(JSON.stringify(responseText));
                });
            }
            break;

            case "object.delete-all - yes" : {
                switch(objectType) {
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
                                responseText = fulfillment["basic_response"];
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
                responseText = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": "Here is the list:"}}]},"systemIntent": {"intent": "actions.intent.OPTION","data": {"@type": "type.googleapis.com/google.actions.v2.OptionValueSpec","listSelect": {"items": []}}}}}};
                switch(objectType) {
                    case "thing" : {
                        sendRequest(options,null,function(reply,statusCode){
                            var response;
                            //console.log('in case of thing.list');
                            if(reply.length > 0) {
                                for(var i = 0;i<reply.length;i++) {
                                    responseText.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+objectType+": "+reply[i].id+reply[i].name},"title": ""+objectType+" "+reply[i].id+" "+reply[i].name});
                                }
                                if(responseText.payload.google.systemIntent.data.listSelect.items.length == 1) {
                                    let tmp = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": ""}},{"simpleResponse": {"textToSpeech": ""}}]}}}};
                                    tmp.payload.google.richResponse.items[1].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].title;
                                    tmp.payload.google.richResponse.items[0].simpleResponse.textToSpeech = "found only one "+objectType +" : ";
                                    responseText = tmp;
                                }
                            }
                            else {
                                responseText = fulfillment["basic_response"];
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
                                responseText = fulfillment["basic_response"];
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
                                responseText = fulfillment["basic_response"];
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
                                responseText = fulfillment["basic_response"];
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
                                    if(reply[i].name == name)
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
                                            responseText = fulfillment["basic_response"];
                                            responseText.fulfillmentText = "Failed to delete! Make sure you are authenticated or check if the "+objectType+" specified exsists or not";
                                        }
                                        else {
                                            responseText = fulfillment["basic_response"];
                                            responseText.fulfillmentText = "Done! "+objectType+" deleted!";
                                        }
                                        //console.log("in 1 == "+responseText.fulfillmentText);
                                        res.status(200).send(JSON.stringify(responseText));
                                    });
                                }
                                else {
                                    responseText = fulfillment.basic_response;
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
                                    if(reply[i].name == name)
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
                                            responseText = fulfillment["basic_response"];
                                            responseText.fulfillmentText = "Failed to delete! Make sure you are authenticated or check if the "+objectType+" specified exsists or not";
                                        }
                                        else {
                                            responseText = fulfillment["basic_response"];
                                            responseText.fulfillmentText = "Done! "+objectType+" deleted!";
                                        }
                                        //console.log("in 1 == "+responseText.fulfillmentText);
                                        res.status(200).send(JSON.stringify(responseText));
                                    });
                                }
                                else {
                                    responseText = fulfillment.basic_response;
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
                                    if(reply[i].unitName == name)
                                        tempIdList.push(reply[i].id);
                                }
                                console.log("Matching "+tempIdList);
                                if(tempIdList.length > 1) {
                                    responseText = fulfillment.basic_response;
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
                                            responseText = fulfillment["basic_response"];
                                            responseText.fulfillmentText = "Failed to delete! Make sure you are authenticated or check if the "+objectType+" specified exsists or not";
                                        }
                                        else {
                                            responseText = fulfillment["basic_response"];
                                            responseText.fulfillmentText = "Done! "+objectType+" deleted!";
                                        }
                                        res.status(200).send(JSON.stringify(responseText));
                                    });
                                }
                                else {
                                    responseText = fulfillment.basic_response;
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
                                    if(reply[i].name == name)
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
                                            responseText = fulfillment["basic_response"];
                                            responseText.fulfillmentText = "Failed to delete! Make sure you are authenticated or check if the "+objectType+" specified exsists or not";
                                        }
                                        else {
                                            responseText = fulfillment["basic_response"];
                                            responseText.fulfillmentText = "Done! "+objectType+" deleted!";
                                        }
                                        res.status(200).send(JSON.stringify(responseText));
                                    });
                                }
                                else {
                                    responseText = fulfillment.basic_response;
                                    responseText.fulfillmentText = "No "+objectType+" found with name: "+name;
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
            case "pubsub.get-shadow-by-name" : {
                console.log("inside " + intent);
                let name = findKey("device", queryResult.parameters);
                let attribute = findKey("attribute", queryResult.parameters);
                console.log("object name :" +  name +" attribute: "+attribute);
                sendRequest(options,null,function(reply,statusCode){
                    if(statusCode!= "200") {
                        responseText.fulfillmentText = "not authenticated !";
                    }
                    else {
                        let tempAttributeList = [];
                        for(let i=0; i<reply.length; i++) {
                            for(let j=0; j<reply[i].devices.length; j++) {
                                if(reply[i].devices[j].name == name) {
                                    for(let k=0; k<reply[i].devices[j].deviceAttributes.length; k++) {
                                        if(reply[i].devices[j].deviceAttributes[k].name == attribute) {
                                            tempAttributeList.push({"attributeID":reply[i].devices[j].deviceAttributes[k].id, "deviceID":reply[i].devices[j].id, "deviceName":reply[i].devices[j].name, "thingID":reply[i].id, "thingName":reply[i].name});
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        if(tempAttributeList.length > 1) {
                            responseText = fulfillment.basic_response;
                            let tmpPayload = {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": "Found more than one devices with that name... Choose one of these IDs..."}}]},"systemIntent": {"intent": "actions.intent.OPTION","data": {"@type": "type.googleapis.com/google.actions.v2.OptionValueSpec","listSelect": {"items": []}}}}};
                            for(let i=0; i<tempAttributeList.length; i++) {
                                tmpPayload.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+tempAttributeList[i].deviceID+""+tempAttributeList[i].deviceName+""+tempAttributeList[i].thingID+""+tempAttributeList[i].attributeID},"title": ""+tempAttributeList[i].deviceName+" (ID:"+tempAttributeList[i].deviceID+")", "description":"ParentThing: "+tempAttributeList[i].thingName});
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
                            let id = tempAttributeList[0].thingID;
                            console.log("pubsub id "+ id);
                            options.method = fulfillment["object.action-id-by-name"]["pubsubShadow"]["type"];
                            options.path = fulfillment["object.action-id-by-name"]["pubsubShadow"]["endpoint"];
                            options.path += ""+id;
                            console.log(options.path);
                            sendRequest(options,null,function(reply,statusCode){
                                if(statusCode != "200") {
                                    responseText = fulfillment["basic_response"];
                                    responseText.fulfillmentText = "Failed to get shadow ! Make sure you are authenticated or check if the device specified exsists or not";
                                }
                                else {
                                    responseText = fulfillment["basic_response"];
                                    if(reply.state.reported.hasOwnProperty("device"+tempAttributeList[0].deviceID+"."+tempAttributeList[0].attributeID))
                                        responseText.fulfillmentText = "The "+attribute+" is "+reply.state.reported["device"+tempAttributeList[0].deviceID+"."+tempAttributeList[0].attributeID];
                                    else
                                        responseText.fulfillmentText = "Oops! I can't find the "+attribute+"! Check if the device is on and connected.";
                                }
                                res.status(200).send(JSON.stringify(responseText));
                            });
                        }
                        else {
                            responseText = fulfillment.basic_response;
                            responseText.fulfillmentText = "Required device/attribute not found";
                            res.status(200).send(JSON.stringify(responseText));
                        }
                    }
                });
            }
            break;

            /*Done*/
            case "pubsub.set-value-by-name" : {
                console.log("inside " + intent);
                let name = findKey("device", queryResult.parameters);
                let attribute = findKey("attribute", queryResult.parameters);
                let value = findKey("value",queryResult.parameters);
                console.log("object name :" +  name +" attribute: "+attribute + " value : " + value);
                sendRequest(options,null,function(reply,statusCode){
                    if(statusCode!= "200") {
                        responseText.fulfillmentText = "not authenticated !";
                    }
                    else {
                        let tempAttributeList = [];
                        for(let i=0; i<reply.length; i++) {
                            for(let j=0; j<reply[i].devices.length; j++) {
                                if(reply[i].devices[j].name == name) {
                                    for(let k=0; k<reply[i].devices[j].deviceAttributes.length; k++) {
                                        if(reply[i].devices[j].deviceAttributes[k].name == attribute) {
                                            tempAttributeList.push({"attributeID":reply[i].devices[j].deviceAttributes[k].id, "deviceID":reply[i].devices[j].id, "deviceName":reply[i].devices[j].name, "thingID":reply[i].id, "thingName":reply[i].name});
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        if(tempAttributeList.length > 1) {
                            responseText = fulfillment.basic_response;
                            let tmpPayload = {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": "Found more than one devices with that name... Choose one of these IDs..."}}]},"systemIntent": {"intent": "actions.intent.OPTION","data": {"@type": "type.googleapis.com/google.actions.v2.OptionValueSpec","listSelect": {"items": []}}}}};
                            for(let i=0; i<tempAttributeList.length; i++) {
                                tmpPayload.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+tempAttributeList[i].deviceID+""+tempAttributeList[i].deviceName+""+tempAttributeList[i].thingID+""+tempAttributeList[i].attributeID},"title": ""+tempAttributeList[i].deviceName+" (ID:"+tempAttributeList[i].deviceID+")", "description":"ParentThing: "+tempAttributeList[i].thingName});
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
                            let id = tempAttributeList[0].attributeID;
                            console.log("pubsub id "+ id);
                            options.method = fulfillment["object.action-id-by-name"]["pubsubValue"]["type"];
                            options.path = fulfillment["object.action-id-by-name"]["pubsubValue"]["endpoint"];
                            options.path += ""+id;
                            console.log(options.path);
                            sendRequest(options,{"value" : value},function(reply,statusCode){
                                if(statusCode != "200") {
                                    responseText = fulfillment["basic_response"];
                                    responseText.fulfillmentText = "Failed to get shadow ! Make sure you are authenticated or check if the device specified exsists or not";
                                }
                                else {
                                    responseText = fulfillment["basic_response"];
                                    if(reply.state.desired.hasOwnProperty("device"+tempAttributeList[0].deviceID+"."+tempAttributeList[0].attributeID))
                                        responseText.fulfillmentText = "The "+attribute+" is "+reply.state.desired["device"+tempAttributeList[0].deviceID+"."+tempAttributeList[0].attributeID];
                                    else
                                        responseText.fulfillmentText = "Oops! I can't find the "+attribute+"! Check if the device is on and connected.";
                                }
                                res.status(200).send(JSON.stringify(responseText));
                            });
                        }
                        else {
                            responseText = fulfillment.basic_response;
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
                console.log(id +" " + futureAction + " " + objectName + " " + objectType);
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
                                        responseText = fulfillment["basic_response"];
                                        responseText.fulfillmentText = "Failed to delete! Make sure you are authenticated or check if the "+objectType+" specified exsists or not";
                                    }
                                    else {
                                        responseText = fulfillment["basic_response"];
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
                                        responseText = fulfillment["basic_response"];
                                        responseText.fulfillmentText = "Failed to delete! Make sure you are authenticated or check if the "+objectType+" specified exsists or not";
                                    }
                                    else {
                                        responseText = fulfillment["basic_response"];
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
                                        responseText = fulfillment["basic_response"];
                                        responseText.fulfillmentText = "Failed to delete! Make sure you are authenticated or check if the "+objectType+" specified exsists or not";
                                    }
                                    else {
                                        responseText = fulfillment["basic_response"];
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
                                        responseText = fulfillment["basic_response"];
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
                                            responseText = fulfillment["basic_response"];
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
                                        responseText = fulfillment["basic_response"];
                                        responseText.fulfillmentText = "Failed to delete! Make sure you are authenticated or check if the "+objectType+" specified exsists or not";
                                    }
                                    else {
                                        responseText = fulfillment["basic_response"];
                                        responseText.fulfillmentText = "Done! "+objectType+" deleted!";
                                    }
                                    res.status(200).send(JSON.stringify(responseText));
                                });
                            }
                            break;
                            case "pubsubShadow" : {
                                let attribute = findKey("attributeName",req.body);
                                options.method = fulfillment["pubsub.get-shadow-by-name"]["pubsubShadow"]["type"];
                                options.path = fulfillment["pubsub.get-shadow-by-name"]["pubsubShadow"]["endpoint"];
                                sendRequest(options,null,function(reply,statusCode){
                                    if(statusCode!= "200") {
                                        responseText.fulfillmentText = "not authenticated !";
                                    }
                                    else {
                                        let tempAttributeList = [];
                                        for(let i=0; i<reply.length; i++) {
                                            for(let j=0; j<reply[i].devices.length; j++) {
                                                if(reply[i].devices[j].id == id) {
                                                    for(let k=0; k<reply[i].devices[j].deviceAttributes.length; k++) {
                                                        if(reply[i].devices[j].deviceAttributes[k].name == attribute) {
                                                            tempAttributeList.push({"attributeID":reply[i].devices[j].deviceAttributes[k].id, "deviceID":reply[i].devices[j].id, "deviceName":reply[i].devices[j].name, "thingID":reply[i].id, "thingName":reply[i].name});
                                                            break;
                                                        }
                                                    }
                                                }
                                                if(tempAttributeList.length != 0)
                                                    break;
                                            }
                                            if(tempAttributeList.length != 0)
                                                break;
                                        }
                                    }
                                    id = tempAttributeList[0].thingID;
                                    console.log("pubsub id "+ id);
                                    options.method = fulfillment["object.action-id-by-name"]["pubsubShadow"]["type"];
                                    options.path = fulfillment["object.action-id-by-name"]["pubsubShadow"]["endpoint"];
                                    options.path += ""+id;
                                    console.log(options.path);
                                    sendRequest(options,null,function(reply,statusCode){
                                        if(statusCode != "200") {
                                            responseText = fulfillment["basic_response"];
                                            responseText.fulfillmentText = "Failed to get shadow ! Make sure you are authenticated or check if the device specified exsists or not";
                                        }
                                        else {
                                            responseText = fulfillment["basic_response"];
                                            if(reply.state.reported.hasOwnProperty("device"+tempAttributeList[0].deviceID+"."+tempAttributeList[0].attributeID))
                                                responseText.fulfillmentText = "The "+attribute+" is "+reply.state.reported["device"+tempAttributeList[0].deviceID+"."+tempAttributeList[0].attributeID];
                                            else
                                                responseText.fulfillmentText = "Oops! I can't find the "+attribute+"! Check if the device is on and connected.";
                                        }
                                        res.status(200).send(JSON.stringify(responseText));
                                    });
                                });
                            }
                            break;
                            case "pubsubValue" : {
                                let attribute = findKey("attributeName",req.body);
                                options.method = fulfillment["pubsub.get-shadow-by-name"]["pubsubValue"]["type"];
                                options.path = fulfillment["pubsub.get-shadow-by-name"]["pubsubValue"]["endpoint"];
                                sendRequest(options,null,function(reply,statusCode){
                                    if(statusCode!= "200") {
                                        responseText.fulfillmentText = "not authenticated !";
                                    }
                                    else {
                                        let tempAttributeList = [];
                                        for(let i=0; i<reply.length; i++) {
                                            for(let j=0; j<reply[i].devices.length; j++) {
                                                if(reply[i].devices[j].id == id) {
                                                    for(let k=0; k<reply[i].devices[j].deviceAttributes.length; k++) {
                                                        if(reply[i].devices[j].deviceAttributes[k].name == attribute) {
                                                            tempAttributeList.push({"attributeID":reply[i].devices[j].deviceAttributes[k].id, "deviceID":reply[i].devices[j].id, "deviceName":reply[i].devices[j].name, "thingID":reply[i].id, "thingName":reply[i].name});
                                                            break;
                                                        }
                                                    }
                                                }
                                                if(tempAttributeList.length != 0)
                                                    break;
                                            }
                                            if(tempAttributeList.length != 0)
                                                break;
                                        }
                                    }
                                    id = tempAttributeList[0].attributeID;
                                    let value = findKey("value",queryResult.outputContexts);
                                    console.log("pubsub id "+ id);
                                    options.method = fulfillment["object.action-id-by-name"]["pubsubValue"]["type"];
                                    options.path = fulfillment["object.action-id-by-name"]["pubsubValue"]["endpoint"];
                                    options.path += ""+id;
                                    console.log(options.path);
                                    sendRequest(options,{"value" : value},function(reply,statusCode){
                                        if(statusCode != "200") {
                                            responseText = fulfillment["basic_response"];
                                            responseText.fulfillmentText = "Failed to set atrribute ! Make sure you are authenticated or check if the device specified exsists or not";
                                        }
                                        else {
                                            responseText = fulfillment["basic_response"];
                                            if(reply.state.desired.hasOwnProperty("device"+tempAttributeList[0].deviceID+"."+tempAttributeList[0].attributeID))
                                                responseText.fulfillmentText = "The "+attribute+" is "+reply.state.desired["device"+tempAttributeList[0].deviceID+"."+tempAttributeList[0].attributeID];
                                            else
                                                responseText.fulfillmentText = "Oops! I can't find the "+attribute+"! Check if the device is on and connected.";
                                        }
                                        res.status(200).send(JSON.stringify(responseText));
                                    });
                                });
                            }
                            break;
                            case "update" : {

                            }
                            break;
                        }
                        break;
                    }
                }
            }
            break;

            /*Done*/
            case "object.get-name" : {
                responseText = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": "Here is the list:"}}]},"systemIntent": {"intent": "actions.intent.OPTION","data": {"@type": "type.googleapis.com/google.actions.v2.OptionValueSpec","listSelect": {"items": []}}}}}};
                switch(objectType) {
                    case "thing" : {
                        let name = queryResult.parameters.name;
                        sendRequest(options,null,function(reply,statusCode){
                            for(let i = 0;i<reply.length;i++) {
                                if(reply[i].name == name) {
                                    let storageEnabled = "and storage not enabled.";
                                    if(reply[i].storageEnabled == true)
                                    storageEnabled = "and storage enabled.";
                                    responseText.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+objectType+": "+reply[i].id+reply[i].name},"title": ""+reply[i].name+" (ID:"+reply[i].id+"): "+reply[i].description,"description": "Unit: "+reply[i].parentUnit.unitName+"(ID:"+reply[i].parentUnit.id+") The thing has "+reply[i].devices.length+" devices, "+reply[i].crons.length+" crons, "+reply[i].rules.length+"rules "+storageEnabled});
                                }
                            }
                            if(responseText.payload.google.systemIntent.data.listSelect.items.length == 1) {
                                let tmp = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": ""}},{"simpleResponse": {"textToSpeech": ""}}]}}}};
                                tmp.payload.google.richResponse.items[0].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].title;
                                tmp.payload.google.richResponse.items[1].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].description;
                                responseText = tmp;
                            }
                            else if(responseText.payload.google.systemIntent.data.listSelect.items.length == 0) {
                                responseText = fulfillment["basic_response"];
                                responseText.fulfillmentText = "No "+objectType+"s with name: "+name;
                            }
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "unit" : {
                        let name = queryResult.parameters.name;
                        sendRequest(options,null,function(reply,statusCode){
                            for(let i = 0;i<reply.length;i++) {
                                if(reply[i].unitName == name) {
                                    responseText.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+objectType+": "+reply[i].id+reply[i].unitName},"title": "(ID:"+reply[i].id+")"+reply[i].unitName,"description": ""+reply[i].description});
                                }
                            }
                            if(responseText.payload.google.systemIntent.data.listSelect.items.length == 1) {
                                let tmp = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": ""}},{"simpleResponse": {"textToSpeech": ""}}]}}}};
                                tmp.payload.google.richResponse.items[0].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].title;
                                tmp.payload.google.richResponse.items[1].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].description;
                                responseText = tmp;
                            }
                            else if(responseText.payload.google.systemIntent.data.listSelect.items.length == 0) {
                                responseText = fulfillment["basic_response"];
                                responseText.fulfillmentText = "No "+objectType+"s with name: "+name;
                            }
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "user" : {
                        let name = queryResult.parameters.name;
                        sendRequest(options,null,function(reply,statusCode){
                            for(let i = 0;i<reply.length;i++) {
                                if(reply[i].name == name) {
                                    responseText.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+objectType+": "+reply[i].id+reply[i].name},"title": "(ID:"+reply[i].id+")"+reply[i].name,"description": ""+reply[i].email});
                                }
                            }
                            if(responseText.payload.google.systemIntent.data.listSelect.items.length == 1) {
                                let tmp = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": ""}},{"simpleResponse": {"textToSpeech": ""}}]}}}};
                                tmp.payload.google.richResponse.items[0].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].title;
                                tmp.payload.google.richResponse.items[1].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].description;
                                responseText = tmp;
                            }
                            else if(responseText.payload.google.systemIntent.data.listSelect.items.length == 0) {
                                responseText = fulfillment["basic_response"];
                                responseText.fulfillmentText = "No "+objectType+"s with name: "+name;
                            }
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "device" :  {
                        let name = queryResult.parameters.name;
                        sendRequest(options,null,function(reply,statusCode){

                            for(let i = 0;i<reply.length;i++) {
                                if(reply[i].name == name) {
                                    let storageEnabled = "and storage not enabled.";
                                    if(reply[i].storageEnabled == true)
                                        storageEnabled = "and storage enabled.";
                                    responseText.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+objectType+": "+reply[i].id+reply[i].name},"title": ""+reply[i].name+" (ID:"+reply[i].id+"): ","description":reply[i].description});
                                }
                            }
                            if(responseText.payload.google.systemIntent.data.listSelect.items.length == 1) {
                                let tmp = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": ""}},{"simpleResponse": {"textToSpeech": ""}}]}}}};
                                tmp.payload.google.richResponse.items[0].simpleResponse.textToSpeech = responseText.payload.google.systemIntent.data.listSelect.items[0].title;
                                tmp.payload.google.richResponse.items[1].simpleResponse.textToSpeech = "Description: "+responseText.payload.google.systemIntent.data.listSelect.items[0].description=="" ? "device does not have description" :responseText.payload.google.systemIntent.data.listSelect.items[0].description;
                                console.log(JSON.stringify(tmp));
                                console.log(responseText.payload.google.systemIntent.data.listSelect.items[0].description=="" ? "device does not have description" :responseText.payload.google.systemIntent.data.listSelect.items[0].description);
                                console.log(tmp.payload.google.richResponse.items[1].simpleResponse.textToSpeech);
                                responseText = tmp;
                            }
                            else if(responseText.payload.google.systemIntent.data.listSelect.items.length == 0) {
                                responseText = fulfillment["basic_response"];
                                responseText.fulfillmentText = "No "+objectType+"s with name: "+name;
                            }
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                }
            }
            break;

            /*Done*/
            case "object.set-param" : {
                switch (objectType) {
                    case "thing": {
                        let param = findKey("param",queryResult.parameters);
                        let newValue = findKey("newValue",queryResult.parameters);
                        let id = findKey("id",queryResult.outputContexts);
                        let apiInput = fulfillment[intent][objectType]["apiInput"];
                        apiInput[param] = newValue;
                        options.path += ""+id;
                        sendRequest(options,apiInput,function(reply,statusCode) {
                            responseText = fulfillment["basic_response"];
                            if(statusCode == "405")
                                responseText.fulfillmentText = "not authenticated !";
                            else if(statusCode == "404")
                                responseText.fulfillmentText = "Looks like something is not right... May be the "+objectType+" you want to update does not exsists!";
                            else if(statusCode == "200")
                                responseText.fulfillmentText = "Updated the "+param+" to "+newValue;
                            else
                                responseText.fulfillmentText = "Sorry! I failed to do that... Please try again";
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "unit": {
                        let param = findKey("param",queryResult.parameters);
                        if(param == "name")
                            param = "unitName";
                        let newValue = findKey("newValue",queryResult.parameters);
                        let id = findKey("id",queryResult.outputContexts);
                        let apiInput = fulfillment[intent][objectType]["apiInput"];
                        apiInput[param] = newValue;
                        options.path += ""+id;
                        sendRequest(options,apiInput,function(reply,statusCode) {
                            responseText = fulfillment["basic_response"];
                            if(statusCode == "405")
                                responseText.fulfillmentText = "not authenticated !";
                            else if(statusCode == "404")
                                responseText.fulfillmentText = "Looks like something is not right... May be the "+objectType+" you want to update does not exsists!";
                            else if(statusCode == "200")
                                responseText.fulfillmentText = "Updated the "+param+" to "+newValue;
                            else
                                responseText.fulfillmentText = "Sorry! I failed to do that... Please try again";
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "device": {
                        let param = findKey("param",queryResult.parameters);
                        let newValue = findKey("newValue",queryResult.parameters);
                        let id = findKey("id",queryResult.outputContexts);
                        let apiInput = fulfillment[intent][objectType]["apiInput"];
                        apiInput[param] = newValue;
                        options.path += ""+id;
                        sendRequest(options,apiInput,function(reply,statusCode) {
                            responseText = fulfillment["basic_response"];
                            if(statusCode == "405")
                                responseText.fulfillmentText = "not authenticated !";
                            else if(statusCode == "404")
                                responseText.fulfillmentText = "Looks like something is not right... May be the "+objectType+" you want to update does not exsists!";
                            else if(statusCode == "200")
                                responseText.fulfillmentText = "Updated the "+param+" to "+newValue;
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
            case "object.rem-param" : {
                switch (objectType) {
                    case "thing": {
                        let param = findKey("param",queryResult.parameters);
                        let id = findKey("id",queryResult.outputContexts);
                        let apiInput = fulfillment[intent][objectType]["apiInput"];
                        apiInput[param] = "";
                        options.path += ""+id;
                        sendRequest(options,apiInput,function(reply,statusCode) {
                            responseText = fulfillment["basic_response"];
                            if(statusCode == "405")
                                responseText.fulfillmentText = "not authenticated !";
                            else if(statusCode == "404")
                                responseText.fulfillmentText = "Looks like something is not right... May be the "+objectType+" does not exsists or "+param+" can't be removed!";
                            else if(statusCode == "200")
                                responseText.fulfillmentText = "Removed the "+param;
                            else
                                responseText.fulfillmentText = "Sorry! I failed to do that... Please try again";
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
                            responseText = fulfillment["basic_response"];
                            if(statusCode == "405")
                                responseText.fulfillmentText = "not authenticated !";
                            else if(statusCode == "404")
                                responseText.fulfillmentText = "Looks like something is not right... May be the "+objectType+" does not exsists or "+param+" can't be removed!";
                            else if(statusCode == "200")
                                responseText.fulfillmentText = "Removed the "+param;
                            else
                                responseText.fulfillmentText = "Sorry! I failed to do that... Please try again";
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
                            responseText = fulfillment["basic_response"];
                            if(statusCode == "405")
                                responseText.fulfillmentText = "not authenticated !";
                            else if(statusCode == "404")
                                responseText.fulfillmentText = "Looks like something is not right... May be the "+objectType+" does not exsists or "+param+" can't be removed!";
                            else if(statusCode == "200")
                                responseText.fulfillmentText = "Removed the "+param;
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
            case "object.get-param" : {
                switch (objectType) {
                    case "thing": {
                        let param = findKey("param",queryResult.parameters);
                        let id = findKey("id",queryResult.outputContexts);
                        options.path += ""+id;
                        sendRequest(options,null,function(reply,statusCode) {
                            responseText = fulfillment["basic_response"];
                            if(statusCode == "405")
                                responseText.fulfillmentText = "not authenticated !";
                            else if(statusCode == "404")
                                responseText.fulfillmentText = "Looks like something is not right... May be the "+objectType+" does not exsist!";
                            else if(statusCode == "200")
                                responseText.fulfillmentText = ""+param+" of the "+objectType+" is: "+reply[param];
                                if(reply[param] == "")
                                    responseText.fulfillmentText = ""+param+" of the "+objectType+" is not set";
                            else
                                responseText.fulfillmentText = "Sorry! I failed to do that... Please try again";
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "unit": {
                        let param = findKey("param",queryResult.parameters);
                        let id = findKey("id",queryResult.outputContexts);
                        options.path += ""+id;
                        sendRequest(options,null,function(reply,statusCode) {
                            responseText = fulfillment["basic_response"];
                            if(statusCode == "405")
                                responseText.fulfillmentText = "not authenticated !";
                            else if(statusCode == "404")
                                responseText.fulfillmentText = "Looks like something is not right... May be the "+objectType+" does not exsist!";
                            else if(statusCode == "200")
                                responseText.fulfillmentText = ""+param+" of the "+objectType+" is: "+reply[param];
                                if(reply[param] == "")
                                    responseText.fulfillmentText = ""+param+" of the "+objectType+" is not set";
                            else
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
                            responseText = fulfillment["basic_response"];
                            if(statusCode == "405")
                                responseText.fulfillmentText = "not authenticated !";
                            else if(statusCode == "404")
                                responseText.fulfillmentText = "Looks like something is not right... May be the "+objectType+" does not exsist!";
                            else if(statusCode == "200")
                                responseText.fulfillmentText = ""+param+" of the "+objectType+" is: "+reply[param];
                                if(reply[param] == "")
                                    responseText.fulfillmentText = ""+param+" of the "+objectType+" is not set";
                            else
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
                            responseText = fulfillment["basic_response"];
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

            /*Pending*/
            case "unit.subunits" : {
                let name = queryResult.parameters.name;
                let conversationId = findKey("conversationId", req.body);
                responseText = fulfillment["basic_response"];
                sendRequest(options,null,function(reply,statusCode){
                    if(statusCode!= "200") {
                        responseText.fulfillmentText = "not authenticated !";
                    }
                    else {
                        let tempIdList = [];
                        for(let i=0;i<reply.length;i++) {
                            if(reply[i].unitName == name)
                                tempIdList.push(reply[i].id);
                        }
                        if(tempIdList.length > 1) {
                            responseText = fulfillment.basic_response;
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
                                  "futureAction" : "subunits",
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
                                    responseText = fulfillment["basic_response"];
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
                                        responseText = fulfillment["basic_response"];
                                        responseText.fulfillmentText = "No subunits found!";
                                    }
                                }
                                res.status(200).send(JSON.stringify(responseText));
                            });
                        }
                        else {
                            responseText = fulfillment.basic_response;
                            responseText.fulfillmentText = "No "+objectType+" found with name: "+name;
                            res.status(200).send(JSON.stringify(responseText));
                        }
                    }
                });
            }
            break;
        }
    } else {
        responseText.fulfillmentText = "";
        res.status(200).send(JSON.stringify(responseText));
    }
};
