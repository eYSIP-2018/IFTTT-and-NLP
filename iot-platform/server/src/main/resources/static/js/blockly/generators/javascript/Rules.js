'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.JavaScript['unit'] = function(block) {
  var dropdown_units = block.getFieldValue('units');
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  value_name = value_name.length > 0 ? value_name.slice(1,-1):"{}";
  var unit = {
      "id" : dropdown_units.split(',')[0],
      "unitName" : dropdown_units.split(',')[1],
      "child" : JSON.parse(value_name)
  };
  var code = JSON.stringify(unit);
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['thing'] = function(block) {
  var dropdown_things = block.getFieldValue('things');
  var dropdown_devices = block.getFieldValue('devices');
  var dropdown_attributes = block.getFieldValue('attributes');
  // TODO: Assemble JavaScript into code variable.
  var code = "{\"thing\":\""+dropdown_things+"\",\"device\":\""+dropdown_devices+"\",\"attribute\":\""+dropdown_attributes+"\"}";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['condition'] = function(block) {
  var statements_expression = Blockly.JavaScript.statementToCode(block, 'expression');
  console.log(statements_expression+ " " + typeof(statements_expression));
  //statements_expression = statements_expression.length > 0 ? statements_expression.slice(1,-1):"{}";
  // TODO: Assemble JavaScript into code variable.
  var code = "["+statements_expression+"]";
  console.log("FINAL : "+code);
  return code;
};

Blockly.JavaScript['logic'] = function(block) {
  var dropdown_logic = block.getFieldValue('logic');
  // TODO: Assemble JavaScript into code variable.
  var logic = {
      logic : dropdown_logic
  }
  var code = ","+JSON.stringify(logic)+",";
  console.log("LOGIC "+code);
  return code;
};

Blockly.JavaScript['expression'] = function(block) {
  var value_lvalue = Blockly.JavaScript.valueToCode(block, 'lvalue', Blockly.JavaScript.ORDER_ATOMIC);
  value_lvalue = value_lvalue.length > 0 ? value_lvalue.slice(1,-1):"{}";
  var dropdown_operator = block.getFieldValue('operator');
  var value_rvalue = Blockly.JavaScript.valueToCode(block, 'rvalue', Blockly.JavaScript.ORDER_ATOMIC);
  value_rvalue = value_rvalue.length > 0 ? value_rvalue.slice(1,-1):"{}";

  // TODO: Assemble JavaScript into code variable.
  var code = {
      lvalue : JSON.parse(value_lvalue),
      operator : dropdown_operator,
      rvalue : JSON.parse(value_rvalue)
  };
  console.log("Expression: "+JSON.stringify(code));
  return JSON.stringify(code);
};

Blockly.JavaScript['value'] = function(block) {
  var text_input = block.getFieldValue('input');
  // TODO: Assemble JavaScript into code variable.
  var code = "\""+text_input+"\"";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
