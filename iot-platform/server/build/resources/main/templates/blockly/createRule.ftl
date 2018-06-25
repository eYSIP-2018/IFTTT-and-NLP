<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="/static/js/blockly/blockly_compressed.js"></script>
<script src="/static/js/blockly/generators/javascript.js"></script>
<script src="/static/js/blockly/blocks_compressed.js"></script>
<script src="/static/js/blockly/msg/js/en.js"></script>
<script src="/static/js/blockly/blocks/AllBlocksJS.js"></script>
<script src="/static/js/blockly/generators/javascript/AllBlocksGenerator.js"></script>

<div id="blocklyDiv" style="height: 90%; width: 100%;"></div>

<xml id="toolbox" style="display: none">
    <block type="condition"></block>
    <block type="expression"></block>
    <block type="unit"></block>
    <block type="thing"></block>
    <block type="value"></block>
    <block type="logic"></block>
    <block type="then"></block>
    <block type="sns"></block>
    <block type="ddb"></block>
    <block type="assignment"></block>
    <block type="cron"></block>
    <block type="cron_details"></block>
</xml>

<script>
    /* TODO: Change toolbox XML ID if necessary. Can export toolbox XML from Workspace Factory. */
    var toolbox = document.getElementById("toolbox");

    $.ajax({
        url: "/blockly/getJson",
        dataType: "text",
        success: function(data) {
            startBlockly(data);
        }
    });

    var workspace = null;

    function startBlockly(data) {
        data = JSON.parse(data);

        var allUnits = data.allUnits;
        var unitsJson = data.unitsJson;
        var thingsJson = data.thingsJson;
        var devicesJson = data.devicesJson;

        var options = {
            toolbox : toolbox,
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
        workspace = Blockly.inject("blocklyDiv", options);
        workspace.addChangeListener(actionEventListener);
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
            let allBlocks = workspace.getAllBlocks();
            if(actionEvent.type == "create") {
                let block = workspace.getBlockById(actionEvent.blockId);
                if(block.type == "unit") {
                    let dropdown = block.getField("units");
                    dropdown.menuGenerator_ = allUnits;
                    dropdown.setText(allUnits[0][0]);
                    dropdown.setValue(allUnits[0][1]);
                }
            }
            if(actionEvent.type=="move" && actionEvent.oldParentId!=actionEvent.newParentId) {
                let block = workspace.getBlockById(actionEvent.blockId);
                setDropDownOptions(block.getParent(), block);
            } else if(actionEvent.type == "change") {
                let block = workspace.getBlockById(actionEvent.blockId);
                if(block.getChildren().length > 0)
                    setDropDownOptions(block, block.getChildren()[0]);
                else if(block.type == "thing") {
                    setField(block,actionEvent.name);
                }
            }
        }
    }
</script>
<button onclick="alert(Blockly.JavaScript.workspaceToCode(workspace));">Generate</button>
