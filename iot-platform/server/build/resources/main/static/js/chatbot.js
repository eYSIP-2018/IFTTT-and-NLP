var msgerForm = get(".msger-inputarea");
var msgerInput = get(".msger-input");
var msgerChat = get(".msger-chat");

var BOT_IMG = "/static/img/eYantra_logo.png";
var PERSON_IMG = "/static/img/user_icon.svg";
var BOT_NAME = "eYantra IOT";
var PERSON_NAME = "user_name";
var WELCOME_MSG = " Welcome to eYantra IOT Smart Assistant!\
                    I can do alot of tasks from adding new devices,\
                    things & units to Getting the temperature from\
                    the sensor in your lab.\
                    Here are some quick suggestions to go...";
var WELCOME_SUGGESTIONS = ["add thing","delete unit","list things"];

msgerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  document.getElementById("audioButton").disabled = false;
  if(typeof recognition != 'undefined') {
      recognition.stop();
  }

  var msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";
  document.getElementById("suggestions").style.display = "none";
  botResponse(msgText);
});

function addSuggestion(msgText) {
    appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
    document.getElementById("suggestions").style.display = "none";
    botResponse(msgText);
}

function appendMessage(name, img, side, text) {
  var msgHTML = "\n    <div class=\"msg " + side + "-msg\">\n      <div class=\"msg-img\" style=\"background-image: url(" + img + ")\"></div>\n\n      <div class=\"msg-bubble\">\n        <div class=\"msg-text\">" + text + "</div>\n      </div>\n    </div>\n  ";
  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function appendSpinner(img, side) {
    var msgHTML = "\n    <div id=\"tempSpinner\" class=\"msg " + side + "-msg\">\n      <div class=\"msg-img\" style=\"background-image: url(" + img + ")\"></div>\n\n      <div class=\"msg-bubble\">\n        <div class=\"msg-text\">" + '<i class="fa fa-spinner fa-pulse fa-fw"></i>' + "</div>\n      </div>\n    </div>\n  ";
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
}

function removeSpinner() {
    let element = document.getElementById('tempSpinner');
    element.parentNode.removeChild(element);
}

function botResponse(msgText) {
    //add temporary loading spinner
    appendSpinner(BOT_IMG, 'left');

    $.ajax({
        type: 'POST',
        url: "/eyiot",
        data: JSON.stringify({'str':msgText}),
        dataType: "text",
        contentType:"application/json; charset=utf-8",
        headers: {
            "Authorization":"Basic grtrthj45h45h4j5h4kj5k45hjk4kh5j",
            "My-Second-Header":"second value"
        },
        success: function(data){
            //remove temporary spinner
            removeSpinner();

            let speechText = "";
            data = JSON.parse(data);
            data = data.response;
            if(data.hasOwnProperty("webhookPayload") && data.webhookPayload.hasOwnProperty('google')) {
                data = data.webhookPayload;
                let msg = "";
                console.log(JSON.stringify(data));
                for(let i=0;i<data.google.richResponse.items.length;i++) {
                    msg += data.google.richResponse.items[i].simpleResponse.textToSpeech;
                    if(i < data.google.richResponse.items.length-1)
                        msg += "<br/>";
                    if(i==0)
                        speechText = data.google.richResponse.items[i].simpleResponse.textToSpeech;
                }
                appendMessage(BOT_NAME, BOT_IMG, "left", msg);

                if(data.google.hasOwnProperty("systemIntent")) {
                    msg = "";
                    for(let i=0;i<data.google.systemIntent.data.listSelect.items.length;i++) {
                        msg += "<strong>"+data.google.systemIntent.data.listSelect.items[i].title+"</strong>";
                        if(data.google.systemIntent.data.listSelect.items[i].hasOwnProperty('description'))
                            msg += "<br/>"+data.google.systemIntent.data.listSelect.items[i].description;
                        if(i < data.google.systemIntent.data.listSelect.items.length-1)
                            msg += "<hr/>";
                    }
                    appendMessage(BOT_NAME, BOT_IMG, "left", msg);
                }

                document.getElementById("suggestions").style.display = "none";
                //Add suggestion chips
                if(data.google.richResponse.hasOwnProperty("suggestions")) {
                    let suggestionChips = "";
                    for(let i=0;i<data.google.richResponse.suggestions.length;i++) {
                        suggestionChips += '<span class="msger-suggestion-chip" onclick="addSuggestion(\''+data.google.richResponse.suggestions[i].title+'\')">'+data.google.richResponse.suggestions[i].title+'</span>';
                    }
                    document.getElementById("suggestions").innerHTML = suggestionChips;
                    if(suggestionChips == "")
                        document.getElementById("suggestions").style.display = "none";
                    else
                        document.getElementById("suggestions").style.display = "block";
                }
            }
            else {
                appendMessage(BOT_NAME, BOT_IMG, "left", data.fulfillmentText);
                document.getElementById("suggestions").style.display = "none";
                speechText = data.fulfillmentText;
            }
            if ('speechSynthesis' in window) {
                let msg = new SpeechSynthesisUtterance(speechText);
                msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.lang == "hi-IN"; })[0];
                window.speechSynthesis.speak(msg);
            }
        }
    });
}

function get(selector) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  return root.querySelector(selector);
}

function formatDate(date) {
  var h = "0" + date.getHours();
  var m = "0" + date.getMinutes();

  return h.slice(-2) + ":" + m.slice(-2);
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function showHide() {
    var chatbotPanel = document.getElementById("chatbotPanel");
    var chatbot = document.getElementById("chatbot");
    if(chatbotPanel.style.display == "none")
    {
        chatbot.style.display = "none";
        chatbotPanel.style.display = "flex";
    }
    else
    {
        chatbot.style.display = "block";
        chatbotPanel.style.display = "none";
    }
}

function startRecording() {
    //var webkitSpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    if (!webkitSpeechRecognition) {
        alert("Please upgrade your browser to support speech to text");
    }
    else {
        var recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = function() {
            document.getElementById("audioButton").disabled = true;
        };

        recognition.onresult = function(event) {
            var interim_transcript = '';

            for(let i=event.resultIndex; i<event.results.length; i++) {
                if(event.results[i].isFinal) {
                  final_transcript += event.results[i][0].transcript;
                }
            }
            msgerInput.value = final_transcript;
        };

        recognition.onerror = function(event) {
            alert("Oops! Something went wrong!");
            document.getElementById("audioButton").disabled = false;
        };

        recognition.onend = function() {
            document.getElementById("audioButton").disabled = false;
            var msgText = msgerInput.value;
            if (!msgText) return;

            appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
            msgerInput.value = "";
            document.getElementById("suggestions").style.display = "none";
            botResponse(msgText);
        };

        final_transcript = '';
        recognition.lang = 'en-US';
        recognition.start();
    }
}

//Initialization of bot
window.onload = function() {
    appendMessage(BOT_NAME, BOT_IMG, "left", WELCOME_MSG);
    let suggestionChips = "";
    for(let i=0;i<WELCOME_SUGGESTIONS.length;i++) {
        suggestionChips += '<span class="msger-suggestion-chip" onclick="addSuggestion(\''+WELCOME_SUGGESTIONS[i]+'\')">'+WELCOME_SUGGESTIONS[i]+'</span>';
    }
    document.getElementById("suggestions").innerHTML = suggestionChips;
    if(suggestionChips == "")
        document.getElementById("suggestions").style.display = "none";
    else
        document.getElementById("suggestions").style.display = "block";
};
