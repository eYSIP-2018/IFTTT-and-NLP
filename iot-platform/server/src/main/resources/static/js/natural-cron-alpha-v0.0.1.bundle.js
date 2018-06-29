(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.getCronString = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
'use strict';
//regexString json
var regexString = {
    every : {
        "regextest" : "^(every|each|all|entire)$"
    },
    clockTime : {
        //https://regexr.com/3qqbn
        "regextest" : "^([0-9]+:)?[0-9]+ *(AM|PM)$|^([0-9]+:[0-9]+)$|(noon|midnight)",
        //https://regexr.com/3qqbt
        "regexexec" : [
            "^[0-9]+",
            ":[0-9]+",
            "pm",
            "am",
            "(noon|midnight)"
        ]
    },
    frequencyWith : {
        "regextest" : "^[0-9]+(th|nd|rd|st)$"
    },
    frequencyOnly : {
        "regextest" : "^[0-9]+$",
        "regexexec" : "^[0-9]+"
    },
    minute : {
        "regextest" : "(minutes|minute|mins|min)",
        "regexexec" : [
            "^(minutes|minute|mins|min)$"
        ]
    },
    hour : {
        "regextest" : "(hour|hrs|hours)",
        "regexexec" : [
            "^(hour|hrs|hours)$"
        ]
    },
    day : {
        //https://regexr.com/3qqc3
        "regextest" : "^((days|day)|(((monday|tuesday|wednesday|thursday|friday|saturday|sunday|WEEKEND|MON|TUE|WED|THU|FRI|SAT|SUN)( ?and)?,? ?)+))$",
        "regexexec" : [
            "^(day|days)$",
            "(MON|TUE|WED|THU|FRI|SAT|SUN|WEEKEND)"
        ]
    },
    month : {
        //https://regexr.com/3r1na
        "regextest" : "^((months|month)|(((january|february|march|april|may|june|july|august|september|october|november|december|JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEPT|OCT|NOV|DEC)( ?and)?,? ?)+))$",
        "regexexec" : [
            "^(month|months)$",
            "(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEPT|OCT|NOV|DEC)"
        ]
    },
    year : {
        "regextest" : "((years|year)|([0-9]{4}[0-9]*(( ?and)?,? ?))+)",
        "regexexec" : [
            "^(years|year)$",
            "[0-9]*",
            "^[0-9]{4}$"
        ]
    },
    rangeStart : {
        "regextest" : "(between|starting|start)" ,
    },
    rangeEnd : {
        "regextest" : "(to|through|ending|end|and)" ,
    },
    tokenising : {
        "regexexec" : "(hour|hrs|hours)|(minutes|minute|mins|min)|((months|month)|(((january|february|march|april|may|june|july|august|september|october|november|december|JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEPT|OCT|NOV|DEC)( ?and)?,? ?)+))|[0-9]+(th|nd|rd|st)|(([0-9]+:)?[0-9]+( +)?(AM|PM))|([0-9]+:[0-9]+)|(noon|midnight)|((days|day)|(((monday|tuesday|wednesday|thursday|friday|saturday|sunday|WEEKEND|MON|TUE|WED|THU|FRI|SAT|SUN)( ?and)?,? ?)+))|(([0-9]{4}[0-9]*(( ?and)?,? ?))+)|([0-9]+)|(to|through|ending|end|and)|(between|starting|start)"
    }
};

var flags = {
    "isRangeForDay" : false,
    "isRangeForMonth" : false,
    "isRangeForYear" : false,
    "isRangeForHour" : false,
    "isRangeForMin" : false
};

var resultCron = {
    "min" : "*",
    "hour" : "*",
    "day_of_month" : "*",
    "month" : "*",
    "day_of_week" : "?",
    "year" : "*"
};

var defaultMaps = {
    flags : {
        "isRangeForDay" : false,
        "isRangeForMonth" : false,
        "isRangeForYear" : false,
        "isRangeForHour" : false,
        "isRangeForMin" : false
    },
    resultCron : {
        "min" : "*",
        "hour" : "*",
        "day_of_month" : "*",
        "month" : "*",
        "day_of_week" : "?",
        "year" : "*"
    }
};

module.exports = {
    regexString,
    defaultMaps,
    flags,
    resultCron
};

},{}],3:[function(require,module,exports){
'use strict';

const regexString = require('./maps').regexString;
var defaultMaps = require('./maps').defaultMaps;
var flags = require('./maps').flags;
var resultCron = require('./maps').resultCron;

var readline = require('readline');
const tokenizeInput  = require('./tokens').tokenizeInput;
const getClockTime  = require('./states/clocktime').getClockTime;
const getDay  = require('./states/day').getDay;
const getFrequencyOnly  = require('./states/frequency').getFrequencyOnly;
const getFrequencyWith  = require('./states/frequency').getFrequencyWith;
const getHour  = require('./states/hour').getHour;
const getMonth  = require('./states/month').getMonth;
const getMinute  = require('./states/minute').getMinute;
const rangeStartState  = require('./states/range').rangeStartState;
const rangeEndState  = require('./states/range').rangeEndState;
const getYear  = require('./states/year').getYear;

/*callState function to match and call curresponding state function*/
function callState(token,stack,error) {
    let stateName = decideState(token);
    console.log("in "+stateName);
    
    switch(stateName) {
        case "frequencyWith" : {
            return getFrequencyWith(token,stack,error);
        }
        break;
        case "frequencyOnly" : {
            return getFrequencyOnly(token,stack,error);
        }
        break;
        case "clockTime" : {
            return getClockTime(token,stack,error);
        }
        break;
        case "day" : {
            return getDay(token,stack,error);
        }
        break;
        case "minute" : {
            return getMinute(token,stack,error);
        }
        break;
        case "hour" : {
            return getHour(token,stack,error);
        }
        break;
        case "month" : {
            return getMonth(token,stack,error);
        }
        break;
        case "year" : {
            return getYear(token,stack,error);
        }
        break;
        case "rangeStart" : {
            return rangeStartState(token,stack,error);
        }
        break;
        case "rangeEnd" : {
            return rangeEndState(token,stack,error);
        }
        break;
    }
    return true;
}

/*decideState function to decide next state*/
function decideState(token) {
    let isFound = "decideState";
    for(let key in regexString) {
        // TO DO: check for group
        let regBuilder = new RegExp(regexString[key].regextest,'ig');
        if(regBuilder.test(token)) {
            isFound = key;
            break;
        }
    }
    return isFound;
}

/*resetMaps function to set default values to flags and resultCron*/
function resetMaps() {
    flags.isRangeForDay = defaultMaps.flags.isRangeForDay;
    flags.isRangeForMonth = defaultMaps.flags.isRangeForMonth;
    flags.isRangeForYear = defaultMaps.flags.isRangeForYear;
    flags.isRangeForHour = defaultMaps.flags.isRangeForHour;
    flags.isRangeForMin = defaultMaps.flags.isRangeForMin;

    resultCron.min = defaultMaps.resultCron.min;
    resultCron.hour = defaultMaps.resultCron.hour;
    resultCron.day_of_month = defaultMaps.resultCron.day_of_month;
    resultCron.month = defaultMaps.resultCron.month;
    resultCron.day_of_week = defaultMaps.resultCron.day_of_week;
    resultCron.year = defaultMaps.resultCron.year;
}

/*getCronString fucntion to convert human readable input string to cron string*/
function getCronString(inputString, syntaxString) {
    //Set default syntax string
    syntaxString = typeof(syntaxString) !== 'undefined' ? syntaxString : "MIN HOR DOM MON WEK YER";

    //Setting the default values
    resetMaps();

    //Stack to store temperory states' data
    let stack = [];

    let error = "";
    let notEndState = true;
    let tokens = tokenizeInput(inputString);
    console.log(tokens);

    if(tokens.length <= 0) {
        error+="Oops! May be natural-cron.js can't recognize this :(\nPlease consider sharing the phrase with us @ darkeyedev@gmail.com or on GitHub page of natural-cron.js";
        notEndState = false;
    }

    for(let i=0; notEndState && i<tokens.length;i++) {
        notEndState = callState(tokens[i],stack,error);
    }
    if(notEndState == false) {
        return "ERROR:"+error + "\n" + syntaxString.replace("MIN",resultCron.min).replace("HOR",resultCron.hour).replace("DOM",resultCron.day_of_month).replace("MON",resultCron.month).replace("WEK",resultCron.day_of_week).replace("YER",resultCron.year);
    }
    else {
        return syntaxString.replace("MIN",resultCron.min).replace("HOR",resultCron.hour).replace("DOM",resultCron.day_of_month).replace("MON",resultCron.month).replace("WEK",resultCron.day_of_week).replace("YER",resultCron.year);
    }
}

module.exports = getCronString;

},{"./maps":2,"./states/clocktime":4,"./states/day":5,"./states/frequency":6,"./states/hour":7,"./states/minute":8,"./states/month":9,"./states/range":10,"./states/year":11,"./tokens":12,"readline":1}],4:[function(require,module,exports){
'use strict';

const regexString = require('../maps').regexString;
var flags = require('../maps').flags;
var resultCron = require('../maps').resultCron;

/*clockTime function to parse and store frequency value without nth*/
function getClockTime(token,stack,error) {
    //retrive hours from clocktime
    let regBuilder = new RegExp(regexString.clockTime.regexexec[0]);
    let str = token.match(regBuilder);

    let hour,min;
    if(str != null && str.length > 0) {
        hour = parseInt(str[0]);
    } else {
        hour = 0;
    }

    //retrive minutes from clockTime
    regBuilder = new RegExp(regexString.clockTime.regexexec[1]);
    str = regBuilder.exec(token);
    if(str != null && str.length > 0) {
        if(str[0].indexOf(':')!=-1) {
            min = parseInt(str[0].slice(str[0].indexOf(':')+1));
            if(min >= 60) {
                error +=" please enter correct minutes !";
                console.log(error);
                return false;
            }
        } else {
            min = 0;
        }
    } else {
        min = 0;
    }

    //check for increment of hour by 12 for PM
    let regBuilderPM = new RegExp(regexString.clockTime.regexexec[2],'ig');
    let regBuilderAM = new RegExp(regexString.clockTime.regexexec[3],'ig');
    if(regBuilderPM.test(token)) {
        if(hour < 12) {
            hour+=12;
        } else if(hour > 12 ){
            error +=" please correct the time before PM !";
            console.log(error);
            return false;
        }
    } else if(regBuilderAM.test(token)){
        if(hour == 12) {
            hour = 0;
        } else if(hour > 12 ){
            error +=" please correct the time before AM !";
            console.log(error);
            return false;
        }
    }

    regBuilder = new RegExp(regexString.clockTime.regexexec[4],'ig');
    if(regBuilder.test(token)) {
        str = token.match(regBuilder);
        if(str == "noon") {
            hour = 12;
            min = 0;
        } else {
            hour = 0;
            min = 0;
        }
    }

    // TO DO: checked=>Test==?
    let topElement = stack[stack.length-1];
    if(topElement != null) {
        //Check if already a range is defined
        if(flags.isRangeForHour == true || flags.isRangeForMin == true) {
            error +=" already set for range expressions, seperate into two crons!";
            console.log(error);
            return false;
        }

        if(topElement.ownerState == "rangeStart") {
            topElement.hour.start = hour;
            topElement.min.start = min;
            stack.pop();
            stack.push(topElement);
            return true;
        } else if(topElement.ownerState == "rangeEnd") {
            if(topElement.hour == hour) {
                topElement.min.end = min;
                resultCron.min = topElement.min.start + "-"+topElement.min.end;
                //flags.isRangeForHour = true;
                return true;
            } else {
                topElement.hour.end = hour;
                resultCron.hour = topElement.hour.start + "-"+topElement.hour.end;
                //flags.isRangeForMin = true;
                return true;
            }
            stack.pop();
            return true;
        }
    }

    let stackElement = {
        "ownerState" : "clockTime",
        "hour" : hour,
        "min" : min
    };
    resultCron.min = min;
    if(resultCron.hour != "*" && resultCron.hour != "")
        resultCron.hour += ","+hour;
    else
        resultCron.hour = hour;
    stack.push(stackElement);
    return true;
}

module.exports = {
    getClockTime
};

},{"../maps":2}],5:[function(require,module,exports){
'use strict';

const regexString = require('../maps').regexString;
var flags = require('../maps').flags;
var resultCron = require('../maps').resultCron;

/*getDay function to parse days*/
function getDay(token,stack,error) {
    // TO DO: check for group
    let regBuilder = new RegExp(regexString.day.regexexec[0],"ig");
    let value = "";
    // check for word day,days
    if(regBuilder.test(token)) {
        let topElement = stack[stack.length-1];
        resultCron.day_of_week = "?";
        if(topElement == null) {
            topElement = {
                'frequency' : "*"
            };
        } else if(topElement.ownerState == "frequencyOnly") {
            resultCron.day_of_month = "0/"+topElement.frequency;
            stack.pop();
        } else if(topElement.ownerState == "frequencyWith") {
            resultCron.day_of_month = ""+topElement.frequency;
            stack.pop();
        } else {
            resultCron.day_of_month = "*";
        }
    }
    // check for values of days between [MON-SUN]
    else {
        regBuilder = new RegExp(regexString.day.regexexec[1],"ig");
        let matches = token.match(regBuilder);
        if(matches!=null && matches.length != 0) {
            resultCron.day_of_week = "";
            for(let i=0; i<matches.length; i++) {
                matches[i] = matches[i].toUpperCase();
            }
            // TO DO: check
            let topElement = stack[stack.length-1];
            if(matches.length == 1 && topElement != null) {
                //Check if already a range is defined
                if(flags.isRangeForDay == true) {
                    error +=" already set for range expressions, seperate into two crons!";
                    return false;
                }
                stack.pop();
                if(topElement.ownerState == "rangeStart") {
                    topElement.day.start = matches[0];
                    stack.push(topElement);
                    return true;
                } else if(topElement.ownerState == "rangeEnd") {
                    topElement.day.end = matches[0];
                    resultCron.day_of_week = topElement.day.start + "-"+topElement.day.end;
                    resultCron.day_of_month = "?";
                    //flags.isRangeForDay = true;
                    return true;
                }
            }
            if(matches.includes('MON') && !resultCron.day_of_week.includes('MON'))
                resultCron.day_of_week += "MON,";
            if(matches.includes('TUE') && !resultCron.day_of_week.includes('TUE'))
                resultCron.day_of_week += "TUE,";
            if(matches.includes('WED') && !resultCron.day_of_week.includes('WED'))
                resultCron.day_of_week += "WED,";
            if(matches.includes('THU') && !resultCron.day_of_week.includes('THU'))
                resultCron.day_of_week += "THU,";
            if(matches.includes('FRI') && !resultCron.day_of_week.includes('FRI'))
                resultCron.day_of_week += "FRI,";
            if(matches.includes('SAT') && !resultCron.day_of_week.includes('SAT'))
                resultCron.day_of_week += "SAT,";
            if(matches.includes('SUN') && !resultCron.day_of_week.includes('SUN'))
                resultCron.day_of_week += "SUN,";
            if(matches.includes('WEEKEND') && !resultCron.day_of_week.includes('SAT'))
                resultCron.day_of_week += "SAT,";
            if(matches.includes('WEEKEND') && !resultCron.day_of_week.includes('SUN'))
                resultCron.day_of_week += "SUN,";
            // removed extra comma
            resultCron.day_of_week = resultCron.day_of_week.slice(0,-1);
            resultCron.day_of_month = "?";
            value = ""+resultCron.day_of_week;
        } else {
            // TO DO: provide in future. but for NOW  error
            error +=" In unresolved state at 2;Day !";
            return false;
        }
    }
    let stackElement = {
        "ownerState" : "day",
        "day_of_week" : resultCron.day_of_week,
        "day_of_month" : resultCron.day_of_month
    };
    stack.push(stackElement);
    return true;
}

module.exports = {
    getDay
};

},{"../maps":2}],6:[function(require,module,exports){
'use strict';

const regexString = require('../maps').regexString;
var flags = require('../maps').flags;
var resultCron = require('../maps').resultCron;


/*frequencyOnly function to parse and store frequency value without nth*/
function getFrequencyOnly(token,stack,error) {
    let freq = parseInt(token);
    if(isNaN(token)) {
        error +=" token is not number in frequency only !";
        return false;
    }
    if(stack.length > 0 && stack[stack.length - 1].ownerState=="rangeEnd") {
        let topElement = stack[stack.length - 1];
        stack.pop();
        topElement.frequency.end = freq;
        stack.push(topElement);
        return true;
    }
    else if(stack.length > 0 && stack[stack.length - 1].ownerState=="rangeStart") {
        let topElement = stack[stack.length - 1];
        stack.pop();
        topElement.frequency.start = freq;
        stack.push(topElement);
        return true;
    }
    let stackElement = {
        "ownerState" : "frequencyOnly",
        "frequency" : freq
    };
    stack.push(stackElement);
    return true;
}

/*frequencyWith function to parse and store frequency value with nth*/
function getFrequencyWith(token,stack,error) {
    // TO DO: check for group
    let regBuilder = new RegExp(regexString.frequencyOnly.regexexec,"ig");
    let freq = regBuilder.exec(token);
    let value = parseInt(freq);
    if(isNaN(value)) {
        error +=" token is not number in frequency with !";
        return false;
    }
    if(stack.length!=0 && stack[stack.length - 1].ownerState=="rangeEnd") {
        let topElement = stack[stack.length - 1];
        stack.pop();
        topElement.frequency.end = ""+value;
        stack.push(topElement);
        return true;
    }
    else if(stack.length > 0 && stack[stack.length - 1].ownerState=="rangeStart") {
        let topElement = stack[stack.length - 1];
        stack.pop();
        topElement.frequency.start = ""+value;
        stack.push(topElement);
        return true;
    }
    let stackElement = {
        "ownerState" : "frequencyWith",
        "frequency" : value
    };
    stack.push(stackElement);
    return true;
}


module.exports = {
    getFrequencyOnly,
    getFrequencyWith
};

},{"../maps":2}],7:[function(require,module,exports){
'use strict';

const regexString = require('../maps').regexString;
var flags = require('../maps').flags;
var resultCron = require('../maps').resultCron;

/*getHour function to parse Hours*/
function getHour(token,stack,error) {
    // TO DO: check for group
    let regBuilder = new RegExp(regexString.hour.regexexec[0],"ig");
    let value;
    // check for word hours
    if(regBuilder.test(token)) {
        let topElement = stack[stack.length-1];
        if(topElement == null) {
            topElement = {
                'frequency' : "*"
            };
        } else if(topElement.ownerState == "frequencyOnly") {
            value = topElement.frequency;
            resultCron.hour = "0/"+topElement.frequency;
            stack.pop();
        } else if(topElement.ownerState == "frequencyWith") {
            //hour already set
            if(resultCron.hour != "*" && resultCron.hour != "")
                resultCron.hour += ","+topElement.frequency;
            else
                resultCron.hour = ""+topElement.frequency;
            value = resultCron.hour;
            stack.pop();
        } else {
            if(flags.isRangeForHour == true) {
                error +=" already set for range expressions, seperate into two crons!";
                return false;
            }
            else if(topElement.ownerState == "rangeStart") {
                topElement.hour.start = topElement.frequency.start;
                topElement.frequency.start = "";
                stack.pop();
                stack.push(topElement);
                return true;
            } else if(topElement.ownerState == "rangeEnd") {
                stack.pop();
                topElement.hour.start = topElement.frequency.start;
                topElement.hour.end = topElement.frequency.end;
                topElement.frequency.end = "";
                resultCron.hour = topElement.hour.start + "-"+topElement.hour.end;
                //flags.isRangeForHour = true;
                return true;
            }
        }
    }
    let stackElement = {
        "ownerState" : "hour",
        "hour" : value
    };
    stack.push(stackElement);
    return true;
}


module.exports = {
    getHour
};

},{"../maps":2}],8:[function(require,module,exports){
'use strict';

const regexString = require('../maps').regexString;
var flags = require('../maps').flags;
var resultCron = require('../maps').resultCron;

/*getMinute function to parse minutes*/
function getMinute(token,stack,error) {
    // TO DO: check for group
    let regBuilder = new RegExp(regexString.minute.regexexec[0],"ig");
    let value;
    // check for word minute,minutes
    if(regBuilder.test(token)) {
        let topElement = stack[stack.length-1];
        if(topElement == null) {
            topElement = {
                'frequency' : "*"
            };
        } else if(topElement.ownerState == "frequencyOnly") {
            value = topElement.frequency;
            resultCron.min = "0/"+topElement.frequency;
            stack.pop();
        } else if(topElement.ownerState == "frequencyWith") {
            value = topElement.frequency;
            resultCron.min = ""+topElement.frequency;
            stack.pop();
        } else {
            if(flags.isRangeForMinute == true) {
                error +=" already set for range expressions, seperate into two crons!";
                return false;
            }
            else if(topElement.ownerState == "rangeStart") {
                topElement.min.start = topElement.frequency.start;
                topElement.frequency.start = "";
                stack.pop();
                stack.push(topElement);
                return true;
            } else if(topElement.ownerState == "rangeEnd") {
                stack.pop();
                topElement.min.start = topElement.frequency.start;
                topElement.min.end = topElement.frequency.end;
                topElement.frequency.end = "";
                resultCron.min = topElement.min.start + "-"+topElement.min.end;
                //flags.isRangeForMin = true;
                return true;
            }
        }
    }
    let stackElement = {
        "ownerState" : "minute",
        "min" : value
    };
    stack.push(stackElement);
    return true;
}


module.exports = {
    getMinute
};

},{"../maps":2}],9:[function(require,module,exports){
'use strict';

const regexString = require('../maps').regexString;
var flags = require('../maps').flags;
var resultCron = require('../maps').resultCron;

/*getMonth function to parse months*/
function getMonth(token,stack,error) {
    // TO DO: check for group
    let regBuilder = new RegExp(regexString.month.regexexec[0],"ig");
    let value = "";
    // check for word month,months
    if(regBuilder.test(token)) {
        let topElement = stack[stack.length-1];
        if(topElement == null) {
            topElement = {
                'frequency' : "*"
            };
        }
        if(topElement.ownerState == "frequencyOnly") {
            resultCron.month = "0/"+topElement.frequency;
            stack.pop();
        } else if(topElement.ownerState == "frequencyWith") {
            resultCron.month = ""+topElement.frequency;
            stack.pop();
        } else {
            resultCron.month = "*";
        }
    }
    // check for values of months between [JAN-DEC]
    else {
        // TO DO: check for group
        regBuilder = new RegExp(regexString.month.regexexec[1],"ig");
        let matches = token.match(regBuilder);
        if(matches!=null && matches.length != 0) {
            resultCron.month = "";
            for(let i=0; i<matches.length; i++) {
                matches[i] = matches[i].toUpperCase();
            }
            // TO DO: check
            let topElement = stack[stack.length-1];

            if(matches.length == 1 && topElement != null) {
                //Check if already a range is defined
                if(flags.isRangeForMonth == true) {
                    error +=" already set for range expressions, seperate into two crons!";
                    return false;
                }
                stack.pop();
                if(topElement.ownerState == "frequencyOnly") {
                    resultCron.day_of_month = topElement.frequency;
                } else if(topElement.ownerState == "frequencyWith") {
                    resultCron.day_of_month = topElement.frequency;
                } else if(topElement.ownerState == "rangeStart") {
                    topElement.month.start = matches[0];
                    stack.push(topElement);
                    return true;
                } else if(topElement.ownerState == "rangeEnd") {
                    if(topElement.frequency.end != "") {
                        resultCron.day_of_week = "?";
                        resultCron.day_of_month = topElement.frequency.start + "-" + topElement.frequency.end;
                    }
                    topElement.month.end = matches[0];
                    resultCron.month = topElement.month.start + "-"+topElement.month.end;
                    //flags.isRangeForMonth = true;
                    return true;
                }
            }
            if(matches.includes('JAN') && !resultCron.month.includes('JAN'))
                resultCron.month += "JAN,";
            if(matches.includes('FEB') && !resultCron.month.includes('FEB'))
                resultCron.month += "FEB,";
            if(matches.includes('MAR') && !resultCron.month.includes('MAR'))
                resultCron.month += "MAR,";
            if(matches.includes('APR') && !resultCron.month.includes('APR'))
                resultCron.month += "APR,";
            if(matches.includes('MAY') && !resultCron.month.includes('MAY'))
                resultCron.month += "MAY,";
            if(matches.includes('JUN') && !resultCron.month.includes('JUN'))
                resultCron.month += "JUN,";
            if(matches.includes('JUL') && !resultCron.month.includes('JUL'))
                resultCron.month += "JUL,";
            if(matches.includes('AUG') && !resultCron.month.includes('AUG'))
                resultCron.month += "AUG,";
            if(matches.includes('SEPT') && !resultCron.month.includes('SEPT'))
                resultCron.month += "SEPT,";
            if(matches.includes('OCT') && !resultCron.month.includes('OCT'))
                resultCron.month += "OCT,";
            if(matches.includes('NOV') && !resultCron.month.includes('NOV'))
                resultCron.month += "NOV,";
            if(matches.includes('DEC') && !resultCron.month.includes('DEC'))
                resultCron.month += "DEC,";
            // removed extra comma
            resultCron.month = resultCron.month.slice(0,-1);
            value = ""+resultCron.month;
        } else {
            // TO DO: provide in future. but for NOW  error
            error +=" In unresolved state at 2;Month !";
            return false;
        }
    }
    let stackElement = {
        "ownerState" : "month",
        "month" : resultCron.month,
    };
    stack.push(stackElement);
    return true;
}


module.exports = {
    getMonth
};

},{"../maps":2}],10:[function(require,module,exports){
'use strict';

const regexString = require('../maps').regexString;
var flags = require('../maps').flags;
var resultCron = require('../maps').resultCron;


/*rangeStartState function for range input*/
function rangeStartState(token,stack,error) {
    if(flags.isRangeForDay || flags.isRangeForMin || flags.isRangeForMonth || flags.isRangeForYear || flags.isRangeForHour) {
        error +=" already range expressions !";
        return false;
    }
    let stackElement = {
        "ownerState" : "rangeStart",
        "min": {
            "start" : "",
            "end" : ""
        },
        "hour" : {
            "start" : "",
            "end" : ""
        },
        "day" : {
            "start" : "",
            "end" : ""
        },
        "month" : {
            "start" : "",
            "end" : ""
        },
        "year" : {
            "start" : "",
            "end" : ""
        },
        "frequency" : {
            "start" : "",
            "end" : ""
        }
    };
    stack.push(stackElement);
    return true;
}

/*rangeEndState function for range input*/
function rangeEndState(token,stack,error) {
    let stackElement = {
        "ownerState" : "rangeEnd",
        "min": {
            "start" : "",
            "end" : ""
        },
        "hour" : {
            "start" : "",
            "end" : ""
        },
        "day" : {
            "start" : "",
            "end" : ""
        },
        "month" : {
            "start" : "",
            "end" : ""
        },
        "year" : {
            "start" : "",
            "end" : ""
        },
        "frequency" : {
            "start" : "",
            "end" : ""
        }
    };
    let topElement = stack[stack.length-1];
    if(topElement!=null) {
        switch(topElement.ownerState) {
            case "frequencyWith" :
            case "frequencyOnly" :
            {
                stack.pop();
                stackElement.frequency.start = topElement.frequency;
                stackElement.ownerState = "rangeEnd";
                stack.push(stackElement)
            }
            break;
            case "clockTime" :
            {
                stack.pop();
                stackElement.hour.start = topElement.hour;
                stackElement.min.start = topElement.min;
                stackElement.ownerState = "rangeEnd";
                stack.push(stackElement)
            }
            break;
            case "rangeStart" :
            {
                stack.pop();
                topElement.ownerState = "rangeEnd";
                stack.push(topElement);
            }
            break;
            case "month" :
            {
                stack.pop();
                stackElement.ownerState = "rangeEnd";
                stackElement.month.start = topElement.month;
                stack.push(stackElement);
            }
            break;
            case "minute" :
            {
                stack.pop();
                stackElement.ownerState = "rangeEnd";
                stackElement.frequency.start = stackElement.min.start = topElement.min;
                stack.push(stackElement);
            }
            break;
            case "hour" :
            {
                stack.pop();
                stackElement.ownerState = "rangeEnd";
                stackElement.frequency.start = stackElement.hour.start = topElement.hour;
                stack.push(stackElement);
            }
            break;
            case "day" :
            {
                stack.pop();
                stackElement.ownerState = "rangeEnd";
                stackElement.day.start = topElement.day_of_week;
                stack.push(stackElement);
            }
            break;
            case "year" :
            {
                stack.pop();
                stackElement.ownerState = "rangeEnd";
                stackElement.year.start = topElement.year;
                stack.push(stackElement);
            }
            break;
        }
    }
    return true;
}


module.exports = {
    rangeStartState,
    rangeEndState
};

},{"../maps":2}],11:[function(require,module,exports){
'use strict';

const regexString = require('../maps').regexString;
var flags = require('../maps').flags;
var resultCron = require('../maps').resultCron;


/*getYear function to parse year*/
function getYear(token,stack,error) {
    // TO DO: check for group
    let regBuilder = new RegExp(regexString.year.regexexec[0],"ig");
    let value = "";
    // check for word year,years
    if(regBuilder.test(token)) {
        let topElement = stack[stack.length-1];
        resultCron.year = "?";
        if(topElement == null) {
            topElement = {
                'frequency' : "*"
            };
        } else if(topElement.ownerState == "frequencyOnly") {
            resultCron.year = "0/"+topElement.frequency;
            stack.pop();
        } else if(topElement.ownerState == "frequencyWith") {
            resultCron.year = ""+topElement.frequency;
            stack.pop();
        } else {
            resultCron.year = "*";
        }
    }
    // check for values of years
    else {
        regBuilder = new RegExp(regexString.year.regexexec[1],"ig");
        let regBuilder2 = new RegExp(regexString.year.regexexec[2],"ig")
        let matches = token.match(regBuilder);
        let exactMatches = new Set();
        for(let i=0; i<matches.length; i++) {
            if(regBuilder2.test(matches[i])) {
                exactMatches.add(matches[i].match(regBuilder2)[0]);
            }
        }
        // TO DO: check
        let topElement = stack[stack.length-1];
        if(exactMatches.size == 1 && topElement != null) {
            //Check if already a range is defined
            if(flags.isRangeForYear == true) {
                error +=" Cannot handle multiple range expressions, seperate into two crons!";
                return false;
            }

            if(topElement.ownerState == "rangeStart") {
                topElement.year.start = Array.from(exactMatches)[0];
                stack.pop();
                stack.push(topElement);
                return true;
            } else if(topElement.ownerState == "rangeEnd") {
                topElement.year.end = Array.from(exactMatches)[0];
                stack.pop();
                resultCron.year = topElement.year.start + "-"+topElement.year.end;
                //flags.isRangeForYear = true;
                return true;
            }
        }
        if(exactMatches.size != 0) {
            resultCron.year = "";
            exactMatches.forEach(function(yr){
                resultCron.year += yr+",";
            });
            // removed extra comma
            resultCron.year = resultCron.year.slice(0,-1);
            value = ""+resultCron.year;
        } else {
            // TO DO: provide in future. but for NOW  error
            error +=" In unresolved state at 2;year !";
            return false;
        }
    }
    let stackElement = {
        "ownerState" : "year",
        "year" : resultCron.year
    };
    stack.push(stackElement);
    return true;
}

module.exports = {
    getYear
};

},{"../maps":2}],12:[function(require,module,exports){
'use strict';

const regexString = require('./maps').regexString;
var flags = require('./maps').flags;
var resultCron = require('./maps').resultCron;
//tokenizeInput function to seperate out all tokens

module.exports = {
    tokenizeInput : function(inputString){
        let regBuilder = new RegExp(regexString.tokenising.regexexec,"ig");
        let matches = inputString.match(regBuilder);
        if(matches == null || matches.length == 0 ) {
            return [];
        }
        for(let i=0;i<matches.length;i++) {
            matches[i] = (matches[i]+"").trim();
        }
        return matches;
    }
};

},{"./maps":2}]},{},[3])(3)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2hvbWUvcmF0aGlyb2hpdC8ubnZtL3ZlcnNpb25zL25vZGUvdjYuMTEuNS9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2hvbWUvcmF0aGlyb2hpdC8ubnZtL3ZlcnNpb25zL25vZGUvdjYuMTEuNS9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbGliL19lbXB0eS5qcyIsIm1hcHMuanMiLCJuYXR1cmFsLWNyb24uanMiLCJzdGF0ZXMvY2xvY2t0aW1lLmpzIiwic3RhdGVzL2RheS5qcyIsInN0YXRlcy9mcmVxdWVuY3kuanMiLCJzdGF0ZXMvaG91ci5qcyIsInN0YXRlcy9taW51dGUuanMiLCJzdGF0ZXMvbW9udGguanMiLCJzdGF0ZXMvcmFuZ2UuanMiLCJzdGF0ZXMveWVhci5qcyIsInRva2Vucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIiLCIndXNlIHN0cmljdCc7XG4vL3JlZ2V4U3RyaW5nIGpzb25cbnZhciByZWdleFN0cmluZyA9IHtcbiAgICBldmVyeSA6IHtcbiAgICAgICAgXCJyZWdleHRlc3RcIiA6IFwiXihldmVyeXxlYWNofGFsbHxlbnRpcmUpJFwiXG4gICAgfSxcbiAgICBjbG9ja1RpbWUgOiB7XG4gICAgICAgIC8vaHR0cHM6Ly9yZWdleHIuY29tLzNxcWJuXG4gICAgICAgIFwicmVnZXh0ZXN0XCIgOiBcIl4oWzAtOV0rOik/WzAtOV0rICooQU18UE0pJHxeKFswLTldKzpbMC05XSspJHwobm9vbnxtaWRuaWdodClcIixcbiAgICAgICAgLy9odHRwczovL3JlZ2V4ci5jb20vM3FxYnRcbiAgICAgICAgXCJyZWdleGV4ZWNcIiA6IFtcbiAgICAgICAgICAgIFwiXlswLTldK1wiLFxuICAgICAgICAgICAgXCI6WzAtOV0rXCIsXG4gICAgICAgICAgICBcInBtXCIsXG4gICAgICAgICAgICBcImFtXCIsXG4gICAgICAgICAgICBcIihub29ufG1pZG5pZ2h0KVwiXG4gICAgICAgIF1cbiAgICB9LFxuICAgIGZyZXF1ZW5jeVdpdGggOiB7XG4gICAgICAgIFwicmVnZXh0ZXN0XCIgOiBcIl5bMC05XSsodGh8bmR8cmR8c3QpJFwiXG4gICAgfSxcbiAgICBmcmVxdWVuY3lPbmx5IDoge1xuICAgICAgICBcInJlZ2V4dGVzdFwiIDogXCJeWzAtOV0rJFwiLFxuICAgICAgICBcInJlZ2V4ZXhlY1wiIDogXCJeWzAtOV0rXCJcbiAgICB9LFxuICAgIG1pbnV0ZSA6IHtcbiAgICAgICAgXCJyZWdleHRlc3RcIiA6IFwiKG1pbnV0ZXN8bWludXRlfG1pbnN8bWluKVwiLFxuICAgICAgICBcInJlZ2V4ZXhlY1wiIDogW1xuICAgICAgICAgICAgXCJeKG1pbnV0ZXN8bWludXRlfG1pbnN8bWluKSRcIlxuICAgICAgICBdXG4gICAgfSxcbiAgICBob3VyIDoge1xuICAgICAgICBcInJlZ2V4dGVzdFwiIDogXCIoaG91cnxocnN8aG91cnMpXCIsXG4gICAgICAgIFwicmVnZXhleGVjXCIgOiBbXG4gICAgICAgICAgICBcIl4oaG91cnxocnN8aG91cnMpJFwiXG4gICAgICAgIF1cbiAgICB9LFxuICAgIGRheSA6IHtcbiAgICAgICAgLy9odHRwczovL3JlZ2V4ci5jb20vM3FxYzNcbiAgICAgICAgXCJyZWdleHRlc3RcIiA6IFwiXigoZGF5c3xkYXkpfCgoKG1vbmRheXx0dWVzZGF5fHdlZG5lc2RheXx0aHVyc2RheXxmcmlkYXl8c2F0dXJkYXl8c3VuZGF5fFdFRUtFTkR8TU9OfFRVRXxXRUR8VEhVfEZSSXxTQVR8U1VOKSggP2FuZCk/LD8gPykrKSkkXCIsXG4gICAgICAgIFwicmVnZXhleGVjXCIgOiBbXG4gICAgICAgICAgICBcIl4oZGF5fGRheXMpJFwiLFxuICAgICAgICAgICAgXCIoTU9OfFRVRXxXRUR8VEhVfEZSSXxTQVR8U1VOfFdFRUtFTkQpXCJcbiAgICAgICAgXVxuICAgIH0sXG4gICAgbW9udGggOiB7XG4gICAgICAgIC8vaHR0cHM6Ly9yZWdleHIuY29tLzNyMW5hXG4gICAgICAgIFwicmVnZXh0ZXN0XCIgOiBcIl4oKG1vbnRoc3xtb250aCl8KCgoamFudWFyeXxmZWJydWFyeXxtYXJjaHxhcHJpbHxtYXl8anVuZXxqdWx5fGF1Z3VzdHxzZXB0ZW1iZXJ8b2N0b2Jlcnxub3ZlbWJlcnxkZWNlbWJlcnxKQU58RkVCfE1BUnxBUFJ8TUFZfEpVTnxKVUx8QVVHfFNFUFR8T0NUfE5PVnxERUMpKCA/YW5kKT8sPyA/KSspKSRcIixcbiAgICAgICAgXCJyZWdleGV4ZWNcIiA6IFtcbiAgICAgICAgICAgIFwiXihtb250aHxtb250aHMpJFwiLFxuICAgICAgICAgICAgXCIoSkFOfEZFQnxNQVJ8QVBSfE1BWXxKVU58SlVMfEFVR3xTRVBUfE9DVHxOT1Z8REVDKVwiXG4gICAgICAgIF1cbiAgICB9LFxuICAgIHllYXIgOiB7XG4gICAgICAgIFwicmVnZXh0ZXN0XCIgOiBcIigoeWVhcnN8eWVhcil8KFswLTldezR9WzAtOV0qKCggP2FuZCk/LD8gPykpKylcIixcbiAgICAgICAgXCJyZWdleGV4ZWNcIiA6IFtcbiAgICAgICAgICAgIFwiXih5ZWFyc3x5ZWFyKSRcIixcbiAgICAgICAgICAgIFwiWzAtOV0qXCIsXG4gICAgICAgICAgICBcIl5bMC05XXs0fSRcIlxuICAgICAgICBdXG4gICAgfSxcbiAgICByYW5nZVN0YXJ0IDoge1xuICAgICAgICBcInJlZ2V4dGVzdFwiIDogXCIoYmV0d2VlbnxzdGFydGluZ3xzdGFydClcIiAsXG4gICAgfSxcbiAgICByYW5nZUVuZCA6IHtcbiAgICAgICAgXCJyZWdleHRlc3RcIiA6IFwiKHRvfHRocm91Z2h8ZW5kaW5nfGVuZHxhbmQpXCIgLFxuICAgIH0sXG4gICAgdG9rZW5pc2luZyA6IHtcbiAgICAgICAgXCJyZWdleGV4ZWNcIiA6IFwiKGhvdXJ8aHJzfGhvdXJzKXwobWludXRlc3xtaW51dGV8bWluc3xtaW4pfCgobW9udGhzfG1vbnRoKXwoKChqYW51YXJ5fGZlYnJ1YXJ5fG1hcmNofGFwcmlsfG1heXxqdW5lfGp1bHl8YXVndXN0fHNlcHRlbWJlcnxvY3RvYmVyfG5vdmVtYmVyfGRlY2VtYmVyfEpBTnxGRUJ8TUFSfEFQUnxNQVl8SlVOfEpVTHxBVUd8U0VQVHxPQ1R8Tk9WfERFQykoID9hbmQpPyw/ID8pKykpfFswLTldKyh0aHxuZHxyZHxzdCl8KChbMC05XSs6KT9bMC05XSsoICspPyhBTXxQTSkpfChbMC05XSs6WzAtOV0rKXwobm9vbnxtaWRuaWdodCl8KChkYXlzfGRheSl8KCgobW9uZGF5fHR1ZXNkYXl8d2VkbmVzZGF5fHRodXJzZGF5fGZyaWRheXxzYXR1cmRheXxzdW5kYXl8V0VFS0VORHxNT058VFVFfFdFRHxUSFV8RlJJfFNBVHxTVU4pKCA/YW5kKT8sPyA/KSspKXwoKFswLTldezR9WzAtOV0qKCggP2FuZCk/LD8gPykpKyl8KFswLTldKyl8KHRvfHRocm91Z2h8ZW5kaW5nfGVuZHxhbmQpfChiZXR3ZWVufHN0YXJ0aW5nfHN0YXJ0KVwiXG4gICAgfVxufTtcblxudmFyIGZsYWdzID0ge1xuICAgIFwiaXNSYW5nZUZvckRheVwiIDogZmFsc2UsXG4gICAgXCJpc1JhbmdlRm9yTW9udGhcIiA6IGZhbHNlLFxuICAgIFwiaXNSYW5nZUZvclllYXJcIiA6IGZhbHNlLFxuICAgIFwiaXNSYW5nZUZvckhvdXJcIiA6IGZhbHNlLFxuICAgIFwiaXNSYW5nZUZvck1pblwiIDogZmFsc2Vcbn07XG5cbnZhciByZXN1bHRDcm9uID0ge1xuICAgIFwibWluXCIgOiBcIipcIixcbiAgICBcImhvdXJcIiA6IFwiKlwiLFxuICAgIFwiZGF5X29mX21vbnRoXCIgOiBcIipcIixcbiAgICBcIm1vbnRoXCIgOiBcIipcIixcbiAgICBcImRheV9vZl93ZWVrXCIgOiBcIj9cIixcbiAgICBcInllYXJcIiA6IFwiKlwiXG59O1xuXG52YXIgZGVmYXVsdE1hcHMgPSB7XG4gICAgZmxhZ3MgOiB7XG4gICAgICAgIFwiaXNSYW5nZUZvckRheVwiIDogZmFsc2UsXG4gICAgICAgIFwiaXNSYW5nZUZvck1vbnRoXCIgOiBmYWxzZSxcbiAgICAgICAgXCJpc1JhbmdlRm9yWWVhclwiIDogZmFsc2UsXG4gICAgICAgIFwiaXNSYW5nZUZvckhvdXJcIiA6IGZhbHNlLFxuICAgICAgICBcImlzUmFuZ2VGb3JNaW5cIiA6IGZhbHNlXG4gICAgfSxcbiAgICByZXN1bHRDcm9uIDoge1xuICAgICAgICBcIm1pblwiIDogXCIqXCIsXG4gICAgICAgIFwiaG91clwiIDogXCIqXCIsXG4gICAgICAgIFwiZGF5X29mX21vbnRoXCIgOiBcIipcIixcbiAgICAgICAgXCJtb250aFwiIDogXCIqXCIsXG4gICAgICAgIFwiZGF5X29mX3dlZWtcIiA6IFwiP1wiLFxuICAgICAgICBcInllYXJcIiA6IFwiKlwiXG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcmVnZXhTdHJpbmcsXG4gICAgZGVmYXVsdE1hcHMsXG4gICAgZmxhZ3MsXG4gICAgcmVzdWx0Q3JvblxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgcmVnZXhTdHJpbmcgPSByZXF1aXJlKCcuL21hcHMnKS5yZWdleFN0cmluZztcbnZhciBkZWZhdWx0TWFwcyA9IHJlcXVpcmUoJy4vbWFwcycpLmRlZmF1bHRNYXBzO1xudmFyIGZsYWdzID0gcmVxdWlyZSgnLi9tYXBzJykuZmxhZ3M7XG52YXIgcmVzdWx0Q3JvbiA9IHJlcXVpcmUoJy4vbWFwcycpLnJlc3VsdENyb247XG5cbnZhciByZWFkbGluZSA9IHJlcXVpcmUoJ3JlYWRsaW5lJyk7XG5jb25zdCB0b2tlbml6ZUlucHV0ICA9IHJlcXVpcmUoJy4vdG9rZW5zJykudG9rZW5pemVJbnB1dDtcbmNvbnN0IGdldENsb2NrVGltZSAgPSByZXF1aXJlKCcuL3N0YXRlcy9jbG9ja3RpbWUnKS5nZXRDbG9ja1RpbWU7XG5jb25zdCBnZXREYXkgID0gcmVxdWlyZSgnLi9zdGF0ZXMvZGF5JykuZ2V0RGF5O1xuY29uc3QgZ2V0RnJlcXVlbmN5T25seSAgPSByZXF1aXJlKCcuL3N0YXRlcy9mcmVxdWVuY3knKS5nZXRGcmVxdWVuY3lPbmx5O1xuY29uc3QgZ2V0RnJlcXVlbmN5V2l0aCAgPSByZXF1aXJlKCcuL3N0YXRlcy9mcmVxdWVuY3knKS5nZXRGcmVxdWVuY3lXaXRoO1xuY29uc3QgZ2V0SG91ciAgPSByZXF1aXJlKCcuL3N0YXRlcy9ob3VyJykuZ2V0SG91cjtcbmNvbnN0IGdldE1vbnRoICA9IHJlcXVpcmUoJy4vc3RhdGVzL21vbnRoJykuZ2V0TW9udGg7XG5jb25zdCBnZXRNaW51dGUgID0gcmVxdWlyZSgnLi9zdGF0ZXMvbWludXRlJykuZ2V0TWludXRlO1xuY29uc3QgcmFuZ2VTdGFydFN0YXRlICA9IHJlcXVpcmUoJy4vc3RhdGVzL3JhbmdlJykucmFuZ2VTdGFydFN0YXRlO1xuY29uc3QgcmFuZ2VFbmRTdGF0ZSAgPSByZXF1aXJlKCcuL3N0YXRlcy9yYW5nZScpLnJhbmdlRW5kU3RhdGU7XG5jb25zdCBnZXRZZWFyICA9IHJlcXVpcmUoJy4vc3RhdGVzL3llYXInKS5nZXRZZWFyO1xuXG4vKmNhbGxTdGF0ZSBmdW5jdGlvbiB0byBtYXRjaCBhbmQgY2FsbCBjdXJyZXNwb25kaW5nIHN0YXRlIGZ1bmN0aW9uKi9cbmZ1bmN0aW9uIGNhbGxTdGF0ZSh0b2tlbixzdGFjayxlcnJvcikge1xuICAgIGxldCBzdGF0ZU5hbWUgPSBkZWNpZGVTdGF0ZSh0b2tlbik7XG4gICAgY29uc29sZS5sb2coXCJpbiBcIitzdGF0ZU5hbWUpO1xuICAgIFxuICAgIHN3aXRjaChzdGF0ZU5hbWUpIHtcbiAgICAgICAgY2FzZSBcImZyZXF1ZW5jeVdpdGhcIiA6IHtcbiAgICAgICAgICAgIHJldHVybiBnZXRGcmVxdWVuY3lXaXRoKHRva2VuLHN0YWNrLGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImZyZXF1ZW5jeU9ubHlcIiA6IHtcbiAgICAgICAgICAgIHJldHVybiBnZXRGcmVxdWVuY3lPbmx5KHRva2VuLHN0YWNrLGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImNsb2NrVGltZVwiIDoge1xuICAgICAgICAgICAgcmV0dXJuIGdldENsb2NrVGltZSh0b2tlbixzdGFjayxlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJkYXlcIiA6IHtcbiAgICAgICAgICAgIHJldHVybiBnZXREYXkodG9rZW4sc3RhY2ssZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibWludXRlXCIgOiB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0TWludXRlKHRva2VuLHN0YWNrLGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImhvdXJcIiA6IHtcbiAgICAgICAgICAgIHJldHVybiBnZXRIb3VyKHRva2VuLHN0YWNrLGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm1vbnRoXCIgOiB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0TW9udGgodG9rZW4sc3RhY2ssZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwieWVhclwiIDoge1xuICAgICAgICAgICAgcmV0dXJuIGdldFllYXIodG9rZW4sc3RhY2ssZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicmFuZ2VTdGFydFwiIDoge1xuICAgICAgICAgICAgcmV0dXJuIHJhbmdlU3RhcnRTdGF0ZSh0b2tlbixzdGFjayxlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyYW5nZUVuZFwiIDoge1xuICAgICAgICAgICAgcmV0dXJuIHJhbmdlRW5kU3RhdGUodG9rZW4sc3RhY2ssZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuLypkZWNpZGVTdGF0ZSBmdW5jdGlvbiB0byBkZWNpZGUgbmV4dCBzdGF0ZSovXG5mdW5jdGlvbiBkZWNpZGVTdGF0ZSh0b2tlbikge1xuICAgIGxldCBpc0ZvdW5kID0gXCJkZWNpZGVTdGF0ZVwiO1xuICAgIGZvcihsZXQga2V5IGluIHJlZ2V4U3RyaW5nKSB7XG4gICAgICAgIC8vIFRPIERPOiBjaGVjayBmb3IgZ3JvdXBcbiAgICAgICAgbGV0IHJlZ0J1aWxkZXIgPSBuZXcgUmVnRXhwKHJlZ2V4U3RyaW5nW2tleV0ucmVnZXh0ZXN0LCdpZycpO1xuICAgICAgICBpZihyZWdCdWlsZGVyLnRlc3QodG9rZW4pKSB7XG4gICAgICAgICAgICBpc0ZvdW5kID0ga2V5O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlzRm91bmQ7XG59XG5cbi8qcmVzZXRNYXBzIGZ1bmN0aW9uIHRvIHNldCBkZWZhdWx0IHZhbHVlcyB0byBmbGFncyBhbmQgcmVzdWx0Q3JvbiovXG5mdW5jdGlvbiByZXNldE1hcHMoKSB7XG4gICAgZmxhZ3MuaXNSYW5nZUZvckRheSA9IGRlZmF1bHRNYXBzLmZsYWdzLmlzUmFuZ2VGb3JEYXk7XG4gICAgZmxhZ3MuaXNSYW5nZUZvck1vbnRoID0gZGVmYXVsdE1hcHMuZmxhZ3MuaXNSYW5nZUZvck1vbnRoO1xuICAgIGZsYWdzLmlzUmFuZ2VGb3JZZWFyID0gZGVmYXVsdE1hcHMuZmxhZ3MuaXNSYW5nZUZvclllYXI7XG4gICAgZmxhZ3MuaXNSYW5nZUZvckhvdXIgPSBkZWZhdWx0TWFwcy5mbGFncy5pc1JhbmdlRm9ySG91cjtcbiAgICBmbGFncy5pc1JhbmdlRm9yTWluID0gZGVmYXVsdE1hcHMuZmxhZ3MuaXNSYW5nZUZvck1pbjtcblxuICAgIHJlc3VsdENyb24ubWluID0gZGVmYXVsdE1hcHMucmVzdWx0Q3Jvbi5taW47XG4gICAgcmVzdWx0Q3Jvbi5ob3VyID0gZGVmYXVsdE1hcHMucmVzdWx0Q3Jvbi5ob3VyO1xuICAgIHJlc3VsdENyb24uZGF5X29mX21vbnRoID0gZGVmYXVsdE1hcHMucmVzdWx0Q3Jvbi5kYXlfb2ZfbW9udGg7XG4gICAgcmVzdWx0Q3Jvbi5tb250aCA9IGRlZmF1bHRNYXBzLnJlc3VsdENyb24ubW9udGg7XG4gICAgcmVzdWx0Q3Jvbi5kYXlfb2Zfd2VlayA9IGRlZmF1bHRNYXBzLnJlc3VsdENyb24uZGF5X29mX3dlZWs7XG4gICAgcmVzdWx0Q3Jvbi55ZWFyID0gZGVmYXVsdE1hcHMucmVzdWx0Q3Jvbi55ZWFyO1xufVxuXG4vKmdldENyb25TdHJpbmcgZnVjbnRpb24gdG8gY29udmVydCBodW1hbiByZWFkYWJsZSBpbnB1dCBzdHJpbmcgdG8gY3JvbiBzdHJpbmcqL1xuZnVuY3Rpb24gZ2V0Q3JvblN0cmluZyhpbnB1dFN0cmluZywgc3ludGF4U3RyaW5nKSB7XG4gICAgLy9TZXQgZGVmYXVsdCBzeW50YXggc3RyaW5nXG4gICAgc3ludGF4U3RyaW5nID0gdHlwZW9mKHN5bnRheFN0cmluZykgIT09ICd1bmRlZmluZWQnID8gc3ludGF4U3RyaW5nIDogXCJNSU4gSE9SIERPTSBNT04gV0VLIFlFUlwiO1xuXG4gICAgLy9TZXR0aW5nIHRoZSBkZWZhdWx0IHZhbHVlc1xuICAgIHJlc2V0TWFwcygpO1xuXG4gICAgLy9TdGFjayB0byBzdG9yZSB0ZW1wZXJvcnkgc3RhdGVzJyBkYXRhXG4gICAgbGV0IHN0YWNrID0gW107XG5cbiAgICBsZXQgZXJyb3IgPSBcIlwiO1xuICAgIGxldCBub3RFbmRTdGF0ZSA9IHRydWU7XG4gICAgbGV0IHRva2VucyA9IHRva2VuaXplSW5wdXQoaW5wdXRTdHJpbmcpO1xuICAgIGNvbnNvbGUubG9nKHRva2Vucyk7XG5cbiAgICBpZih0b2tlbnMubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgZXJyb3IrPVwiT29wcyEgTWF5IGJlIG5hdHVyYWwtY3Jvbi5qcyBjYW4ndCByZWNvZ25pemUgdGhpcyA6KFxcblBsZWFzZSBjb25zaWRlciBzaGFyaW5nIHRoZSBwaHJhc2Ugd2l0aCB1cyBAIGRhcmtleWVkZXZAZ21haWwuY29tIG9yIG9uIEdpdEh1YiBwYWdlIG9mIG5hdHVyYWwtY3Jvbi5qc1wiO1xuICAgICAgICBub3RFbmRTdGF0ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGZvcihsZXQgaT0wOyBub3RFbmRTdGF0ZSAmJiBpPHRva2Vucy5sZW5ndGg7aSsrKSB7XG4gICAgICAgIG5vdEVuZFN0YXRlID0gY2FsbFN0YXRlKHRva2Vuc1tpXSxzdGFjayxlcnJvcik7XG4gICAgfVxuICAgIGlmKG5vdEVuZFN0YXRlID09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBcIkVSUk9SOlwiK2Vycm9yICsgXCJcXG5cIiArIHN5bnRheFN0cmluZy5yZXBsYWNlKFwiTUlOXCIscmVzdWx0Q3Jvbi5taW4pLnJlcGxhY2UoXCJIT1JcIixyZXN1bHRDcm9uLmhvdXIpLnJlcGxhY2UoXCJET01cIixyZXN1bHRDcm9uLmRheV9vZl9tb250aCkucmVwbGFjZShcIk1PTlwiLHJlc3VsdENyb24ubW9udGgpLnJlcGxhY2UoXCJXRUtcIixyZXN1bHRDcm9uLmRheV9vZl93ZWVrKS5yZXBsYWNlKFwiWUVSXCIscmVzdWx0Q3Jvbi55ZWFyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBzeW50YXhTdHJpbmcucmVwbGFjZShcIk1JTlwiLHJlc3VsdENyb24ubWluKS5yZXBsYWNlKFwiSE9SXCIscmVzdWx0Q3Jvbi5ob3VyKS5yZXBsYWNlKFwiRE9NXCIscmVzdWx0Q3Jvbi5kYXlfb2ZfbW9udGgpLnJlcGxhY2UoXCJNT05cIixyZXN1bHRDcm9uLm1vbnRoKS5yZXBsYWNlKFwiV0VLXCIscmVzdWx0Q3Jvbi5kYXlfb2Zfd2VlaykucmVwbGFjZShcIllFUlwiLHJlc3VsdENyb24ueWVhcik7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldENyb25TdHJpbmc7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHJlZ2V4U3RyaW5nID0gcmVxdWlyZSgnLi4vbWFwcycpLnJlZ2V4U3RyaW5nO1xudmFyIGZsYWdzID0gcmVxdWlyZSgnLi4vbWFwcycpLmZsYWdzO1xudmFyIHJlc3VsdENyb24gPSByZXF1aXJlKCcuLi9tYXBzJykucmVzdWx0Q3JvbjtcblxuLypjbG9ja1RpbWUgZnVuY3Rpb24gdG8gcGFyc2UgYW5kIHN0b3JlIGZyZXF1ZW5jeSB2YWx1ZSB3aXRob3V0IG50aCovXG5mdW5jdGlvbiBnZXRDbG9ja1RpbWUodG9rZW4sc3RhY2ssZXJyb3IpIHtcbiAgICAvL3JldHJpdmUgaG91cnMgZnJvbSBjbG9ja3RpbWVcbiAgICBsZXQgcmVnQnVpbGRlciA9IG5ldyBSZWdFeHAocmVnZXhTdHJpbmcuY2xvY2tUaW1lLnJlZ2V4ZXhlY1swXSk7XG4gICAgbGV0IHN0ciA9IHRva2VuLm1hdGNoKHJlZ0J1aWxkZXIpO1xuXG4gICAgbGV0IGhvdXIsbWluO1xuICAgIGlmKHN0ciAhPSBudWxsICYmIHN0ci5sZW5ndGggPiAwKSB7XG4gICAgICAgIGhvdXIgPSBwYXJzZUludChzdHJbMF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGhvdXIgPSAwO1xuICAgIH1cblxuICAgIC8vcmV0cml2ZSBtaW51dGVzIGZyb20gY2xvY2tUaW1lXG4gICAgcmVnQnVpbGRlciA9IG5ldyBSZWdFeHAocmVnZXhTdHJpbmcuY2xvY2tUaW1lLnJlZ2V4ZXhlY1sxXSk7XG4gICAgc3RyID0gcmVnQnVpbGRlci5leGVjKHRva2VuKTtcbiAgICBpZihzdHIgIT0gbnVsbCAmJiBzdHIubGVuZ3RoID4gMCkge1xuICAgICAgICBpZihzdHJbMF0uaW5kZXhPZignOicpIT0tMSkge1xuICAgICAgICAgICAgbWluID0gcGFyc2VJbnQoc3RyWzBdLnNsaWNlKHN0clswXS5pbmRleE9mKCc6JykrMSkpO1xuICAgICAgICAgICAgaWYobWluID49IDYwKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgKz1cIiBwbGVhc2UgZW50ZXIgY29ycmVjdCBtaW51dGVzICFcIjtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWluID0gMDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIG1pbiA9IDA7XG4gICAgfVxuXG4gICAgLy9jaGVjayBmb3IgaW5jcmVtZW50IG9mIGhvdXIgYnkgMTIgZm9yIFBNXG4gICAgbGV0IHJlZ0J1aWxkZXJQTSA9IG5ldyBSZWdFeHAocmVnZXhTdHJpbmcuY2xvY2tUaW1lLnJlZ2V4ZXhlY1syXSwnaWcnKTtcbiAgICBsZXQgcmVnQnVpbGRlckFNID0gbmV3IFJlZ0V4cChyZWdleFN0cmluZy5jbG9ja1RpbWUucmVnZXhleGVjWzNdLCdpZycpO1xuICAgIGlmKHJlZ0J1aWxkZXJQTS50ZXN0KHRva2VuKSkge1xuICAgICAgICBpZihob3VyIDwgMTIpIHtcbiAgICAgICAgICAgIGhvdXIrPTEyO1xuICAgICAgICB9IGVsc2UgaWYoaG91ciA+IDEyICl7XG4gICAgICAgICAgICBlcnJvciArPVwiIHBsZWFzZSBjb3JyZWN0IHRoZSB0aW1lIGJlZm9yZSBQTSAhXCI7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYocmVnQnVpbGRlckFNLnRlc3QodG9rZW4pKXtcbiAgICAgICAgaWYoaG91ciA9PSAxMikge1xuICAgICAgICAgICAgaG91ciA9IDA7XG4gICAgICAgIH0gZWxzZSBpZihob3VyID4gMTIgKXtcbiAgICAgICAgICAgIGVycm9yICs9XCIgcGxlYXNlIGNvcnJlY3QgdGhlIHRpbWUgYmVmb3JlIEFNICFcIjtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ0J1aWxkZXIgPSBuZXcgUmVnRXhwKHJlZ2V4U3RyaW5nLmNsb2NrVGltZS5yZWdleGV4ZWNbNF0sJ2lnJyk7XG4gICAgaWYocmVnQnVpbGRlci50ZXN0KHRva2VuKSkge1xuICAgICAgICBzdHIgPSB0b2tlbi5tYXRjaChyZWdCdWlsZGVyKTtcbiAgICAgICAgaWYoc3RyID09IFwibm9vblwiKSB7XG4gICAgICAgICAgICBob3VyID0gMTI7XG4gICAgICAgICAgICBtaW4gPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaG91ciA9IDA7XG4gICAgICAgICAgICBtaW4gPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVE8gRE86IGNoZWNrZWQ9PlRlc3Q9PT9cbiAgICBsZXQgdG9wRWxlbWVudCA9IHN0YWNrW3N0YWNrLmxlbmd0aC0xXTtcbiAgICBpZih0b3BFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgICAgLy9DaGVjayBpZiBhbHJlYWR5IGEgcmFuZ2UgaXMgZGVmaW5lZFxuICAgICAgICBpZihmbGFncy5pc1JhbmdlRm9ySG91ciA9PSB0cnVlIHx8IGZsYWdzLmlzUmFuZ2VGb3JNaW4gPT0gdHJ1ZSkge1xuICAgICAgICAgICAgZXJyb3IgKz1cIiBhbHJlYWR5IHNldCBmb3IgcmFuZ2UgZXhwcmVzc2lvbnMsIHNlcGVyYXRlIGludG8gdHdvIGNyb25zIVwiO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodG9wRWxlbWVudC5vd25lclN0YXRlID09IFwicmFuZ2VTdGFydFwiKSB7XG4gICAgICAgICAgICB0b3BFbGVtZW50LmhvdXIuc3RhcnQgPSBob3VyO1xuICAgICAgICAgICAgdG9wRWxlbWVudC5taW4uc3RhcnQgPSBtaW47XG4gICAgICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgICAgIHN0YWNrLnB1c2godG9wRWxlbWVudCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmKHRvcEVsZW1lbnQub3duZXJTdGF0ZSA9PSBcInJhbmdlRW5kXCIpIHtcbiAgICAgICAgICAgIGlmKHRvcEVsZW1lbnQuaG91ciA9PSBob3VyKSB7XG4gICAgICAgICAgICAgICAgdG9wRWxlbWVudC5taW4uZW5kID0gbWluO1xuICAgICAgICAgICAgICAgIHJlc3VsdENyb24ubWluID0gdG9wRWxlbWVudC5taW4uc3RhcnQgKyBcIi1cIit0b3BFbGVtZW50Lm1pbi5lbmQ7XG4gICAgICAgICAgICAgICAgLy9mbGFncy5pc1JhbmdlRm9ySG91ciA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvcEVsZW1lbnQuaG91ci5lbmQgPSBob3VyO1xuICAgICAgICAgICAgICAgIHJlc3VsdENyb24uaG91ciA9IHRvcEVsZW1lbnQuaG91ci5zdGFydCArIFwiLVwiK3RvcEVsZW1lbnQuaG91ci5lbmQ7XG4gICAgICAgICAgICAgICAgLy9mbGFncy5pc1JhbmdlRm9yTWluID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgc3RhY2tFbGVtZW50ID0ge1xuICAgICAgICBcIm93bmVyU3RhdGVcIiA6IFwiY2xvY2tUaW1lXCIsXG4gICAgICAgIFwiaG91clwiIDogaG91cixcbiAgICAgICAgXCJtaW5cIiA6IG1pblxuICAgIH07XG4gICAgcmVzdWx0Q3Jvbi5taW4gPSBtaW47XG4gICAgaWYocmVzdWx0Q3Jvbi5ob3VyICE9IFwiKlwiICYmIHJlc3VsdENyb24uaG91ciAhPSBcIlwiKVxuICAgICAgICByZXN1bHRDcm9uLmhvdXIgKz0gXCIsXCIraG91cjtcbiAgICBlbHNlXG4gICAgICAgIHJlc3VsdENyb24uaG91ciA9IGhvdXI7XG4gICAgc3RhY2sucHVzaChzdGFja0VsZW1lbnQpO1xuICAgIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRDbG9ja1RpbWVcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHJlZ2V4U3RyaW5nID0gcmVxdWlyZSgnLi4vbWFwcycpLnJlZ2V4U3RyaW5nO1xudmFyIGZsYWdzID0gcmVxdWlyZSgnLi4vbWFwcycpLmZsYWdzO1xudmFyIHJlc3VsdENyb24gPSByZXF1aXJlKCcuLi9tYXBzJykucmVzdWx0Q3JvbjtcblxuLypnZXREYXkgZnVuY3Rpb24gdG8gcGFyc2UgZGF5cyovXG5mdW5jdGlvbiBnZXREYXkodG9rZW4sc3RhY2ssZXJyb3IpIHtcbiAgICAvLyBUTyBETzogY2hlY2sgZm9yIGdyb3VwXG4gICAgbGV0IHJlZ0J1aWxkZXIgPSBuZXcgUmVnRXhwKHJlZ2V4U3RyaW5nLmRheS5yZWdleGV4ZWNbMF0sXCJpZ1wiKTtcbiAgICBsZXQgdmFsdWUgPSBcIlwiO1xuICAgIC8vIGNoZWNrIGZvciB3b3JkIGRheSxkYXlzXG4gICAgaWYocmVnQnVpbGRlci50ZXN0KHRva2VuKSkge1xuICAgICAgICBsZXQgdG9wRWxlbWVudCA9IHN0YWNrW3N0YWNrLmxlbmd0aC0xXTtcbiAgICAgICAgcmVzdWx0Q3Jvbi5kYXlfb2Zfd2VlayA9IFwiP1wiO1xuICAgICAgICBpZih0b3BFbGVtZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIHRvcEVsZW1lbnQgPSB7XG4gICAgICAgICAgICAgICAgJ2ZyZXF1ZW5jeScgOiBcIipcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmKHRvcEVsZW1lbnQub3duZXJTdGF0ZSA9PSBcImZyZXF1ZW5jeU9ubHlcIikge1xuICAgICAgICAgICAgcmVzdWx0Q3Jvbi5kYXlfb2ZfbW9udGggPSBcIjAvXCIrdG9wRWxlbWVudC5mcmVxdWVuY3k7XG4gICAgICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgfSBlbHNlIGlmKHRvcEVsZW1lbnQub3duZXJTdGF0ZSA9PSBcImZyZXF1ZW5jeVdpdGhcIikge1xuICAgICAgICAgICAgcmVzdWx0Q3Jvbi5kYXlfb2ZfbW9udGggPSBcIlwiK3RvcEVsZW1lbnQuZnJlcXVlbmN5O1xuICAgICAgICAgICAgc3RhY2sucG9wKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRDcm9uLmRheV9vZl9tb250aCA9IFwiKlwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGNoZWNrIGZvciB2YWx1ZXMgb2YgZGF5cyBiZXR3ZWVuIFtNT04tU1VOXVxuICAgIGVsc2Uge1xuICAgICAgICByZWdCdWlsZGVyID0gbmV3IFJlZ0V4cChyZWdleFN0cmluZy5kYXkucmVnZXhleGVjWzFdLFwiaWdcIik7XG4gICAgICAgIGxldCBtYXRjaGVzID0gdG9rZW4ubWF0Y2gocmVnQnVpbGRlcik7XG4gICAgICAgIGlmKG1hdGNoZXMhPW51bGwgJiYgbWF0Y2hlcy5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgcmVzdWx0Q3Jvbi5kYXlfb2Zfd2VlayA9IFwiXCI7XG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxtYXRjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hlc1tpXSA9IG1hdGNoZXNbaV0udG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRPIERPOiBjaGVja1xuICAgICAgICAgICAgbGV0IHRvcEVsZW1lbnQgPSBzdGFja1tzdGFjay5sZW5ndGgtMV07XG4gICAgICAgICAgICBpZihtYXRjaGVzLmxlbmd0aCA9PSAxICYmIHRvcEVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vQ2hlY2sgaWYgYWxyZWFkeSBhIHJhbmdlIGlzIGRlZmluZWRcbiAgICAgICAgICAgICAgICBpZihmbGFncy5pc1JhbmdlRm9yRGF5ID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgKz1cIiBhbHJlYWR5IHNldCBmb3IgcmFuZ2UgZXhwcmVzc2lvbnMsIHNlcGVyYXRlIGludG8gdHdvIGNyb25zIVwiO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgIGlmKHRvcEVsZW1lbnQub3duZXJTdGF0ZSA9PSBcInJhbmdlU3RhcnRcIikge1xuICAgICAgICAgICAgICAgICAgICB0b3BFbGVtZW50LmRheS5zdGFydCA9IG1hdGNoZXNbMF07XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnB1c2godG9wRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0b3BFbGVtZW50Lm93bmVyU3RhdGUgPT0gXCJyYW5nZUVuZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcEVsZW1lbnQuZGF5LmVuZCA9IG1hdGNoZXNbMF07XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdENyb24uZGF5X29mX3dlZWsgPSB0b3BFbGVtZW50LmRheS5zdGFydCArIFwiLVwiK3RvcEVsZW1lbnQuZGF5LmVuZDtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Q3Jvbi5kYXlfb2ZfbW9udGggPSBcIj9cIjtcbiAgICAgICAgICAgICAgICAgICAgLy9mbGFncy5pc1JhbmdlRm9yRGF5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYobWF0Y2hlcy5pbmNsdWRlcygnTU9OJykgJiYgIXJlc3VsdENyb24uZGF5X29mX3dlZWsuaW5jbHVkZXMoJ01PTicpKVxuICAgICAgICAgICAgICAgIHJlc3VsdENyb24uZGF5X29mX3dlZWsgKz0gXCJNT04sXCI7XG4gICAgICAgICAgICBpZihtYXRjaGVzLmluY2x1ZGVzKCdUVUUnKSAmJiAhcmVzdWx0Q3Jvbi5kYXlfb2Zfd2Vlay5pbmNsdWRlcygnVFVFJykpXG4gICAgICAgICAgICAgICAgcmVzdWx0Q3Jvbi5kYXlfb2Zfd2VlayArPSBcIlRVRSxcIjtcbiAgICAgICAgICAgIGlmKG1hdGNoZXMuaW5jbHVkZXMoJ1dFRCcpICYmICFyZXN1bHRDcm9uLmRheV9vZl93ZWVrLmluY2x1ZGVzKCdXRUQnKSlcbiAgICAgICAgICAgICAgICByZXN1bHRDcm9uLmRheV9vZl93ZWVrICs9IFwiV0VELFwiO1xuICAgICAgICAgICAgaWYobWF0Y2hlcy5pbmNsdWRlcygnVEhVJykgJiYgIXJlc3VsdENyb24uZGF5X29mX3dlZWsuaW5jbHVkZXMoJ1RIVScpKVxuICAgICAgICAgICAgICAgIHJlc3VsdENyb24uZGF5X29mX3dlZWsgKz0gXCJUSFUsXCI7XG4gICAgICAgICAgICBpZihtYXRjaGVzLmluY2x1ZGVzKCdGUkknKSAmJiAhcmVzdWx0Q3Jvbi5kYXlfb2Zfd2Vlay5pbmNsdWRlcygnRlJJJykpXG4gICAgICAgICAgICAgICAgcmVzdWx0Q3Jvbi5kYXlfb2Zfd2VlayArPSBcIkZSSSxcIjtcbiAgICAgICAgICAgIGlmKG1hdGNoZXMuaW5jbHVkZXMoJ1NBVCcpICYmICFyZXN1bHRDcm9uLmRheV9vZl93ZWVrLmluY2x1ZGVzKCdTQVQnKSlcbiAgICAgICAgICAgICAgICByZXN1bHRDcm9uLmRheV9vZl93ZWVrICs9IFwiU0FULFwiO1xuICAgICAgICAgICAgaWYobWF0Y2hlcy5pbmNsdWRlcygnU1VOJykgJiYgIXJlc3VsdENyb24uZGF5X29mX3dlZWsuaW5jbHVkZXMoJ1NVTicpKVxuICAgICAgICAgICAgICAgIHJlc3VsdENyb24uZGF5X29mX3dlZWsgKz0gXCJTVU4sXCI7XG4gICAgICAgICAgICBpZihtYXRjaGVzLmluY2x1ZGVzKCdXRUVLRU5EJykgJiYgIXJlc3VsdENyb24uZGF5X29mX3dlZWsuaW5jbHVkZXMoJ1NBVCcpKVxuICAgICAgICAgICAgICAgIHJlc3VsdENyb24uZGF5X29mX3dlZWsgKz0gXCJTQVQsXCI7XG4gICAgICAgICAgICBpZihtYXRjaGVzLmluY2x1ZGVzKCdXRUVLRU5EJykgJiYgIXJlc3VsdENyb24uZGF5X29mX3dlZWsuaW5jbHVkZXMoJ1NVTicpKVxuICAgICAgICAgICAgICAgIHJlc3VsdENyb24uZGF5X29mX3dlZWsgKz0gXCJTVU4sXCI7XG4gICAgICAgICAgICAvLyByZW1vdmVkIGV4dHJhIGNvbW1hXG4gICAgICAgICAgICByZXN1bHRDcm9uLmRheV9vZl93ZWVrID0gcmVzdWx0Q3Jvbi5kYXlfb2Zfd2Vlay5zbGljZSgwLC0xKTtcbiAgICAgICAgICAgIHJlc3VsdENyb24uZGF5X29mX21vbnRoID0gXCI/XCI7XG4gICAgICAgICAgICB2YWx1ZSA9IFwiXCIrcmVzdWx0Q3Jvbi5kYXlfb2Zfd2VlaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRPIERPOiBwcm92aWRlIGluIGZ1dHVyZS4gYnV0IGZvciBOT1cgIGVycm9yXG4gICAgICAgICAgICBlcnJvciArPVwiIEluIHVucmVzb2x2ZWQgc3RhdGUgYXQgMjtEYXkgIVwiO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBzdGFja0VsZW1lbnQgPSB7XG4gICAgICAgIFwib3duZXJTdGF0ZVwiIDogXCJkYXlcIixcbiAgICAgICAgXCJkYXlfb2Zfd2Vla1wiIDogcmVzdWx0Q3Jvbi5kYXlfb2Zfd2VlayxcbiAgICAgICAgXCJkYXlfb2ZfbW9udGhcIiA6IHJlc3VsdENyb24uZGF5X29mX21vbnRoXG4gICAgfTtcbiAgICBzdGFjay5wdXNoKHN0YWNrRWxlbWVudCk7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldERheVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgcmVnZXhTdHJpbmcgPSByZXF1aXJlKCcuLi9tYXBzJykucmVnZXhTdHJpbmc7XG52YXIgZmxhZ3MgPSByZXF1aXJlKCcuLi9tYXBzJykuZmxhZ3M7XG52YXIgcmVzdWx0Q3JvbiA9IHJlcXVpcmUoJy4uL21hcHMnKS5yZXN1bHRDcm9uO1xuXG5cbi8qZnJlcXVlbmN5T25seSBmdW5jdGlvbiB0byBwYXJzZSBhbmQgc3RvcmUgZnJlcXVlbmN5IHZhbHVlIHdpdGhvdXQgbnRoKi9cbmZ1bmN0aW9uIGdldEZyZXF1ZW5jeU9ubHkodG9rZW4sc3RhY2ssZXJyb3IpIHtcbiAgICBsZXQgZnJlcSA9IHBhcnNlSW50KHRva2VuKTtcbiAgICBpZihpc05hTih0b2tlbikpIHtcbiAgICAgICAgZXJyb3IgKz1cIiB0b2tlbiBpcyBub3QgbnVtYmVyIGluIGZyZXF1ZW5jeSBvbmx5ICFcIjtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZihzdGFjay5sZW5ndGggPiAwICYmIHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdLm93bmVyU3RhdGU9PVwicmFuZ2VFbmRcIikge1xuICAgICAgICBsZXQgdG9wRWxlbWVudCA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgdG9wRWxlbWVudC5mcmVxdWVuY3kuZW5kID0gZnJlcTtcbiAgICAgICAgc3RhY2sucHVzaCh0b3BFbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYoc3RhY2subGVuZ3RoID4gMCAmJiBzdGFja1tzdGFjay5sZW5ndGggLSAxXS5vd25lclN0YXRlPT1cInJhbmdlU3RhcnRcIikge1xuICAgICAgICBsZXQgdG9wRWxlbWVudCA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgdG9wRWxlbWVudC5mcmVxdWVuY3kuc3RhcnQgPSBmcmVxO1xuICAgICAgICBzdGFjay5wdXNoKHRvcEVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IHN0YWNrRWxlbWVudCA9IHtcbiAgICAgICAgXCJvd25lclN0YXRlXCIgOiBcImZyZXF1ZW5jeU9ubHlcIixcbiAgICAgICAgXCJmcmVxdWVuY3lcIiA6IGZyZXFcbiAgICB9O1xuICAgIHN0YWNrLnB1c2goc3RhY2tFbGVtZW50KTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuLypmcmVxdWVuY3lXaXRoIGZ1bmN0aW9uIHRvIHBhcnNlIGFuZCBzdG9yZSBmcmVxdWVuY3kgdmFsdWUgd2l0aCBudGgqL1xuZnVuY3Rpb24gZ2V0RnJlcXVlbmN5V2l0aCh0b2tlbixzdGFjayxlcnJvcikge1xuICAgIC8vIFRPIERPOiBjaGVjayBmb3IgZ3JvdXBcbiAgICBsZXQgcmVnQnVpbGRlciA9IG5ldyBSZWdFeHAocmVnZXhTdHJpbmcuZnJlcXVlbmN5T25seS5yZWdleGV4ZWMsXCJpZ1wiKTtcbiAgICBsZXQgZnJlcSA9IHJlZ0J1aWxkZXIuZXhlYyh0b2tlbik7XG4gICAgbGV0IHZhbHVlID0gcGFyc2VJbnQoZnJlcSk7XG4gICAgaWYoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgIGVycm9yICs9XCIgdG9rZW4gaXMgbm90IG51bWJlciBpbiBmcmVxdWVuY3kgd2l0aCAhXCI7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYoc3RhY2subGVuZ3RoIT0wICYmIHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdLm93bmVyU3RhdGU9PVwicmFuZ2VFbmRcIikge1xuICAgICAgICBsZXQgdG9wRWxlbWVudCA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgdG9wRWxlbWVudC5mcmVxdWVuY3kuZW5kID0gXCJcIit2YWx1ZTtcbiAgICAgICAgc3RhY2sucHVzaCh0b3BFbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYoc3RhY2subGVuZ3RoID4gMCAmJiBzdGFja1tzdGFjay5sZW5ndGggLSAxXS5vd25lclN0YXRlPT1cInJhbmdlU3RhcnRcIikge1xuICAgICAgICBsZXQgdG9wRWxlbWVudCA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgdG9wRWxlbWVudC5mcmVxdWVuY3kuc3RhcnQgPSBcIlwiK3ZhbHVlO1xuICAgICAgICBzdGFjay5wdXNoKHRvcEVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IHN0YWNrRWxlbWVudCA9IHtcbiAgICAgICAgXCJvd25lclN0YXRlXCIgOiBcImZyZXF1ZW5jeVdpdGhcIixcbiAgICAgICAgXCJmcmVxdWVuY3lcIiA6IHZhbHVlXG4gICAgfTtcbiAgICBzdGFjay5wdXNoKHN0YWNrRWxlbWVudCk7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0RnJlcXVlbmN5T25seSxcbiAgICBnZXRGcmVxdWVuY3lXaXRoXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCByZWdleFN0cmluZyA9IHJlcXVpcmUoJy4uL21hcHMnKS5yZWdleFN0cmluZztcbnZhciBmbGFncyA9IHJlcXVpcmUoJy4uL21hcHMnKS5mbGFncztcbnZhciByZXN1bHRDcm9uID0gcmVxdWlyZSgnLi4vbWFwcycpLnJlc3VsdENyb247XG5cbi8qZ2V0SG91ciBmdW5jdGlvbiB0byBwYXJzZSBIb3VycyovXG5mdW5jdGlvbiBnZXRIb3VyKHRva2VuLHN0YWNrLGVycm9yKSB7XG4gICAgLy8gVE8gRE86IGNoZWNrIGZvciBncm91cFxuICAgIGxldCByZWdCdWlsZGVyID0gbmV3IFJlZ0V4cChyZWdleFN0cmluZy5ob3VyLnJlZ2V4ZXhlY1swXSxcImlnXCIpO1xuICAgIGxldCB2YWx1ZTtcbiAgICAvLyBjaGVjayBmb3Igd29yZCBob3Vyc1xuICAgIGlmKHJlZ0J1aWxkZXIudGVzdCh0b2tlbikpIHtcbiAgICAgICAgbGV0IHRvcEVsZW1lbnQgPSBzdGFja1tzdGFjay5sZW5ndGgtMV07XG4gICAgICAgIGlmKHRvcEVsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdG9wRWxlbWVudCA9IHtcbiAgICAgICAgICAgICAgICAnZnJlcXVlbmN5JyA6IFwiKlwiXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYodG9wRWxlbWVudC5vd25lclN0YXRlID09IFwiZnJlcXVlbmN5T25seVwiKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRvcEVsZW1lbnQuZnJlcXVlbmN5O1xuICAgICAgICAgICAgcmVzdWx0Q3Jvbi5ob3VyID0gXCIwL1wiK3RvcEVsZW1lbnQuZnJlcXVlbmN5O1xuICAgICAgICAgICAgc3RhY2sucG9wKCk7XG4gICAgICAgIH0gZWxzZSBpZih0b3BFbGVtZW50Lm93bmVyU3RhdGUgPT0gXCJmcmVxdWVuY3lXaXRoXCIpIHtcbiAgICAgICAgICAgIC8vaG91ciBhbHJlYWR5IHNldFxuICAgICAgICAgICAgaWYocmVzdWx0Q3Jvbi5ob3VyICE9IFwiKlwiICYmIHJlc3VsdENyb24uaG91ciAhPSBcIlwiKVxuICAgICAgICAgICAgICAgIHJlc3VsdENyb24uaG91ciArPSBcIixcIit0b3BFbGVtZW50LmZyZXF1ZW5jeTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXN1bHRDcm9uLmhvdXIgPSBcIlwiK3RvcEVsZW1lbnQuZnJlcXVlbmN5O1xuICAgICAgICAgICAgdmFsdWUgPSByZXN1bHRDcm9uLmhvdXI7XG4gICAgICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKGZsYWdzLmlzUmFuZ2VGb3JIb3VyID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBlcnJvciArPVwiIGFscmVhZHkgc2V0IGZvciByYW5nZSBleHByZXNzaW9ucywgc2VwZXJhdGUgaW50byB0d28gY3JvbnMhXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZih0b3BFbGVtZW50Lm93bmVyU3RhdGUgPT0gXCJyYW5nZVN0YXJ0XCIpIHtcbiAgICAgICAgICAgICAgICB0b3BFbGVtZW50LmhvdXIuc3RhcnQgPSB0b3BFbGVtZW50LmZyZXF1ZW5jeS5zdGFydDtcbiAgICAgICAgICAgICAgICB0b3BFbGVtZW50LmZyZXF1ZW5jeS5zdGFydCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgc3RhY2sucG9wKCk7XG4gICAgICAgICAgICAgICAgc3RhY2sucHVzaCh0b3BFbGVtZW50KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0b3BFbGVtZW50Lm93bmVyU3RhdGUgPT0gXCJyYW5nZUVuZFwiKSB7XG4gICAgICAgICAgICAgICAgc3RhY2sucG9wKCk7XG4gICAgICAgICAgICAgICAgdG9wRWxlbWVudC5ob3VyLnN0YXJ0ID0gdG9wRWxlbWVudC5mcmVxdWVuY3kuc3RhcnQ7XG4gICAgICAgICAgICAgICAgdG9wRWxlbWVudC5ob3VyLmVuZCA9IHRvcEVsZW1lbnQuZnJlcXVlbmN5LmVuZDtcbiAgICAgICAgICAgICAgICB0b3BFbGVtZW50LmZyZXF1ZW5jeS5lbmQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIHJlc3VsdENyb24uaG91ciA9IHRvcEVsZW1lbnQuaG91ci5zdGFydCArIFwiLVwiK3RvcEVsZW1lbnQuaG91ci5lbmQ7XG4gICAgICAgICAgICAgICAgLy9mbGFncy5pc1JhbmdlRm9ySG91ciA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHN0YWNrRWxlbWVudCA9IHtcbiAgICAgICAgXCJvd25lclN0YXRlXCIgOiBcImhvdXJcIixcbiAgICAgICAgXCJob3VyXCIgOiB2YWx1ZVxuICAgIH07XG4gICAgc3RhY2sucHVzaChzdGFja0VsZW1lbnQpO1xuICAgIHJldHVybiB0cnVlO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldEhvdXJcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHJlZ2V4U3RyaW5nID0gcmVxdWlyZSgnLi4vbWFwcycpLnJlZ2V4U3RyaW5nO1xudmFyIGZsYWdzID0gcmVxdWlyZSgnLi4vbWFwcycpLmZsYWdzO1xudmFyIHJlc3VsdENyb24gPSByZXF1aXJlKCcuLi9tYXBzJykucmVzdWx0Q3JvbjtcblxuLypnZXRNaW51dGUgZnVuY3Rpb24gdG8gcGFyc2UgbWludXRlcyovXG5mdW5jdGlvbiBnZXRNaW51dGUodG9rZW4sc3RhY2ssZXJyb3IpIHtcbiAgICAvLyBUTyBETzogY2hlY2sgZm9yIGdyb3VwXG4gICAgbGV0IHJlZ0J1aWxkZXIgPSBuZXcgUmVnRXhwKHJlZ2V4U3RyaW5nLm1pbnV0ZS5yZWdleGV4ZWNbMF0sXCJpZ1wiKTtcbiAgICBsZXQgdmFsdWU7XG4gICAgLy8gY2hlY2sgZm9yIHdvcmQgbWludXRlLG1pbnV0ZXNcbiAgICBpZihyZWdCdWlsZGVyLnRlc3QodG9rZW4pKSB7XG4gICAgICAgIGxldCB0b3BFbGVtZW50ID0gc3RhY2tbc3RhY2subGVuZ3RoLTFdO1xuICAgICAgICBpZih0b3BFbGVtZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIHRvcEVsZW1lbnQgPSB7XG4gICAgICAgICAgICAgICAgJ2ZyZXF1ZW5jeScgOiBcIipcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmKHRvcEVsZW1lbnQub3duZXJTdGF0ZSA9PSBcImZyZXF1ZW5jeU9ubHlcIikge1xuICAgICAgICAgICAgdmFsdWUgPSB0b3BFbGVtZW50LmZyZXF1ZW5jeTtcbiAgICAgICAgICAgIHJlc3VsdENyb24ubWluID0gXCIwL1wiK3RvcEVsZW1lbnQuZnJlcXVlbmN5O1xuICAgICAgICAgICAgc3RhY2sucG9wKCk7XG4gICAgICAgIH0gZWxzZSBpZih0b3BFbGVtZW50Lm93bmVyU3RhdGUgPT0gXCJmcmVxdWVuY3lXaXRoXCIpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdG9wRWxlbWVudC5mcmVxdWVuY3k7XG4gICAgICAgICAgICByZXN1bHRDcm9uLm1pbiA9IFwiXCIrdG9wRWxlbWVudC5mcmVxdWVuY3k7XG4gICAgICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKGZsYWdzLmlzUmFuZ2VGb3JNaW51dGUgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGVycm9yICs9XCIgYWxyZWFkeSBzZXQgZm9yIHJhbmdlIGV4cHJlc3Npb25zLCBzZXBlcmF0ZSBpbnRvIHR3byBjcm9ucyFcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHRvcEVsZW1lbnQub3duZXJTdGF0ZSA9PSBcInJhbmdlU3RhcnRcIikge1xuICAgICAgICAgICAgICAgIHRvcEVsZW1lbnQubWluLnN0YXJ0ID0gdG9wRWxlbWVudC5mcmVxdWVuY3kuc3RhcnQ7XG4gICAgICAgICAgICAgICAgdG9wRWxlbWVudC5mcmVxdWVuY3kuc3RhcnQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIHN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgIHN0YWNrLnB1c2godG9wRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYodG9wRWxlbWVudC5vd25lclN0YXRlID09IFwicmFuZ2VFbmRcIikge1xuICAgICAgICAgICAgICAgIHN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgIHRvcEVsZW1lbnQubWluLnN0YXJ0ID0gdG9wRWxlbWVudC5mcmVxdWVuY3kuc3RhcnQ7XG4gICAgICAgICAgICAgICAgdG9wRWxlbWVudC5taW4uZW5kID0gdG9wRWxlbWVudC5mcmVxdWVuY3kuZW5kO1xuICAgICAgICAgICAgICAgIHRvcEVsZW1lbnQuZnJlcXVlbmN5LmVuZCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgcmVzdWx0Q3Jvbi5taW4gPSB0b3BFbGVtZW50Lm1pbi5zdGFydCArIFwiLVwiK3RvcEVsZW1lbnQubWluLmVuZDtcbiAgICAgICAgICAgICAgICAvL2ZsYWdzLmlzUmFuZ2VGb3JNaW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBzdGFja0VsZW1lbnQgPSB7XG4gICAgICAgIFwib3duZXJTdGF0ZVwiIDogXCJtaW51dGVcIixcbiAgICAgICAgXCJtaW5cIiA6IHZhbHVlXG4gICAgfTtcbiAgICBzdGFjay5wdXNoKHN0YWNrRWxlbWVudCk7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0TWludXRlXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCByZWdleFN0cmluZyA9IHJlcXVpcmUoJy4uL21hcHMnKS5yZWdleFN0cmluZztcbnZhciBmbGFncyA9IHJlcXVpcmUoJy4uL21hcHMnKS5mbGFncztcbnZhciByZXN1bHRDcm9uID0gcmVxdWlyZSgnLi4vbWFwcycpLnJlc3VsdENyb247XG5cbi8qZ2V0TW9udGggZnVuY3Rpb24gdG8gcGFyc2UgbW9udGhzKi9cbmZ1bmN0aW9uIGdldE1vbnRoKHRva2VuLHN0YWNrLGVycm9yKSB7XG4gICAgLy8gVE8gRE86IGNoZWNrIGZvciBncm91cFxuICAgIGxldCByZWdCdWlsZGVyID0gbmV3IFJlZ0V4cChyZWdleFN0cmluZy5tb250aC5yZWdleGV4ZWNbMF0sXCJpZ1wiKTtcbiAgICBsZXQgdmFsdWUgPSBcIlwiO1xuICAgIC8vIGNoZWNrIGZvciB3b3JkIG1vbnRoLG1vbnRoc1xuICAgIGlmKHJlZ0J1aWxkZXIudGVzdCh0b2tlbikpIHtcbiAgICAgICAgbGV0IHRvcEVsZW1lbnQgPSBzdGFja1tzdGFjay5sZW5ndGgtMV07XG4gICAgICAgIGlmKHRvcEVsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdG9wRWxlbWVudCA9IHtcbiAgICAgICAgICAgICAgICAnZnJlcXVlbmN5JyA6IFwiKlwiXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmKHRvcEVsZW1lbnQub3duZXJTdGF0ZSA9PSBcImZyZXF1ZW5jeU9ubHlcIikge1xuICAgICAgICAgICAgcmVzdWx0Q3Jvbi5tb250aCA9IFwiMC9cIit0b3BFbGVtZW50LmZyZXF1ZW5jeTtcbiAgICAgICAgICAgIHN0YWNrLnBvcCgpO1xuICAgICAgICB9IGVsc2UgaWYodG9wRWxlbWVudC5vd25lclN0YXRlID09IFwiZnJlcXVlbmN5V2l0aFwiKSB7XG4gICAgICAgICAgICByZXN1bHRDcm9uLm1vbnRoID0gXCJcIit0b3BFbGVtZW50LmZyZXF1ZW5jeTtcbiAgICAgICAgICAgIHN0YWNrLnBvcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0Q3Jvbi5tb250aCA9IFwiKlwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGNoZWNrIGZvciB2YWx1ZXMgb2YgbW9udGhzIGJldHdlZW4gW0pBTi1ERUNdXG4gICAgZWxzZSB7XG4gICAgICAgIC8vIFRPIERPOiBjaGVjayBmb3IgZ3JvdXBcbiAgICAgICAgcmVnQnVpbGRlciA9IG5ldyBSZWdFeHAocmVnZXhTdHJpbmcubW9udGgucmVnZXhleGVjWzFdLFwiaWdcIik7XG4gICAgICAgIGxldCBtYXRjaGVzID0gdG9rZW4ubWF0Y2gocmVnQnVpbGRlcik7XG4gICAgICAgIGlmKG1hdGNoZXMhPW51bGwgJiYgbWF0Y2hlcy5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgcmVzdWx0Q3Jvbi5tb250aCA9IFwiXCI7XG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxtYXRjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hlc1tpXSA9IG1hdGNoZXNbaV0udG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRPIERPOiBjaGVja1xuICAgICAgICAgICAgbGV0IHRvcEVsZW1lbnQgPSBzdGFja1tzdGFjay5sZW5ndGgtMV07XG5cbiAgICAgICAgICAgIGlmKG1hdGNoZXMubGVuZ3RoID09IDEgJiYgdG9wRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy9DaGVjayBpZiBhbHJlYWR5IGEgcmFuZ2UgaXMgZGVmaW5lZFxuICAgICAgICAgICAgICAgIGlmKGZsYWdzLmlzUmFuZ2VGb3JNb250aCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yICs9XCIgYWxyZWFkeSBzZXQgZm9yIHJhbmdlIGV4cHJlc3Npb25zLCBzZXBlcmF0ZSBpbnRvIHR3byBjcm9ucyFcIjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgICAgICAgICBpZih0b3BFbGVtZW50Lm93bmVyU3RhdGUgPT0gXCJmcmVxdWVuY3lPbmx5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Q3Jvbi5kYXlfb2ZfbW9udGggPSB0b3BFbGVtZW50LmZyZXF1ZW5jeTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYodG9wRWxlbWVudC5vd25lclN0YXRlID09IFwiZnJlcXVlbmN5V2l0aFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdENyb24uZGF5X29mX21vbnRoID0gdG9wRWxlbWVudC5mcmVxdWVuY3k7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRvcEVsZW1lbnQub3duZXJTdGF0ZSA9PSBcInJhbmdlU3RhcnRcIikge1xuICAgICAgICAgICAgICAgICAgICB0b3BFbGVtZW50Lm1vbnRoLnN0YXJ0ID0gbWF0Y2hlc1swXTtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sucHVzaCh0b3BFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRvcEVsZW1lbnQub3duZXJTdGF0ZSA9PSBcInJhbmdlRW5kXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodG9wRWxlbWVudC5mcmVxdWVuY3kuZW5kICE9IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdENyb24uZGF5X29mX3dlZWsgPSBcIj9cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdENyb24uZGF5X29mX21vbnRoID0gdG9wRWxlbWVudC5mcmVxdWVuY3kuc3RhcnQgKyBcIi1cIiArIHRvcEVsZW1lbnQuZnJlcXVlbmN5LmVuZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0b3BFbGVtZW50Lm1vbnRoLmVuZCA9IG1hdGNoZXNbMF07XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdENyb24ubW9udGggPSB0b3BFbGVtZW50Lm1vbnRoLnN0YXJ0ICsgXCItXCIrdG9wRWxlbWVudC5tb250aC5lbmQ7XG4gICAgICAgICAgICAgICAgICAgIC8vZmxhZ3MuaXNSYW5nZUZvck1vbnRoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYobWF0Y2hlcy5pbmNsdWRlcygnSkFOJykgJiYgIXJlc3VsdENyb24ubW9udGguaW5jbHVkZXMoJ0pBTicpKVxuICAgICAgICAgICAgICAgIHJlc3VsdENyb24ubW9udGggKz0gXCJKQU4sXCI7XG4gICAgICAgICAgICBpZihtYXRjaGVzLmluY2x1ZGVzKCdGRUInKSAmJiAhcmVzdWx0Q3Jvbi5tb250aC5pbmNsdWRlcygnRkVCJykpXG4gICAgICAgICAgICAgICAgcmVzdWx0Q3Jvbi5tb250aCArPSBcIkZFQixcIjtcbiAgICAgICAgICAgIGlmKG1hdGNoZXMuaW5jbHVkZXMoJ01BUicpICYmICFyZXN1bHRDcm9uLm1vbnRoLmluY2x1ZGVzKCdNQVInKSlcbiAgICAgICAgICAgICAgICByZXN1bHRDcm9uLm1vbnRoICs9IFwiTUFSLFwiO1xuICAgICAgICAgICAgaWYobWF0Y2hlcy5pbmNsdWRlcygnQVBSJykgJiYgIXJlc3VsdENyb24ubW9udGguaW5jbHVkZXMoJ0FQUicpKVxuICAgICAgICAgICAgICAgIHJlc3VsdENyb24ubW9udGggKz0gXCJBUFIsXCI7XG4gICAgICAgICAgICBpZihtYXRjaGVzLmluY2x1ZGVzKCdNQVknKSAmJiAhcmVzdWx0Q3Jvbi5tb250aC5pbmNsdWRlcygnTUFZJykpXG4gICAgICAgICAgICAgICAgcmVzdWx0Q3Jvbi5tb250aCArPSBcIk1BWSxcIjtcbiAgICAgICAgICAgIGlmKG1hdGNoZXMuaW5jbHVkZXMoJ0pVTicpICYmICFyZXN1bHRDcm9uLm1vbnRoLmluY2x1ZGVzKCdKVU4nKSlcbiAgICAgICAgICAgICAgICByZXN1bHRDcm9uLm1vbnRoICs9IFwiSlVOLFwiO1xuICAgICAgICAgICAgaWYobWF0Y2hlcy5pbmNsdWRlcygnSlVMJykgJiYgIXJlc3VsdENyb24ubW9udGguaW5jbHVkZXMoJ0pVTCcpKVxuICAgICAgICAgICAgICAgIHJlc3VsdENyb24ubW9udGggKz0gXCJKVUwsXCI7XG4gICAgICAgICAgICBpZihtYXRjaGVzLmluY2x1ZGVzKCdBVUcnKSAmJiAhcmVzdWx0Q3Jvbi5tb250aC5pbmNsdWRlcygnQVVHJykpXG4gICAgICAgICAgICAgICAgcmVzdWx0Q3Jvbi5tb250aCArPSBcIkFVRyxcIjtcbiAgICAgICAgICAgIGlmKG1hdGNoZXMuaW5jbHVkZXMoJ1NFUFQnKSAmJiAhcmVzdWx0Q3Jvbi5tb250aC5pbmNsdWRlcygnU0VQVCcpKVxuICAgICAgICAgICAgICAgIHJlc3VsdENyb24ubW9udGggKz0gXCJTRVBULFwiO1xuICAgICAgICAgICAgaWYobWF0Y2hlcy5pbmNsdWRlcygnT0NUJykgJiYgIXJlc3VsdENyb24ubW9udGguaW5jbHVkZXMoJ09DVCcpKVxuICAgICAgICAgICAgICAgIHJlc3VsdENyb24ubW9udGggKz0gXCJPQ1QsXCI7XG4gICAgICAgICAgICBpZihtYXRjaGVzLmluY2x1ZGVzKCdOT1YnKSAmJiAhcmVzdWx0Q3Jvbi5tb250aC5pbmNsdWRlcygnTk9WJykpXG4gICAgICAgICAgICAgICAgcmVzdWx0Q3Jvbi5tb250aCArPSBcIk5PVixcIjtcbiAgICAgICAgICAgIGlmKG1hdGNoZXMuaW5jbHVkZXMoJ0RFQycpICYmICFyZXN1bHRDcm9uLm1vbnRoLmluY2x1ZGVzKCdERUMnKSlcbiAgICAgICAgICAgICAgICByZXN1bHRDcm9uLm1vbnRoICs9IFwiREVDLFwiO1xuICAgICAgICAgICAgLy8gcmVtb3ZlZCBleHRyYSBjb21tYVxuICAgICAgICAgICAgcmVzdWx0Q3Jvbi5tb250aCA9IHJlc3VsdENyb24ubW9udGguc2xpY2UoMCwtMSk7XG4gICAgICAgICAgICB2YWx1ZSA9IFwiXCIrcmVzdWx0Q3Jvbi5tb250aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRPIERPOiBwcm92aWRlIGluIGZ1dHVyZS4gYnV0IGZvciBOT1cgIGVycm9yXG4gICAgICAgICAgICBlcnJvciArPVwiIEluIHVucmVzb2x2ZWQgc3RhdGUgYXQgMjtNb250aCAhXCI7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHN0YWNrRWxlbWVudCA9IHtcbiAgICAgICAgXCJvd25lclN0YXRlXCIgOiBcIm1vbnRoXCIsXG4gICAgICAgIFwibW9udGhcIiA6IHJlc3VsdENyb24ubW9udGgsXG4gICAgfTtcbiAgICBzdGFjay5wdXNoKHN0YWNrRWxlbWVudCk7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0TW9udGhcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHJlZ2V4U3RyaW5nID0gcmVxdWlyZSgnLi4vbWFwcycpLnJlZ2V4U3RyaW5nO1xudmFyIGZsYWdzID0gcmVxdWlyZSgnLi4vbWFwcycpLmZsYWdzO1xudmFyIHJlc3VsdENyb24gPSByZXF1aXJlKCcuLi9tYXBzJykucmVzdWx0Q3JvbjtcblxuXG4vKnJhbmdlU3RhcnRTdGF0ZSBmdW5jdGlvbiBmb3IgcmFuZ2UgaW5wdXQqL1xuZnVuY3Rpb24gcmFuZ2VTdGFydFN0YXRlKHRva2VuLHN0YWNrLGVycm9yKSB7XG4gICAgaWYoZmxhZ3MuaXNSYW5nZUZvckRheSB8fCBmbGFncy5pc1JhbmdlRm9yTWluIHx8IGZsYWdzLmlzUmFuZ2VGb3JNb250aCB8fCBmbGFncy5pc1JhbmdlRm9yWWVhciB8fCBmbGFncy5pc1JhbmdlRm9ySG91cikge1xuICAgICAgICBlcnJvciArPVwiIGFscmVhZHkgcmFuZ2UgZXhwcmVzc2lvbnMgIVwiO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBzdGFja0VsZW1lbnQgPSB7XG4gICAgICAgIFwib3duZXJTdGF0ZVwiIDogXCJyYW5nZVN0YXJ0XCIsXG4gICAgICAgIFwibWluXCI6IHtcbiAgICAgICAgICAgIFwic3RhcnRcIiA6IFwiXCIsXG4gICAgICAgICAgICBcImVuZFwiIDogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBcImhvdXJcIiA6IHtcbiAgICAgICAgICAgIFwic3RhcnRcIiA6IFwiXCIsXG4gICAgICAgICAgICBcImVuZFwiIDogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBcImRheVwiIDoge1xuICAgICAgICAgICAgXCJzdGFydFwiIDogXCJcIixcbiAgICAgICAgICAgIFwiZW5kXCIgOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIFwibW9udGhcIiA6IHtcbiAgICAgICAgICAgIFwic3RhcnRcIiA6IFwiXCIsXG4gICAgICAgICAgICBcImVuZFwiIDogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBcInllYXJcIiA6IHtcbiAgICAgICAgICAgIFwic3RhcnRcIiA6IFwiXCIsXG4gICAgICAgICAgICBcImVuZFwiIDogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBcImZyZXF1ZW5jeVwiIDoge1xuICAgICAgICAgICAgXCJzdGFydFwiIDogXCJcIixcbiAgICAgICAgICAgIFwiZW5kXCIgOiBcIlwiXG4gICAgICAgIH1cbiAgICB9O1xuICAgIHN0YWNrLnB1c2goc3RhY2tFbGVtZW50KTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuLypyYW5nZUVuZFN0YXRlIGZ1bmN0aW9uIGZvciByYW5nZSBpbnB1dCovXG5mdW5jdGlvbiByYW5nZUVuZFN0YXRlKHRva2VuLHN0YWNrLGVycm9yKSB7XG4gICAgbGV0IHN0YWNrRWxlbWVudCA9IHtcbiAgICAgICAgXCJvd25lclN0YXRlXCIgOiBcInJhbmdlRW5kXCIsXG4gICAgICAgIFwibWluXCI6IHtcbiAgICAgICAgICAgIFwic3RhcnRcIiA6IFwiXCIsXG4gICAgICAgICAgICBcImVuZFwiIDogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBcImhvdXJcIiA6IHtcbiAgICAgICAgICAgIFwic3RhcnRcIiA6IFwiXCIsXG4gICAgICAgICAgICBcImVuZFwiIDogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBcImRheVwiIDoge1xuICAgICAgICAgICAgXCJzdGFydFwiIDogXCJcIixcbiAgICAgICAgICAgIFwiZW5kXCIgOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIFwibW9udGhcIiA6IHtcbiAgICAgICAgICAgIFwic3RhcnRcIiA6IFwiXCIsXG4gICAgICAgICAgICBcImVuZFwiIDogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBcInllYXJcIiA6IHtcbiAgICAgICAgICAgIFwic3RhcnRcIiA6IFwiXCIsXG4gICAgICAgICAgICBcImVuZFwiIDogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBcImZyZXF1ZW5jeVwiIDoge1xuICAgICAgICAgICAgXCJzdGFydFwiIDogXCJcIixcbiAgICAgICAgICAgIFwiZW5kXCIgOiBcIlwiXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxldCB0b3BFbGVtZW50ID0gc3RhY2tbc3RhY2subGVuZ3RoLTFdO1xuICAgIGlmKHRvcEVsZW1lbnQhPW51bGwpIHtcbiAgICAgICAgc3dpdGNoKHRvcEVsZW1lbnQub3duZXJTdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBcImZyZXF1ZW5jeVdpdGhcIiA6XG4gICAgICAgICAgICBjYXNlIFwiZnJlcXVlbmN5T25seVwiIDpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgICAgICAgICBzdGFja0VsZW1lbnQuZnJlcXVlbmN5LnN0YXJ0ID0gdG9wRWxlbWVudC5mcmVxdWVuY3k7XG4gICAgICAgICAgICAgICAgc3RhY2tFbGVtZW50Lm93bmVyU3RhdGUgPSBcInJhbmdlRW5kXCI7XG4gICAgICAgICAgICAgICAgc3RhY2sucHVzaChzdGFja0VsZW1lbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjbG9ja1RpbWVcIiA6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhY2sucG9wKCk7XG4gICAgICAgICAgICAgICAgc3RhY2tFbGVtZW50LmhvdXIuc3RhcnQgPSB0b3BFbGVtZW50LmhvdXI7XG4gICAgICAgICAgICAgICAgc3RhY2tFbGVtZW50Lm1pbi5zdGFydCA9IHRvcEVsZW1lbnQubWluO1xuICAgICAgICAgICAgICAgIHN0YWNrRWxlbWVudC5vd25lclN0YXRlID0gXCJyYW5nZUVuZFwiO1xuICAgICAgICAgICAgICAgIHN0YWNrLnB1c2goc3RhY2tFbGVtZW50KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicmFuZ2VTdGFydFwiIDpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgICAgICAgICB0b3BFbGVtZW50Lm93bmVyU3RhdGUgPSBcInJhbmdlRW5kXCI7XG4gICAgICAgICAgICAgICAgc3RhY2sucHVzaCh0b3BFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm1vbnRoXCIgOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgIHN0YWNrRWxlbWVudC5vd25lclN0YXRlID0gXCJyYW5nZUVuZFwiO1xuICAgICAgICAgICAgICAgIHN0YWNrRWxlbWVudC5tb250aC5zdGFydCA9IHRvcEVsZW1lbnQubW9udGg7XG4gICAgICAgICAgICAgICAgc3RhY2sucHVzaChzdGFja0VsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibWludXRlXCIgOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgIHN0YWNrRWxlbWVudC5vd25lclN0YXRlID0gXCJyYW5nZUVuZFwiO1xuICAgICAgICAgICAgICAgIHN0YWNrRWxlbWVudC5mcmVxdWVuY3kuc3RhcnQgPSBzdGFja0VsZW1lbnQubWluLnN0YXJ0ID0gdG9wRWxlbWVudC5taW47XG4gICAgICAgICAgICAgICAgc3RhY2sucHVzaChzdGFja0VsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiaG91clwiIDpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgICAgICAgICBzdGFja0VsZW1lbnQub3duZXJTdGF0ZSA9IFwicmFuZ2VFbmRcIjtcbiAgICAgICAgICAgICAgICBzdGFja0VsZW1lbnQuZnJlcXVlbmN5LnN0YXJ0ID0gc3RhY2tFbGVtZW50LmhvdXIuc3RhcnQgPSB0b3BFbGVtZW50LmhvdXI7XG4gICAgICAgICAgICAgICAgc3RhY2sucHVzaChzdGFja0VsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZGF5XCIgOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgIHN0YWNrRWxlbWVudC5vd25lclN0YXRlID0gXCJyYW5nZUVuZFwiO1xuICAgICAgICAgICAgICAgIHN0YWNrRWxlbWVudC5kYXkuc3RhcnQgPSB0b3BFbGVtZW50LmRheV9vZl93ZWVrO1xuICAgICAgICAgICAgICAgIHN0YWNrLnB1c2goc3RhY2tFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInllYXJcIiA6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhY2sucG9wKCk7XG4gICAgICAgICAgICAgICAgc3RhY2tFbGVtZW50Lm93bmVyU3RhdGUgPSBcInJhbmdlRW5kXCI7XG4gICAgICAgICAgICAgICAgc3RhY2tFbGVtZW50LnllYXIuc3RhcnQgPSB0b3BFbGVtZW50LnllYXI7XG4gICAgICAgICAgICAgICAgc3RhY2sucHVzaChzdGFja0VsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcmFuZ2VTdGFydFN0YXRlLFxuICAgIHJhbmdlRW5kU3RhdGVcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHJlZ2V4U3RyaW5nID0gcmVxdWlyZSgnLi4vbWFwcycpLnJlZ2V4U3RyaW5nO1xudmFyIGZsYWdzID0gcmVxdWlyZSgnLi4vbWFwcycpLmZsYWdzO1xudmFyIHJlc3VsdENyb24gPSByZXF1aXJlKCcuLi9tYXBzJykucmVzdWx0Q3JvbjtcblxuXG4vKmdldFllYXIgZnVuY3Rpb24gdG8gcGFyc2UgeWVhciovXG5mdW5jdGlvbiBnZXRZZWFyKHRva2VuLHN0YWNrLGVycm9yKSB7XG4gICAgLy8gVE8gRE86IGNoZWNrIGZvciBncm91cFxuICAgIGxldCByZWdCdWlsZGVyID0gbmV3IFJlZ0V4cChyZWdleFN0cmluZy55ZWFyLnJlZ2V4ZXhlY1swXSxcImlnXCIpO1xuICAgIGxldCB2YWx1ZSA9IFwiXCI7XG4gICAgLy8gY2hlY2sgZm9yIHdvcmQgeWVhcix5ZWFyc1xuICAgIGlmKHJlZ0J1aWxkZXIudGVzdCh0b2tlbikpIHtcbiAgICAgICAgbGV0IHRvcEVsZW1lbnQgPSBzdGFja1tzdGFjay5sZW5ndGgtMV07XG4gICAgICAgIHJlc3VsdENyb24ueWVhciA9IFwiP1wiO1xuICAgICAgICBpZih0b3BFbGVtZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIHRvcEVsZW1lbnQgPSB7XG4gICAgICAgICAgICAgICAgJ2ZyZXF1ZW5jeScgOiBcIipcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmKHRvcEVsZW1lbnQub3duZXJTdGF0ZSA9PSBcImZyZXF1ZW5jeU9ubHlcIikge1xuICAgICAgICAgICAgcmVzdWx0Q3Jvbi55ZWFyID0gXCIwL1wiK3RvcEVsZW1lbnQuZnJlcXVlbmN5O1xuICAgICAgICAgICAgc3RhY2sucG9wKCk7XG4gICAgICAgIH0gZWxzZSBpZih0b3BFbGVtZW50Lm93bmVyU3RhdGUgPT0gXCJmcmVxdWVuY3lXaXRoXCIpIHtcbiAgICAgICAgICAgIHJlc3VsdENyb24ueWVhciA9IFwiXCIrdG9wRWxlbWVudC5mcmVxdWVuY3k7XG4gICAgICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdENyb24ueWVhciA9IFwiKlwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGNoZWNrIGZvciB2YWx1ZXMgb2YgeWVhcnNcbiAgICBlbHNlIHtcbiAgICAgICAgcmVnQnVpbGRlciA9IG5ldyBSZWdFeHAocmVnZXhTdHJpbmcueWVhci5yZWdleGV4ZWNbMV0sXCJpZ1wiKTtcbiAgICAgICAgbGV0IHJlZ0J1aWxkZXIyID0gbmV3IFJlZ0V4cChyZWdleFN0cmluZy55ZWFyLnJlZ2V4ZXhlY1syXSxcImlnXCIpXG4gICAgICAgIGxldCBtYXRjaGVzID0gdG9rZW4ubWF0Y2gocmVnQnVpbGRlcik7XG4gICAgICAgIGxldCBleGFjdE1hdGNoZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPG1hdGNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKHJlZ0J1aWxkZXIyLnRlc3QobWF0Y2hlc1tpXSkpIHtcbiAgICAgICAgICAgICAgICBleGFjdE1hdGNoZXMuYWRkKG1hdGNoZXNbaV0ubWF0Y2gocmVnQnVpbGRlcjIpWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBUTyBETzogY2hlY2tcbiAgICAgICAgbGV0IHRvcEVsZW1lbnQgPSBzdGFja1tzdGFjay5sZW5ndGgtMV07XG4gICAgICAgIGlmKGV4YWN0TWF0Y2hlcy5zaXplID09IDEgJiYgdG9wRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAvL0NoZWNrIGlmIGFscmVhZHkgYSByYW5nZSBpcyBkZWZpbmVkXG4gICAgICAgICAgICBpZihmbGFncy5pc1JhbmdlRm9yWWVhciA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgKz1cIiBDYW5ub3QgaGFuZGxlIG11bHRpcGxlIHJhbmdlIGV4cHJlc3Npb25zLCBzZXBlcmF0ZSBpbnRvIHR3byBjcm9ucyFcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRvcEVsZW1lbnQub3duZXJTdGF0ZSA9PSBcInJhbmdlU3RhcnRcIikge1xuICAgICAgICAgICAgICAgIHRvcEVsZW1lbnQueWVhci5zdGFydCA9IEFycmF5LmZyb20oZXhhY3RNYXRjaGVzKVswXTtcbiAgICAgICAgICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgICAgICAgICBzdGFjay5wdXNoKHRvcEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHRvcEVsZW1lbnQub3duZXJTdGF0ZSA9PSBcInJhbmdlRW5kXCIpIHtcbiAgICAgICAgICAgICAgICB0b3BFbGVtZW50LnllYXIuZW5kID0gQXJyYXkuZnJvbShleGFjdE1hdGNoZXMpWzBdO1xuICAgICAgICAgICAgICAgIHN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgIHJlc3VsdENyb24ueWVhciA9IHRvcEVsZW1lbnQueWVhci5zdGFydCArIFwiLVwiK3RvcEVsZW1lbnQueWVhci5lbmQ7XG4gICAgICAgICAgICAgICAgLy9mbGFncy5pc1JhbmdlRm9yWWVhciA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZXhhY3RNYXRjaGVzLnNpemUgIT0gMCkge1xuICAgICAgICAgICAgcmVzdWx0Q3Jvbi55ZWFyID0gXCJcIjtcbiAgICAgICAgICAgIGV4YWN0TWF0Y2hlcy5mb3JFYWNoKGZ1bmN0aW9uKHlyKXtcbiAgICAgICAgICAgICAgICByZXN1bHRDcm9uLnllYXIgKz0geXIrXCIsXCI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIHJlbW92ZWQgZXh0cmEgY29tbWFcbiAgICAgICAgICAgIHJlc3VsdENyb24ueWVhciA9IHJlc3VsdENyb24ueWVhci5zbGljZSgwLC0xKTtcbiAgICAgICAgICAgIHZhbHVlID0gXCJcIityZXN1bHRDcm9uLnllYXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUTyBETzogcHJvdmlkZSBpbiBmdXR1cmUuIGJ1dCBmb3IgTk9XICBlcnJvclxuICAgICAgICAgICAgZXJyb3IgKz1cIiBJbiB1bnJlc29sdmVkIHN0YXRlIGF0IDI7eWVhciAhXCI7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHN0YWNrRWxlbWVudCA9IHtcbiAgICAgICAgXCJvd25lclN0YXRlXCIgOiBcInllYXJcIixcbiAgICAgICAgXCJ5ZWFyXCIgOiByZXN1bHRDcm9uLnllYXJcbiAgICB9O1xuICAgIHN0YWNrLnB1c2goc3RhY2tFbGVtZW50KTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0WWVhclxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgcmVnZXhTdHJpbmcgPSByZXF1aXJlKCcuL21hcHMnKS5yZWdleFN0cmluZztcbnZhciBmbGFncyA9IHJlcXVpcmUoJy4vbWFwcycpLmZsYWdzO1xudmFyIHJlc3VsdENyb24gPSByZXF1aXJlKCcuL21hcHMnKS5yZXN1bHRDcm9uO1xuLy90b2tlbml6ZUlucHV0IGZ1bmN0aW9uIHRvIHNlcGVyYXRlIG91dCBhbGwgdG9rZW5zXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHRva2VuaXplSW5wdXQgOiBmdW5jdGlvbihpbnB1dFN0cmluZyl7XG4gICAgICAgIGxldCByZWdCdWlsZGVyID0gbmV3IFJlZ0V4cChyZWdleFN0cmluZy50b2tlbmlzaW5nLnJlZ2V4ZXhlYyxcImlnXCIpO1xuICAgICAgICBsZXQgbWF0Y2hlcyA9IGlucHV0U3RyaW5nLm1hdGNoKHJlZ0J1aWxkZXIpO1xuICAgICAgICBpZihtYXRjaGVzID09IG51bGwgfHwgbWF0Y2hlcy5sZW5ndGggPT0gMCApIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGk9MDtpPG1hdGNoZXMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgbWF0Y2hlc1tpXSA9IChtYXRjaGVzW2ldK1wiXCIpLnRyaW0oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF0Y2hlcztcbiAgICB9XG59O1xuIl19
