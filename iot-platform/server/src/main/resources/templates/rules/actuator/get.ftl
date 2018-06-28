<#include "../../common/header.ftl">
<body>
<#include "../../common/navbar.ftl"/>
<#include "../../common/chatbot.ftl"/>
<div class="container-fluid" id="container-main">
<#include "../../common/sidenavbar.ftl"/>
    <main role="main" class="main col-sm-9 ml-sm-auto col-md-10 pt-3 pb-5">
        <h2 class="pt-2">Settings</h2>
        <hr/>
        <div class="row pb-3 pt-3">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        Actuator Setting
                    </div>
                    <div class="card-body p-0">
                        <table class="table mb-0">
                            <thead>
                            <tr>
                                <th>Attribute Desired State</th>
                                <th>NewValue</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    {{actuator.attribute}}
                                </td>
                                <td>
                                    {{actuator.newValue}}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                <#--<div class="card-footer">-->
                <#--<button type="button" v-on:click="editSns" class="float-right btn btn-sm btn-primary">EDIT</button>-->
                <#--</div>-->
                </div>
            </div>
        </div>
    </main>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js"></script>
<script src="/static/js/app.js"></script>
<script>
    var token = $.cookie("authorization");
    var actuatorId = ${actuator.id};
    <#--var parentId = ${thing.id};-->
    var app = new Vue({
        el: '#container-main',
        data: {
            actuator: {},
            saveLoader: false
        },
        methods: {
            load: function () {
                var that = this;
                $.ajax({
                    'url': '/actuator/get/' + actuatorId,
                    'success': function (data) {
                        that.actuator = data;
                    }
                });
            }
        },
        mounted: function () {
            this.load();
        }
    });
</script>
</body>
</html>
