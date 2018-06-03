var fulfillment = {
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
        "hostname" : "7a8e7e66.ngrok.io",
        "port" : null
    },
    "object.create": {
        "thing" : {
            "endpoint" : "/thing/create",
            "type" : "POST",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : false,
            "api_input" : {
                "name" : "",
                "description" : "",
                "ip" : "",
                "parentUnitId" : ""
            },
            "validator" : function(reply) {
                var response = "";
                console.log('in validator of thing.create');
                if(reply.hasOwnProperty('success')) {
                    if(reply.success == false) {
                        response = 'Thing cannot be created with that parentId !';
                    }
                }
                return response;
            }
        },
        "unit" : {

        },
        "cron" : {

        }
    },
    "object.delete - yes" : {
        "thing" : {
            "endpoint" : "/thing/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "api_input" : {
                "id" : ""
            },
            "validator" : function(reply) {
                var response;
                var objectlist = [];
                console.log('in validator of thing.delete' + JSON.stringify(reply));
                if(reply.length > 0) {
                    for(var i = 0;i<reply.length;i++) {
                        if(reply[i].name.search(queryResult.parameters.name)!=-1) {
                            objectlist.push(JSON.stringify({"id ": reply[i].id+" name : "+reply[i].name}));
                        }
                    }
                    response = "here are the things with name";
                }
                else {
                    response = "No things with name " + queryResult.parameters.name +" are present !";
                }
                return response+objectlist;
            }
        },
        "unit" : {
            "endpoint" : "/unit/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "api_input" : {
                "id" : ""
            },
            "validator" : function(reply) {
                var response;
                var objectlist = [];
                console.log('in validator of unit.get' + JSON.stringify(reply));
                if(reply.length > 0) {
                    for(var i = 0;i<reply.length;i++) {
                        objectlist.push(JSON.stringify({"id ": reply[i].id+" name : "+reply[i].name}));
                    }
                    response = "here are all the units";
                }
                else {
                    response = "No units are present !";
                }
                return response+objectlist;
            }
        },
        "user" : {
            "endpoint" : "/user/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "api_input" : {
                "id" : ""
            },
            "validator" : function(reply) {
                var response;
                var objectlist = [];
                console.log('in validator of user.get' + JSON.stringify(reply));
                if(reply.length > 0) {
                    for(var i = 0;i<reply.length;i++) {
                        objectlist.push(JSON.stringify({"id ": reply[i].id+" name : "+reply[i].name+ " email : "+reply[i].email}));
                    }
                    response = "here are all the user";
                }
                else {
                    response = "No users are present !";
                }
                return response+objectlist;
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
            "api_input" : {
                "id" : ""
            }
        },
        "unit" : {
            "endpoint" : "/unit/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "api_input" : {
                "id" : ""
            }
        },
        "user" : {
            "endpoint" : "/user/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "api_input" : {
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
            "api_input" : {
                "id" : ""
            }
        },
        "unit" : {
            "endpoint" : "/unit/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "api_input" : {
                "id" : ""
            }
        },
        "user" : {
            "endpoint" : "/user/list/page/0",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "api_input" : {
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
            "api_input" : {
                "id" : ""
            }
        },
        "unit" : {
            "endpoint" : "/unit/get/",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "api_input" : {
                "id" : ""
            }
        },
        "user" : {
            "endpoint" : "/user/get/",
            "type" : "GET",
            "content_type" : "application/x-www-form-urlencoded",
            "response_type" : "application/json",
            "url_parameter" : true,
            "api_input" : {
                "id" : ""
            }
        }
    },
    "object.get-name": function() {return fulfillment["object.list"];}
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

function sendRequest(options, callback) {
    var request = http.request(options, function (response) {
        var chunks = "";

        response.on("data", function (chunk) {
            chunks+=chunk;
        });

        response.on("end", function () {
            reply = JSON.parse(chunks);
            callback(reply);
        });
    });
    request.end();
}


exports.eYantraWebhook = (req, res) => {
    if(req.hasOwnProperty("body") && req.body.hasOwnProperty("queryResult") && req.body.queryResult.hasOwnProperty("intent") && req.body.queryResult.intent.hasOwnProperty("displayName")) {
        queryResult = req.body.queryResult;
        console.log("====> intent : "+ queryResult.intent.displayName);
        intent = queryResult.intent.displayName;
        objectType = findKey("object", queryResult);
        console.log("===============>"+objectType);
        options = {
            "method": fulfillment[intent][objectType]["type"],
            "hostname": fulfillment["server"]["hostname"],
            "port": fulfillment["server"]["port"],
            "path": fulfillment[intent][objectType]["endpoint"],
            "headers": {
                "content-type": fulfillment[intent][objectType]["content_type"],
                "cache-control": "no-cache"
            }
        };

        switch(intent) {
            case "object.list-it":
            case "object.list" : {
                responseText = {"payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": "Here is the list:"}}]},"systemIntent": {"intent": "actions.intent.OPTION","data": {"@type": "type.googleapis.com/google.actions.v2.OptionValueSpec","listSelect": {"items": []}}}}}};
                switch(objectType) {
                    case "thing" : {
                        sendRequest(options,function(reply){
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
                        sendRequest(options,function(reply){
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
                        sendRequest(options,function(reply){
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
                        sendRequest(options,function(reply){
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
                        sendRequest(options,function(reply){
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
                        sendRequest(options,function(reply){
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
                        sendRequest(options,function(reply){
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
        }
    } else {
        responseText.fulfillmentText = "error in json";
        res.status(200).send(JSON.stringify(responseText));
    }
};
