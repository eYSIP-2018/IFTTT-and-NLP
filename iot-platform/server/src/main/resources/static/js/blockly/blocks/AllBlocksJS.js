Blockly.Blocks['unit'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("UNIT");
    this.appendValueInput("NAME")
        .setCheck(["unit", "thing"])
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([["",""]]), "units");
    this.setOutput(true, "unit");
    this.setColour(230);
 this.setTooltip("Unit");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['thing'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Thing");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([["",""]]), "things");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Device");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([["",""]]), "devices");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Attribute");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([["",""]]), "attributes");
    this.setOutput(true, "thing");
    this.setColour(230);
 this.setTooltip("Thing, device & it's attribute");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("?"), "input");
    this.setOutput(true, "value");
    this.setColour(230);
 this.setTooltip("Value");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['condition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("If...");
    this.appendStatementInput("expression")
        .setCheck(["condition_top", "expression"]);
    this.setPreviousStatement(true, "condition_top");
    this.setNextStatement(true, "condition_bottom");
    this.setColour(230);
 this.setTooltip("If... condition");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['logic'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([["and","and"], ["or","or"]]), "logic");
    this.setPreviousStatement(true, "condition_bottom");
    this.setNextStatement(true, "condition_top");
    this.setColour(230);
 this.setTooltip("Logical operator");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['expression'] = {
  init: function() {
    this.appendValueInput("lvalue")
        .setCheck("device_details");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([["=","="], ["!=","!="], ["<","<"], ["<=","<="], [">",">"], [">=",">="]]), "operator");
    this.appendValueInput("rvalue")
        .setCheck("value");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "expression");
    this.setColour(230);
 this.setTooltip("Create expression");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['cron'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Create cron");
    this.appendDummyInput()
        .appendField("Name :")
        .appendField(new Blockly.FieldTextInput("Cron name"), "name");
    this.appendDummyInput()
        .appendField("Cron :")
        .appendField(new Blockly.FieldTextInput("* * * * ? *"), "cron_expression");
    this.appendDummyInput()
        .appendField("Desired state :");
    this.appendStatementInput("desired_state")
        .setCheck("assignment");
    this.setColour(230);
 this.setTooltip("Create cron");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['cron_details'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Device");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([["",""]]), "devices");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Attribute");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([["",""]]), "attributes");
    this.setOutput(true, "cron_details");
    this.setColour(230);
 this.setTooltip("Choose device and attribute");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['device_details'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Device");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([["",""]]), "devices");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Attribute");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([["",""]]), "attributes");
    this.setOutput(true, "device_details");
    this.setColour(230);
 this.setTooltip("Choose device and attribute");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['assignment'] = {
  init: function() {
    this.appendValueInput("lvalue")
        .setCheck(["unit", "cron_details"])
        .setAlign(Blockly.ALIGN_CENTRE);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("=");
    this.appendValueInput("rvalue")
        .setCheck("value")
        .setAlign(Blockly.ALIGN_CENTRE);
    this.setInputsInline(true);
    this.setPreviousStatement(true, "assignment");
    this.setColour(230);
 this.setTooltip("The assignment operation");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['then'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Then...");
    this.appendStatementInput("then_type")
        .setCheck(["ddb", "sns", "assignment"]);
    this.setColour(230);
 this.setTooltip("Then statement");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['ddb'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("DDB Rule");
    this.setPreviousStatement(true, "ddb");
    this.setColour(230);
 this.setTooltip("DDB Rule");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['sns'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("SNS Rule");
    this.appendDummyInput()
        .appendField("Topic Name :")
        .appendField(new Blockly.FieldTextInput("Topic Name"), "topic");
    this.appendDummyInput()
        .appendField("SNS Subject :")
        .appendField(new Blockly.FieldTextInput("SNS subject"), "subject");
    this.appendDummyInput()
        .appendField("Message :")
        .appendField(new Blockly.FieldTextInput("Optional message"), "message");
    this.appendDummyInput()
        .appendField("Interval (in min) :")
        .appendField(new Blockly.FieldNumber(15, 1, 60), "interval");
    this.setPreviousStatement(true, "sns");
    this.setColour(230);
 this.setTooltip("Create SNS Rule");
 this.setHelpUrl("");
  }
};
