exports.handler = (event, context, callback) => {
    var AWS = require('aws-sdk');
    AWS.config.region = "ap-southeast-1";
    var iotdata = new AWS.IotData({endpoint: 'YOUR-IOT-ENDPOINT-HERE'});
    var params = { payload:JSON.stringify({"state": {"desired": JSON.parse(event.desired) } }), thingName:event.thingName };
    try {
        iotdata.updateThingShadow(params, function(err, data) {
            if (err) {
                callback(err, err.stack); // an error occurred
            } else {
                callback(null, data);         // successful response
            }
        });
    } catch(t) {
        console.log(JSON.stringify(t));
        callback(null,t);
    }
};
