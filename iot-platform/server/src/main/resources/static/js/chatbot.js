var msgerForm = get(".msger-inputarea");
var msgerInput = get(".msger-input");
var msgerChat = get(".msger-chat");

var BOT_MSGS = ["Hi, how are you?", "Ohh... I can't understand what you trying to say. Sorry!", "I like to play games... But I don't know how to play!", "Sorry if my answers are not relevant. :))", "I feel sleepy! :("];
var BOT_IMG = "/static/img/eYantra_logo.png";
var PERSON_IMG = "/static/img/user_icon.svg";
var BOT_NAME = "eYantra IOT";
var PERSON_NAME = "user_name";

msgerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";

  botResponse(msgText);
});

function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  var msgHTML = "\n    <div class=\"msg " + side + "-msg\">\n      <div class=\"msg-img\" style=\"background-image: url(" + img + ")\"></div>\n\n      <div class=\"msg-bubble\">\n        <div class=\"msg-text\">" + text + "</div>\n      </div>\n    </div>\n  ";

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponse(msgText) {
    $.ajax({
        type: 'POST',
        url: "/eyiot",
        data: JSON.stringify({'str':msgText}),
        contentType:"application/json; charset=utf-8",
        headers: {
            "Authorization":"Basic grtrthj45h45h4j5h4kj5k45hjk4kh5j",
            "My-Second-Header":"second value"
        },
        success: function(data){
            var res = JSON.parse(data['response']);
            if(res.payload.hasOwnProperty('google'))
                appendMessage(BOT_NAME, BOT_IMG, "left", JSON.stringify(res.payload.google));
            if(res.hasOwnProperty('fulfillmentText'))
                appendMessage(BOT_NAME, BOT_IMG, "left", res.fulfillmentText);
        }
    });
}

// Utils
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
