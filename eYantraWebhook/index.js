//Auther: Rohit Rathi
console.log("==============Auther: Rohit Rathi==============");
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
        "hostname" : "b3810d1c.ngrok.io",
        "port" : null
    },
    "object.create": {
        "thing" : {
            "endpoint" : "/thing/create",
            "type" : "POST",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : false,
            "apiInput" : {
                "name" : "",
                "description" : "",
                "ip" : "",
                "parentUnitId" : 1
            }
        },
        "unit" : {
            "endpoint" : "/unit/create",
            "type" : "POST",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : false,
            "apiInput" : {
                "unitName" : "",
                "description" : "",
                "photo" : "",
                "parentUnitId" : 1
            }
        },
        "cron" : {
            "endpoint" : "/unit/create",
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
        }
    },
    "object.get-id": {
        "thing" : {
            "endpoint" : "/thing/get/",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "unit" : {
            "endpoint" : "/unit/get/",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
                "id" : ""
            }
        },
        "user" : {
            "endpoint" : "/user/get/",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "apiInput" : {
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
        }
    },
    "object.delete-name-id": {
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
        }
    },
};

const http = require('http');
const qs = require('querystring');

var queryResult;
var responseText = fulfillment["basic_response"];
var intent;
var objectType;
var options;
var reply;

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
            console.log(chunks);
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
        console.log("====> intent : "+ queryResult.intent.displayName);
        intent = queryResult.intent.displayName;
        objectType = findKey("object", queryResult);
        token = findKey("accessToken", req.body);
        console.log(token);
        if(token == null) {
            responseText.fulfillmentText = "not authenticated!";
            res.status(200).send(JSON.stringify(responseText));
        }
        options = {
            "method": fulfillment[intent][objectType]["type"],
            "hostname": fulfillment["server"]["hostname"],
            "port": fulfillment["server"]["port"],
            "path": fulfillment[intent][objectType]["endpoint"],
            "headers": {
                "content-type": fulfillment[intent][objectType]["content_type"],
                "cache-control": "no-cache",
                "Cookie": "authorization=; authorization="+token
            }
        };

        switch(intent) {
            case "object.create" : {
                switch(objectType) {
                    case "thing" : {
                        let apiInput = fulfillment[intent][objectType]["apiInput"];
                        apiInput.name = queryResult.parameters.name;
                        sendRequest(options,apiInput,function(reply,statusCode){
                            if(statusCode!= "200") {
                                responseText.fulfillmentText = "not authenticated !";
                            }
                            else {
                                responseText.fulfillmentText = ""+ objectType + " created !"//with id :"+reply.id + " name : "+reply.name;
                                responseText.followupEventInput = {
                                    "name": "object_list",
                                    "languageCode": "en-US",
                                    "parameters": {
                                      "myObject": "thing"
                                    }
                                };
                            }
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "unit" : {
                        let apiInput = fulfillment[intent][objectType]["apiInput"];
                        apiInput.unitName = queryResult.parameters.name;
                        sendRequest(options,apiInput,function(reply,statusCode){
                            if(statusCode!= "200") {
                                responseText.fulfillmentText = "not authenticated !";
                            }
                            else {
                                responseText.fulfillmentText = ""+ objectType + " created with id :"+reply.id + " name : "+reply.unitName;
                            }
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "cron" : {
                        let apiInput = fulfillment[intent][objectType]["apiInput"];
                        apiInput.name = queryResult.parameters.name;
                        sendRequest(options,apiInput,function(reply,statusCode){
                            if(statusCode!= "200") {
                                responseText.fulfillmentText = "not authenticated !";
                            }
                            else {
                                responseText.fulfillmentText = ""+ objectType + " created with id :"+reply.id + " name : "+reply.name;
                            }
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                }
            }
            break;
            case "object.list-it":
            case "object.list" : {
                responseText = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": "Here is the list:"}}]},"systemIntent": {"intent": "actions.intent.OPTION","data": {"@type": "type.googleapis.com/google.actions.v2.OptionValueSpec","listSelect": {"items": []}}}}}};
                switch(objectType) {
                    case "thing" : {
                        sendRequest(options,null,function(reply,statusCode){
                            var response;
                            console.log('in case of thing.list' + JSON.stringify(reply));
                            if(reply.length > 0) {
                                for(var i = 0;i<reply.length;i++) {
                                    responseText.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+objectType+": "+reply[i].id+reply[i].name},"title": ""+objectType+" "+reply[i].id+" "+reply[i].name});
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
                            console.log('in case of unit.list' + JSON.stringify(reply));
                            if(reply.length > 0) {
                                for(var i = 0;i<reply.length;i++) {
                                    responseText.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+objectType+": "+reply[i].id+reply[i].unitName},"title": ""+objectType+" "+reply[i].id+" "+reply[i].unitName});
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
                            console.log('in case of user.list' + JSON.stringify(reply));
                            if(reply.length > 0) {
                                for(var i = 0;i<reply.length;i++) {
                                    responseText.payload.google.systemIntent.data.listSelect.items.push({"optionInfo": {"key": ""+objectType+": "+reply[i].id+reply[i].name},"description": ""+reply[i].email,"title": ""+objectType+" "+reply[i].id+" "+reply[i].name});
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
            case "object.get-id" : {
                options["path"] = fulfillment[intent][objectType]["endpoint"] + queryResult.parameters.id;
                switch (objectType) {
                    case "thing" : {
                        sendRequest(options,null,function(reply,statusCode){
                            var response;
                            console.log('in case of thing.get-id' + JSON.stringify(reply));
                            if(reply.hasOwnProperty('id')) {
                                response = "id : "+reply.id+" name : "+reply.name + " description : " + reply.description + " parent Id : "+ reply.parentUnit.id+ " parent Name : " + reply.parentUnit.name;
                            }
                            else {
                                response = "No thing present with that id !";
                            }
                            responseText.fulfillmentText = response;
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "unit" : {
                        sendRequest(options,null,function(reply,statusCode){
                            var response;
                            console.log('in case of unit.get-id' + JSON.stringify(reply));
                            if(reply.hasOwnProperty('id')) {
                                response = "id : " +reply.id+" name : "+reply.name  + " description : " + reply.description;
                            }
                            else {
                                response = "No thing present with that id !";
                            }
                            responseText.fulfillmentText = response;
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "cron" : {
                        sendRequest(options,null,function(reply,statusCode){
                            var response;
                            console.log('in case of cron.get-id' + JSON.stringify(reply));
                            if(reply.hasOwnProperty('id')) {
                                response = "id : "+ reply.id+" name : "+reply.name;
                            }
                            else {
                                response = "No thing present with that id !";
                            }
                            responseText.fulfillmentText = response;
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                    case "user" : {
                        sendRequest(options,null,function(reply,statusCode){
                            var response;
                            console.log('in case of user.get-id' + JSON.stringify(reply));
                            if(reply.hasOwnProperty('id')) {
                                response = "id :" +reply.id+" name : "+reply.name + " email : "+reply.email ;
                            }
                            else {
                                response = "No thing present with that id !";
                            }
                            responseText.fulfillmentText = response;
                            res.status(200).send(JSON.stringify(responseText));
                        });
                    }
                    break;
                }
            }
            break;
            case "object.delete - yes" : {
                let name = findKey("name.original", req.body);
                let conversationId = findKey("conversationId", req.body);
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
                                        "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/object-delete-name-id",
                                        "lifespanCount": 5,
                                        "parameters": {
                                          "object": "thing"
                                        }
                                    }];
                                    console.log("in greater than 1 == "+responseText.fulfillmentText);
                                    res.status(200).send(JSON.stringify(responseText));
                                }
                                else if(tempIdList.length == 1){
                                    options = {
                                        "method": fulfillment["object.delete-name-id"][objectType]["type"],
                                        "hostname": fulfillment["server"]["hostname"],
                                        "port": fulfillment["server"]["port"],
                                        "path": fulfillment["object.delete-name-id"][objectType]["endpoint"],
                                        "headers": {
                                            "content-type": fulfillment["object.delete-name-id"][objectType]["content_type"],
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
                                        console.log("in 1 == "+responseText.fulfillmentText);
                                        res.status(200).send(JSON.stringify(responseText));
                                    });
                                }
                                else {
                                    responseText = fulfillment.basic_response;
                                    responseText.fulfillmentText = "No "+objectType+" found with name: "+name;
                                    console.log("in other == "+responseText.fulfillmentText);
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
                                for(let i=0;i<reply.length;i++) {
                                    if(reply[i].unitName == name)
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
                                        "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/object-delete-name-id",
                                        "lifespanCount": 5,
                                        "parameters": {
                                          "object": "unit"
                                        }
                                    }];
                                    res.status(200).send(JSON.stringify(responseText));
                                }
                                else if(tempIdList.length == 1){
                                    options = {
                                        "method": fulfillment["object.delete-name-id"][objectType]["type"],
                                        "hostname": fulfillment["server"]["hostname"],
                                        "port": fulfillment["server"]["port"],
                                        "path": fulfillment["object.delete-name-id"][objectType]["endpoint"],
                                        "headers": {
                                            "content-type": fulfillment["object.delete-name-id"][objectType]["content_type"],
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
                                        "name": "projects/"+fulfillment.project.projectID+"/agent/sessions/"+conversationId+"/contexts/object-delete-name-id",
                                        "lifespanCount": 5,
                                        "parameters": {
                                          "object": "user"
                                        }
                                    }];
                                    res.status(200).send(JSON.stringify(responseText));
                                }
                                else if(tempIdList.length == 1){
                                    options = {
                                        "method": fulfillment["object.delete-name-id"][objectType]["type"],
                                        "hostname": fulfillment["server"]["hostname"],
                                        "port": fulfillment["server"]["port"],
                                        "path": fulfillment["object.delete-name-id"][objectType]["endpoint"],
                                        "headers": {
                                            "content-type": fulfillment["object.delete-name-id"][objectType]["content_type"],
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
            case "object.delete-name-id" : {
                let id = findKey("id", req.body);
                switch(objectType) {
                    case "thing" : {
                        options.path += ""+id;
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
                    case "unit" : {
                        options.path += ""+id;
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
                    case "unit" : {
                        options.path += ""+id;
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
            case "object.get-name" : {
                responseText = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": "Here is the list:"}}]},"systemIntent": {"intent": "actions.intent.OPTION","data": {"@type": "type.googleapis.com/google.actions.v2.OptionValueSpec","listSelect": {"items": []}}}}}};
                switch(objectType) {
                    case "thing" : {
                    }
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
                }
            }
            break;
        }
    } else {
        responseText.fulfillmentText = "error in json";
        res.status(200).send(JSON.stringify(responseText));
    }
};

