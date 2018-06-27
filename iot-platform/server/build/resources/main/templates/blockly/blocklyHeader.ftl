<script src="/static/js/blockly/blockly_compressed.js"></script>
<script src="/static/js/blockly/generators/javascript.js"></script>
<script src="/static/js/blockly/blocks_compressed.js"></script>
<script src="/static/js/blockly/msg/js/en.js"></script>
<script src="/static/js/blockly/blocks/AllBlocksJS.js"></script>
<script src="/static/js/blockly/generators/javascript/AllBlocksGenerator.js"></script>

<link rel="stylesheet" href="/static/css/blocklyModals.css">

<script>
    var blocklyRuleIfInitialized = false;
    var blocklyRuleThenInitialized = false;
    var blocklyCronInitialized = false;
    var workspaceCron = null;
    var workspaceRuleIf = null;
    var workspaceRuleThen = null;

    $(document).ready(function(){
        document.getElementById('ruleIfXml').innerHTML = '<xml id="toolboxRuleIf" style="display: none">\
            <block type="condition"></block>\
            <block type="expression"></block>\
            <block type="device_details"></block>\
            <block type="value"></block>\
            <block type="logic"></block>\
        </xml>';

        document.getElementById('ruleThenXml').innerHTML = '<xml id="toolboxRuleThen" style="display: none">\
            <block type="then"></block>\
            <block type="sns"></block>\
            <block type="ddb"></block>\
            <block type="assignment"></block>\
            <block type="unit"></block>\
            <block type="thing"></block>\
            <block type="value"></block>\
        </xml>';

        document.getElementById('cronXml').innerHTML = '<xml id="toolboxCron" style="display: none">\
            <block type="cron"></block>\
            <block type="assignment"></block>\
            <block type="cron_details"></block>\
            <block type="value"></block>\
        </xml>';
    });

    function showRuleIfModal(e) {
        e.preventDefault();
        $('#rule_if').modal('show');
        addBlocklyRuleIf();
        return false;
    };

    function addBlocklyRuleIf() {
        if(blocklyRuleIfInitialized)
            return false;


        $.ajax({
            url: "/blockly/getJson",
            dataType: "text",
            success: function(data) {
                startBlocklyRuleIf(data);
            }
        });

        function startBlocklyRuleIf(data) {
            blocklyRuleIfInitialized = true;
            data = JSON.parse(data);

            let thingName = document.getElementById('thingId').innerHTML;
            thingName += ','+document.getElementById('thingName').innerHTML;

            var allDevices = data.thingsJson[thingName].devices;
            var devicesJson = data.devicesJson;

            var optionsRuleIf = {
                toolbox : toolboxRuleIf,
                collapse : true,
                comments : false,
                disable : false,
                maxBlocks : Infinity,
                trashcan : true,
                horizontalLayout : false,
                toolboxPosition : 'start',
                css : true,
                media : 'https://blockly-demo.appspot.com/static/media/',
                rtl : false,
                scrollbars : true,
                sounds : true,
                oneBasedIndex : true,
                zoom : {
                    controls : true,
                    wheel : true,
                    startScale : 1,
                    maxScale : 3,
                    minScale : 0.3,
                    scaleSpeed : 1.2
                }
            };

            /* Inject IF workspace */
            workspaceRuleIf = Blockly.inject("blocklyDivRuleIf", optionsRuleIf);
            workspaceRuleIf.addChangeListener(actionEventListener);

            function actionEventListener(actionEvent) {
                let allBlocks = workspaceRuleIf.getAllBlocks();
                if(actionEvent.type == "create") {
                    let block = workspaceRuleIf.getBlockById(actionEvent.blockId);
                    if(block.type == "device_details") {
                        let dropdown = block.getField("devices");
                        dropdown.menuGenerator_ = allDevices;
                        dropdown.setText(allDevices[0][0]);
                        dropdown.setValue(allDevices[0][1]);
                        block.getField("attributes").menuGenerator_ = devicesJson[allDevices[0][1]].attributes;
                        block.getField("attributes").setText("");
                        block.getField("attributes").setValue("");
                    }
                }
                else if(actionEvent.type == "change") {
                    let block = workspaceRuleIf.getBlockById(actionEvent.blockId);
                    if(block.type == "device_details" && actionEvent.name == "devices") {
                        let deviceName = block.getFieldValue("devices");
                        block.getField("attributes").menuGenerator_ = devicesJson[deviceName].attributes;
                        block.getField("attributes").setText("");
                        block.getField("attributes").setValue("");
                    }
                }
            }
        }
    }

    function showRuleThenModal(e) {
        e.preventDefault();
        $('#rule_then').modal('show');
        addBlocklyRuleThen();
        return false;
    };

    function addBlocklyRuleThen() {
        if(blocklyRuleThenInitialized)
            return false;

        $.ajax({
            url: "/blockly/getJson",
            dataType: "text",
            success: function(data) {
                startBlocklyRuleThen(data);
            }
        });

        function startBlocklyRuleThen(data) {
            blocklyRuleThenInitialized = true;
            data = JSON.parse(data);

            var allUnits = data.allUnits;
            var unitsJson = data.unitsJson;
            var thingsJson = data.thingsJson;
            var devicesJson = data.devicesJson;

            var optionsRuleThen = {
                toolbox : toolboxRuleThen,
                collapse : true,
                comments : false,
                disable : false,
                maxBlocks : Infinity,
                trashcan : true,
                horizontalLayout : false,
                toolboxPosition : 'start',
                css : true,
                media : 'https://blockly-demo.appspot.com/static/media/',
                rtl : false,
                scrollbars : true,
                sounds : true,
                oneBasedIndex : true,
                zoom : {
                    controls : true,
                    wheel : true,
                    startScale : 1,
                    maxScale : 3,
                    minScale : 0.3,
                    scaleSpeed : 1.2
                }
            };

            /* Inject your workspace */
            workspaceRuleThen = Blockly.inject("blocklyDivRuleThen", optionsRuleThen);
            workspaceRuleThen.addChangeListener(actionEventListener);
            function setField(currentBlock,currentType) {
                if(currentType == "things") {
                    let thingName = currentBlock.getFieldValue("things");
                    currentBlock.getField("devices").menuGenerator_ = thingsJson[thingName].devices;
                    currentBlock.getField("devices").setText("");
                    currentBlock.getField("devices").setValue("");
                    setField(currentBlock,"devices");
                } else if(currentType == "devices") {
                    let deviceName = currentBlock.getFieldValue("devices");
                    currentBlock.getField("attributes").menuGenerator_ = devicesJson[deviceName].attributes;
                    currentBlock.getField("attributes").setText("");
                    currentBlock.getField("attributes").setValue("");
                }
            }

            function setDropDownOptions(parentBlock,currentBlock) {
                if(!currentBlock.hasOwnProperty("type")) {
                    return ;
                }
                if(currentBlock.type =="unit") {
                    if(parentBlock != null && parentBlock.type == "unit") {
                        let parentUnitName = parentBlock.getFieldValue("units");
                        if(unitsJson.hasOwnProperty(parentUnitName)) {
                            let dropDown = currentBlock.getField("units");
                            dropDown.menuGenerator_ = unitsJson[parentUnitName].subunits;
                            dropDown.setText("");
                            dropDown.setValue("");
                        } else {
                            let dropDown = currentBlock.getField("units");
                            dropDown.menuGenerator_ = [];
                            dropDown.setText("");
                            dropDown.setValue("");
                        }
                    } else if(parentBlock == null) {
                        let dropdown = currentBlock.getField("units");
                        dropdown.menuGenerator_ = allUnits;
                        dropdown.setText(allUnits[0][0]);
                        dropdown.setValue(allUnits[0][1]);
                        return;
                    }
                } else if(currentBlock.type == "thing") {
                    if(parentBlock != null) {
                        let parentUnitName = parentBlock.getFieldValue("units");
                        if(unitsJson.hasOwnProperty(parentUnitName)) {
                            let dropDown = currentBlock.getField("things");
                            dropDown.menuGenerator_ = unitsJson[parentUnitName].things;
                            dropDown.setText("");
                            dropDown.setValue("");
                        }
                        setField(currentBlock,"things");
                    }
                }
                if(parentBlock!=null && (parentBlock.type=="unit" || parentBlock.type=="thing")) {
                    let children = currentBlock.getChildren();
                    if(children.length != 0) {
                        setDropDownOptions(currentBlock, children[0]);
                    }
                }
            }

            function actionEventListener(actionEvent) {
                let allBlocks = workspaceRuleThen.getAllBlocks();
                if(actionEvent.type == "create") {
                    let block = workspaceRuleThen.getBlockById(actionEvent.blockId);
                    if(block.type == "unit") {
                        let dropdown = block.getField("units");
                        dropdown.menuGenerator_ = allUnits;
                        dropdown.setText(allUnits[0][0]);
                        dropdown.setValue(allUnits[0][1]);
                    }
                }
                if(actionEvent.type=="move" && actionEvent.oldParentId!=actionEvent.newParentId) {
                    let block = workspaceRuleThen.getBlockById(actionEvent.blockId);
                    setDropDownOptions(block.getParent(), block);
                } else if(actionEvent.type == "change") {
                    let block = workspaceRuleThen.getBlockById(actionEvent.blockId);
                    if(block.getChildren().length > 0)
                        setDropDownOptions(block, block.getChildren()[0]);
                    else if(block.type == "thing") {
                        setField(block,actionEvent.name);
                    }
                }
            }
        }
    }

    function addBlocklyCron() {
        if(blocklyCronInitialized)
            return false;

        $.ajax({
            url: "/blockly/getJson",
            dataType: "text",
            success: function(data) {
                startBlocklyCron(data);
            }
        });

        function startBlocklyCron(data) {
            blocklyCronInitialized = true;
            data = JSON.parse(data);

            let thingName = document.getElementById('thingId').innerHTML;
            thingName += ','+document.getElementById('thingName').innerHTML;

            var allDevices = data.thingsJson[thingName].devices;
            var devicesJson = data.devicesJson;

            var optionsCron = {
                toolbox : toolboxCron,
                collapse : true,
                comments : false,
                disable : false,
                maxBlocks : Infinity,
                trashcan : true,
                horizontalLayout : false,
                toolboxPosition : 'start',
                css : true,
                media : 'https://blockly-demo.appspot.com/static/media/',
                rtl : false,
                scrollbars : true,
                sounds : true,
                oneBasedIndex : true,
                zoom : {
                    controls : true,
                    wheel : true,
                    startScale : 1,
                    maxScale : 3,
                    minScale : 0.3,
                    scaleSpeed : 1.2
                }
            };

            /* Inject your workspace */
            workspaceCron = Blockly.inject("blocklyDivCron", optionsCron);
            workspaceCron.addChangeListener(actionEventListener);

            function actionEventListener(actionEvent) {
                let allBlocks = workspaceCron.getAllBlocks();
                if(actionEvent.type == "create") {
                    let block = workspaceCron.getBlockById(actionEvent.blockId);
                    if(block.type == "cron_details") {
                        let dropdown = block.getField("devices");
                        dropdown.menuGenerator_ = allDevices;
                        dropdown.setText(allDevices[0][0]);
                        dropdown.setValue(allDevices[0][1]);
                        console.log(JSON.stringify(devicesJson[allDevices[0][1]]));
                        block.getField("attributes").menuGenerator_ = devicesJson[allDevices[0][1]].attributes;
                        block.getField("attributes").setText("");
                        block.getField("attributes").setValue("");
                    }
                }
                else if(actionEvent.type == "change") {
                    let block = workspaceCron.getBlockById(actionEvent.blockId);
                    if(block.type == "cron_details" && actionEvent.name == "devices") {
                        let deviceName = block.getFieldValue("devices");
                        block.getField("attributes").menuGenerator_ = devicesJson[deviceName].attributes;
                        block.getField("attributes").setText("");
                        block.getField("attributes").setValue("");
                    }
                }
            }
        }
    }

    function getIfCondition(parts) {
    	let conStr;
    	if(Array.isArray(parts) && parts.length%2==0) {
    		return false;
    	} else if(!Array.isArray(parts) ){
    		// for logic operator
    		let object = parts;
    		return " "+object.logic+" ";
    	} else if(parts.length == 1) {
    		//any of condition part
    		let condition = parts[0];
    		let parameters = [condition.lvalue.device.split(",")[0]+"."+condition.lvalue.attribute.split(",")[0],condition.operator,condition.rvalue];
    		return "(reported.device"+parameters[0] + parameters[1] + parameters[2]+")";
    	} else {
    		conStr = "(";
    		for(let i=0;i<parts.length;i++) {
    			conStr += getIfCondition(parts[i]);
    		}
    		conStr+=")"
    		return conStr;
    	}
    }

    function saveRuleIf() {
        let code = Blockly.JavaScript.workspaceToCode(workspaceRuleIf);
        code = JSON.parse(code);
        code = getIfCondition(code);
        document.getElementById("ruleCondition").value = code;

        let xml = Blockly.Xml.workspaceToDom(workspaceRuleIf);
        let xml_text = Blockly.Xml.domToText(xml);
        document.getElementById("ruleIfXml").value = xml_text;
        $("#rule_if").modal('hide');
    }

    function getParameter(lValueObject) {
    	let childDeviceId;
    	let childAttributeId;
    	let operator;
    	let rvalue;
    	while(true){
    		if(lValueObject.hasOwnProperty('lvalue')) {
    			rvalue = lValueObject.rvalue;
    			operator = lValueObject.operator;
    			lValueObject = lValueObject.lvalue.child;
    		} else if(lValueObject.hasOwnProperty('child')) {
    			lValueObject = lValueObject.child;
    		} else {
    			childDeviceId = lValueObject.device.split(",")[0];
    			childAttributeId = lValueObject.attribute.split(",")[0];
    			break;
    		}
    	}
    	return [childDeviceId+"."+ childAttributeId,operator,rvalue];
    }

    function setDesiredState(parts){
    	let deviceAttribute = getParameter(parts.deviceDetails)[0];
    	console.log("desired.device" + deviceAttribute);
        return "desired.device" + deviceAttribute;
    }

    function saveRuleThen() {
        let code = Blockly.JavaScript.workspaceToCode(workspaceRuleThen);
        code = JSON.parse(code);
        if(code.type == "actuator") {
            let actuatorAction = setDesiredState(code);
            console.log("actuatorAction "+ actuatorAction);
        } else if(code.type == "SNS") {
            $("#topic").val(code.name);
            $("#subject").val(code.subject);
            $("#message").val(code.message);
            $("#interval").val(code.interval);
        } else {
            console.log("DDB");
        }
        let xml = Blockly.Xml.workspaceToDom(workspaceRuleThen);
        let xml_text = Blockly.Xml.domToText(xml);
        document.getElementById("ruleThenXml").value = xml_text;
        $("#rule_then").modal('hide');
    }

    function saveCronData(loader, callback) {
        let code = Blockly.JavaScript.workspaceToCode(workspaceCron);
        code = JSON.parse(code);
        let cronName = code.name;
        let cronExpression = code.cron;
        // check if there is no device attribute
        let deviceName = code.deviceDetails.device.split(",")[1];
        let attributeName  = code.deviceDetails.attribute.split(",")[1];
        let newValue = code.newValue;

        if(cronName=="" || cronExpression=="" || deviceName=="" || attributeName=="" || newValue=="") {
            loader.saveLoader = false;
            alert("Please fill up all the details!");
            return;
        }

        document.getElementById("cronName").value = cronName;
        document.getElementById("cronName").dispatchEvent(new Event('input', {'bubbles': true,'cancelable': true}));

        document.getElementById("cronExpression").value = cronExpression;
        document.getElementById("cronExpression").dispatchEvent(new Event('input', {'bubbles': true,'cancelable': true}));

        let cronDevice = document.getElementById("cronDevice");
        let flagDevice = false;
        for(let i=0;i<cronDevice.children.length;i++) {
            if(cronDevice.children[i].text == deviceName) {
                //setting option to select
                cronDevice.value = cronDevice.children[i].value;
                document.getElementById("cronDevice").dispatchEvent(new Event('change', {'bubbles': true,'cancelable': true}));
                flagDevice = true;
                break;
            }
        }
        if(flagDevice){
            setTimeout(function(){
                let cronAttribute = document.getElementById("cronAttribute");

                let flagAttribute = false;
                for(let i=0;i<cronAttribute.children.length;i++) {
                    if(cronAttribute.children[i].text == attributeName) {
                        //setting option to select
                        cronAttribute.value = cronAttribute.children[i].value;
                        document.getElementById("cronAttribute").dispatchEvent(new Event('change', {'bubbles': true,'cancelable': true}));
                        flagAttribute = true;
                        break;
                    }
                }
                if(flagAttribute){
                    setTimeout(function(){
                        let xml = Blockly.Xml.workspaceToDom(workspaceCron);
                        let xml_text = Blockly.Xml.domToText(xml);
                        document.getElementById("cronXml").value = xml_text;
                        document.getElementById("cronXml").dispatchEvent(new Event('input', {'bubbles': true,'cancelable': true}));

                        document.getElementById("cronAttributeValue").value = newValue;
                        document.getElementById("cronAttributeValue").dispatchEvent(new Event('input', {'bubbles': true,'cancelable': true}));
                        document.getElementById("cronAttributeValue").dispatchEvent(new Event('change', {'bubbles': true,'cancelable': true}));

                        setTimeout(callback,1500);

                    }, 1500);
                }
            }, 1500);
        }
    }
</script>
