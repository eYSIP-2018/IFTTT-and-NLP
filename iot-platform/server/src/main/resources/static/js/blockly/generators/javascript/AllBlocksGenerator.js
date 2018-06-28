'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.JavaScript['unit'] = function(block) {
  var dropdown_units = block.getFieldValue('units');
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);

  value_name = value_name.length > 0 ? value_name.slice(1,-1):"{}";
  var unit = {
      "id" : dropdown_units.split(',')[0],
      "unitName" : dropdown_units.split(',')[1],
      "child" : JSON.parse(value_name)
  };
  var code = JSON.stringify(unit);

  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['thing'] = function(block) {
  var dropdown_things = block.getFieldValue('things');
  var dropdown_devices = block.getFieldValue('devices');
  var dropdown_attributes = block.getFieldValue('attributes');

  var code = "{\"thing\":\""+dropdown_things+"\",\"device\":\""+dropdown_devices+"\",\"attribute\":\""+dropdown_attributes+"\"}";

  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['value'] = function(block) {
  var text_input = block.getFieldValue('input');

  var code = "\""+text_input+"\"";

  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['condition'] = function(block) {
  var statements_expression = Blockly.JavaScript.statementToCode(block, 'expression');

  var code = "["+statements_expression+"]";

  return code;
};

Blockly.JavaScript['logic'] = function(block) {
  var dropdown_logic = block.getFieldValue('logic');
  // TODO: Assemble JavaScript into code variable.
  var logic = {
      logic : dropdown_logic
  }
  var code = ","+JSON.stringify(logic)+",";

  return code;
};

Blockly.JavaScript['expression'] = function(block) {
  var value_lvalue = Blockly.JavaScript.valueToCode(block, 'lvalue', Blockly.JavaScript.ORDER_ATOMIC);
  value_lvalue = value_lvalue.length > 0 ? value_lvalue.slice(1,-1):"{}";
  var dropdown_operator = block.getFieldValue('operator');
  var value_rvalue = Blockly.JavaScript.valueToCode(block, 'rvalue', Blockly.JavaScript.ORDER_ATOMIC);
  value_rvalue = value_rvalue.length > 0 ? value_rvalue.slice(1,-1):"{}";

  var code = {
      lvalue : JSON.parse(value_lvalue),
      operator : dropdown_operator,
      rvalue : JSON.parse(value_rvalue)
  };

  return JSON.stringify(code);
};

Blockly.JavaScript['cron'] = function(block) {
  var text_name = block.getFieldValue('name');
  var text_cron_expression = block.getFieldValue('cron_expression');
  var statements_desired_state = Blockly.JavaScript.statementToCode(block, 'desired_state');
  var code = '{\"name\":\"'+text_name+'\",\"cron\":\"'+text_cron_expression+'\",'+statements_desired_state+'}';
  return code;
};

Blockly.JavaScript['cron_details'] = function(block) {
  var dropdown_devices = block.getFieldValue('devices');
  var dropdown_attributes = block.getFieldValue('attributes');
  var code = '{\"device\":\"'+dropdown_devices+'\",\"attribute\":\"'+dropdown_attributes+'\"}';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['device_details'] = function(block) {
  var dropdown_devices = block.getFieldValue('devices');
  var dropdown_attributes = block.getFieldValue('attributes');
  var code = '{\"device\":\"'+dropdown_devices+'\",\"attribute\":\"'+dropdown_attributes+'\"}';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['assignment'] = function(block) {
    var value_lvalue = Blockly.JavaScript.valueToCode(block, 'lvalue', Blockly.JavaScript.ORDER_ATOMIC);
    var value_rvalue = Blockly.JavaScript.valueToCode(block, 'rvalue', Blockly.JavaScript.ORDER_ATOMIC);
    value_lvalue = value_lvalue.slice(1,-1);
    value_rvalue = value_rvalue.slice(1,-1);
    var code = '\"type\":\"Actuator\",\"deviceDetails\":'+value_lvalue+',\"newValue\":'+value_rvalue;
    return code;
};

Blockly.JavaScript['then'] = function(block) {
  var statements_then_type = Blockly.JavaScript.statementToCode(block, 'then_type');
  var code = '{'+statements_then_type+'}';
  return code;
};

Blockly.JavaScript['ddb'] = function(block) {
  var code = '\"type\":\"DDB\"';
  return code;
};

Blockly.JavaScript['sns'] = function(block) {
  var text_topic = block.getFieldValue('topic');
  var text_subject = block.getFieldValue('subject');
  var text_message = block.getFieldValue('message');
  var number_interval = block.getFieldValue('interval');
  var code = '\"type\":\"SNS\",\"name\":\"'+text_topic+'\",\"subject\":\"'+text_subject+'\",\"message\":\"'+text_message+'\",\"interval\":\"'+number_interval+'\"';
  return code;
};
