<#include "./common/header.ftl">
<body>
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

<#include "./common/navbar.ftl"/>
<div class="container-fluid" id="container-main">
<#if user??>
    <#include "./common/sidenavbar.ftl"/>
</#if>
    <main role="main" class="main col-sm-9 ml-sm-auto col-md-10 pt-3 pb-5">
    <#if user??>
        <div class="row">
            <#if !units?has_content>
                <div class="alert alert-info">
                    You do not have any Units assigned. Please talk to your administrator.
                </div>
            </#if>
            <#list units as unit>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">${unit.unitName}</div>
                        <div class="card-body">
                            <img height=150 src="<#if (unit.photo)??>${unit.photo}<#else>http://via.placeholder.com/300</#if>" class="float-left p-1">
                            <#if (unit.description)??><p>${unit.description}</p></#if>
                            <div class="clear"></div>
                        </div>
                        <div class="card-footer">
                            <a class="btn btn-primary btn-sm" href="/units/get/${unit.id}"><i class="fa fa-cog"></i>MANAGE</a>
                        </div>
                    </div>
                </div>
            </#list>
        </div>
    <#else>

    </#if>
    </main>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js"></script>
<script src="/static/js/app.js"></script>
</body>
</html>
