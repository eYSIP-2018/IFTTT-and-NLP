<#include "../common/header.ftl">
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

<#include "../common/navbar.ftl"/>
<div class="container-fluid" id="container-main">
<#include "../common/sidenavbar.ftl"/>
    <main role="main" class="main col-sm-9 ml-sm-auto col-md-10 pt-3 pb-5">
        <form class="user-info-form">
            <div class="form-group">

                <input type="hidden" class="form-control" id="inputUserId" value="${user.id}" >
            </div>

            <div class="form-group">
                <label for="inputEmail4">User Name:</label>
                <input type="text" name="name" class="form-control" id="inputUsername" value="${user.name}" required="">
            </div>

            <div class="form-group">
                <label for="comment">E-mail:</label>
                <input type="email" name="email" class="form-control" id="userEmail" value="${user.email}" required="">
            </div>

            <div class="form-group">
                <label for="inputAddress">Password:</label>
                <input type="password" name="password" class="form-control" id="userPassword" value="${user.password}" required="">
            </div>

            <button type="button" class="btn btn-primary" id="userUpdate"><i class="fa fa-pencil" aria-hidden="true"></i>Update</button>
        </form>
    </main>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js"></script>
<script src="/static/js/app.js"></script>
<script>
    $(document).ready(function(){
        $("#userUpdate").on("click",function(){
            var userId = $("#inputUserId").val();
            var username = $("#inputUsername").val();
            var userEmail = $("#userEmail").val();
            var userPassword = $("#userPassword").val();

            //debugger;

            $.ajax({
                type: 'POST',
                url: '/user/update/' + userId,
                data: $('.user-info-form').serialize(),
                // data: JSON.stringify({name:username,email:userEmail,password:userPassword}),
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                dataType: 'json',
                success: function(data) {

                    if(!data.id) {
                        alert("User info not updated! Verify your fields and try again.");
                    }
                    else alert("User info updated");
                },
            });
        })
    });
</script>
</body>
</html>
