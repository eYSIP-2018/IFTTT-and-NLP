'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks['unit'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("UNIT");
    this.appendValueInput("NAME")
        .setCheck(["unit", "thing"])
        .appendField(new Blockly.FieldDropdown([["My Main Unit","1,My Main Unit"], ["SIC 201","2, SIC 201"], ["SIC 301","3, SIC 301"]]), "units");
    this.setInputsInline(false);
    this.setOutput(true, "unit");
    this.setColour(230);
 this.setTooltip("Choose a unit among these");
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
        .appendField(new Blockly.FieldDropdown([["Lappi Desk","1"], ["Thing 1","2"], ["Thing 2","3"]]), "things");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Device");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([["ESP-DHT","1"]]), "devices");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Attributes");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([["temperature","1"], ["humidity","2"], ["led","3"]]), "attributes");
    this.setInputsInline(false);
    this.setOutput(true, "thing");
    this.setColour(230);
 this.setTooltip("Choose Thing, devices and its attributes from list");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['condition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("(");
    this.appendStatementInput("expression")
        .setCheck("conditionTop");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(false);
    this.setPreviousStatement(true, ["conditionTop", "logicBottom"]);
    this.setNextStatement(true, "logicTop");
    this.setColour(210);
 this.setTooltip("condition to check");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['logic'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["and","and"], ["or","or"], ["not","not"]]), "logic");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "logicTop");
    this.setNextStatement(true, "logicBottom");
    this.setColour(225);
 this.setTooltip("logical operator");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['expression'] = {
  init: function() {
    this.appendValueInput("lvalue")
        .setCheck(["unit", "value"]);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["=","="], ["!=","!="], ["<","<"], [">",">"], ["<=","<="], [">=",">="]]), "operator");
    this.appendValueInput("rvalue")
        .setCheck(["unit", "value"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setColour(230);
 this.setTooltip("create expression using these");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("?"), "input");
    this.setOutput(true, "value");
    this.setColour(230);
 this.setTooltip("enter input value");
 this.setHelpUrl("");
  }
};
