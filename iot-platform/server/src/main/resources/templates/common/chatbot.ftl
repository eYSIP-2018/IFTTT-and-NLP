<div id="chatbot" style="z-index:9999;width:100px;position:fixed;right:100px;bottom:0;"><img style="cursor:pointer;" onclick="showHide();" src="/static/img/eYantraChatBot.gif"/></div>
<section id="chatbotPanel" class="msger col-md-3" style="display:none;z-index:9999;padding:0;position:fixed;right:0;bottom:0;">
    <link rel="stylesheet" href="/static/css/chatbot.css">
    <header onclick="showHide();" style="cursor:pointer;" class="msger-header">
        <div class="msger-header-title">
            <strong> &nbsp;<i class="fa fa-angle-down" aria-hidden="true"></i> &nbsp;eYantra IOT</strong>
        </div>
    </header>
    <main class="msger-chat">
    </main>
    <div id="suggestions" class="msger-suggestions">
    </div>
    <form class="msger-inputarea">
        <input id="inputBox" type="text" class="msger-input" placeholder="Enter your message...">
        <button id="audioButton" class="audio-button" type="button" onclick="startRecording();"><i class="fa fa-microphone" aria-hidden="true"></i></button>
        <button type="submit" class="msger-send-btn"><strong><i class="fa fa-paper-plane" aria-hidden="true"></i></strong></button>
    </form>
    <script  src="/static/js/chatbot.js"></script>
</section>
