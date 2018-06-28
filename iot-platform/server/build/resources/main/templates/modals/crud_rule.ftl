<div id='create_rule' class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"><span v-if="ruleUpdate">Edit Rule</span>
                    <span v-else>Create Rule</span>
                    <img src="/static/img/ajax-loader.gif" v-if="saveLoader"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label>Name</label>
                                <input v-bind:readOnly="ruleUpdate" type="text" name="name" class="form-control" v-model='createRule.name'
                                       placeholder="temperature_rule">
                                <small class="text-muted">Name of the rule will be prefixed with &lt;thing-id&gt;_&lt;rule-type&gt;</small>
                            </div>
                            <div class="form-group"  >
                                <label>Data</label>
                                <input value="*" name="data" type="text" class="form-control" v-model='createRule.data'
                                       placeholder="e.g. * or state.reported.deviceXX.XX, ...">
                            </div>
                            <div>
                                <label>If...</label>
                                <div class="form-group row col-md-12" style="margin-right:0; margin-left:0; padding:0;">
                                    <input id="ruleCondition" name="condition" type="text" class="col-md-10 form-control" style="border-top-right-radius:0;border-bottom-right-radius:0;" v-model='createRule.condition'
                                           placeholder="e.g. where state.reported.deviceXX.XX > 50">
                                    <input id="ruleIfXml" type="hidden" v-model='createRule.ruleIfXml'>
                                   <button class="col-md-2 btn btn-secondary" style="border-top-left-radius:0;border-bottom-left-radius:0;" onclick="return showRuleIfModal(event);" v-if="ruleUpdate"><i class="fa fa-puzzle-piece" aria-hidden="true"></i></button>
                                   <button class="col-md-2 btn btn-secondary" style="border-top-left-radius:0;border-bottom-left-radius:0;" onclick="return showRuleIfModal(event);" v-else><i class="fa fa-puzzle-piece" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label>Description</label>
                                <input name="description" type="text" class="form-control"
                                       v-model='createRule.description'
                                       placeholder="Rule to send notifications via SMS">
                                <small class="text-muted">&nbsp;</small>
                            </div>
                            <div class="form-group" v-show="ruleUpdate == false">
                                <label for="comment">Then...</label>
                                <div class="form-group row col-md-12" style="margin-right:0; margin-left:0; padding:0;">
                                    <select id="ruleThen" class="col-md-10 form-control combo-box" id="rightRoles" style="border-top-right-radius:0;border-bottom-right-radius:0;" v-model='createRule.action'>
                                        <option v-for="action in ruleActionList" v-bind:value="action">{{action}}
                                        </option>
                                    </select>
                                   <button class="col-md-2 btn btn-secondary" style="border-top-left-radius:0;border-bottom-left-radius:0;" onclick="return showRuleThenModal(event);"><i class="fa fa-puzzle-piece" aria-hidden="true"></i></button>
                                </div>
                            </div>
                            <span style="display:none;">
                                <div class="form-group">
                                    <label>SNS Topic</label>
                                    <input id="topic" name="topic" type="text" class="form-control"
                                           v-model='createRule.sns_topic'
                                           placeholder="my_subscription_topic">
                                </div>
                                <div class="form-group">
                                    <label for="subject">Subject</label>
                                    <input id="subject" class="form-control" type="text" v-model="createRule.subject"
                                           placeholder="temperature is high">
                                </div>
                                <div class="form-group">
                                    <label for="message">Message</label>
                                    <textarea class="form-control" id="message" v-model="createRule.message"
                                              rows="2"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="interval">Interval(in minutes)</label>
                                    <input id="interval" type="number" class="form-control" v-model="createRule.interval"
                                           placeholder="20">
                                </div>
                            </span>
                            <span style="display:none;">
                                <div class="form-group">
                                    <label>Attribute</label>
                                    <input id="attribute" name="attribute" type="text" class="form-control"
                                           v-model='createRule.attribute'
                                           placeholder="desired.device##.##">
                                </div>
                                <div class="form-group">
                                    <label for="subject">New Value</label>
                                    <input id="newValue" class="form-control" type="text" v-model="createRule.newValue"
                                           placeholder="0/1">
                                </div>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button v-if="ruleUpdate" type="button" class="btn btn-primary save" v-on:click="updateRule"><i
                        class="fa fa-floppy-o" aria-hidden="true"></i>Save
                </button>
                <button v-else type="button" class="btn btn-primary save" v-on:click="saveRule"><i
                        class="fa fa-floppy-o" aria-hidden="true"></i>Save
                </button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fa fa-times"
                                                                                        aria-hidden="true"></i>Close
                </button>
            </div>
        </div>
    </div>
</div>
