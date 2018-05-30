<div id="chatbot" style="width:100px;position:fixed;right:100px;bottom:0;"><img style="cursor:pointer;" onclick="showHide();" src="/static/img/eYantraChatBot.gif"/></div>
<section id="chatbotPanel" class="msger col-md-3" style="display:none;z-index:9999;padding:0;position:fixed;right:0;bottom:0;">
    <link rel="stylesheet" href="/static/css/chatbot.css">
    <header onclick="showHide();" style="cursor:pointer;" class="msger-header">
        <div class="msger-header-title">
            <strong> &nbsp;<i class="fa fa-angle-down" aria-hidden="true"></i> &nbsp;eYantra IOT</strong>
        </div>
    </header>
    <main class="msger-chat">
        <div class="msg left-msg">
            <div class="msg-img" style="background-image: url(/static/img/eYantra_logo.png)"></div>
            <div class="msg-bubble">
                <div class="msg-text">
                    Welcome to eYantra IOT!
                </div>
            </div>
        </div>
    </main>
    <form class="msger-inputarea">
        <input type="text" class="msger-input" placeholder="Enter your message...">
        <button type="submit" class="msger-send-btn"><strong><i class="fa fa-paper-plane" aria-hidden="true"></i></strong></button>
    </form>
    <script  src="/static/js/chatbot.js"></script>
</section>
