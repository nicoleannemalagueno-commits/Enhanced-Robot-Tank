'use strict';

goog.provide('Blockly.Arduino.Smart_Robot_Tank');

goog.require('Blockly.Arduino');



////////////////////////////////front/////////////////////////*/
Blockly.Arduino.tank_FRONT = function() {
  
  var value_front = Blockly.Arduino.valueToCode(this, 'speed_F', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.setups_['setup_output_m1'] = 'pinMode(2, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_p1'] = 'pinMode(5, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_m2'] = 'pinMode(4, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_p2'] = 'pinMode(6, OUTPUT);';

   var code = 'digitalWrite(2,LOW);\nanalogWrite(5,'+value_front+');\ndigitalWrite(4,HIGH);\nanalogWrite(6,'+value_front+');\n'; 
  return code;
};

////////////////////////////////back//////////////////////////
Blockly.Arduino.tank_BACK = function() {
  
  var value_back = Blockly.Arduino.valueToCode(this, 'speed_B', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.setups_['setup_output_m1'] = 'pinMode(2, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_p1'] = 'pinMode(5, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_m2'] = 'pinMode(4, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_p2'] = 'pinMode(6, OUTPUT);';
   var code = 'digitalWrite(2,HIGH);\nanalogWrite(5,'+value_back+');\ndigitalWrite(4,LOW);\nanalogWrite(6,'+value_back+');\n'; 
  return code;
};

////////////////////////////////left//////////////////////////
Blockly.Arduino.tank_LEFT = function() {
  
  var value_left = Blockly.Arduino.valueToCode(this, 'speed_L', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.setups_['setup_output_m1'] = 'pinMode(2, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_p1'] = 'pinMode(5, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_m2'] = 'pinMode(4, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_p2'] = 'pinMode(6, OUTPUT);';
   var code = 'digitalWrite(2,HIGH);\nanalogWrite(5,'+value_left+');\ndigitalWrite(4,HIGH);\nanalogWrite(6,'+value_left+');\n'; 
  return code;
};

////////////////////////////////turn_left//////////////////////////
Blockly.Arduino.tank_TURN_LEFT = function() {
  //var value_T_left = Blockly.Arduino.valueToCode(this, 'speed_T_L', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.setups_['setup_output_m1'] = 'pinMode(2, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_p1'] = 'pinMode(5, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_m2'] = 'pinMode(4, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_p2'] = 'pinMode(6, OUTPUT);';
   var code = 'digitalWrite(2,LOW);\nanalogWrite(5,170);\ndigitalWrite(4,HIGH);\nanalogWrite(6,255);\n'; 
  return code;
};


////////////////////////////////right//////////////////////////
Blockly.Arduino.tank_RIGHT = function() {
  
  var value_right = Blockly.Arduino.valueToCode(this, 'speed_R', Blockly.Arduino.ORDER_ATOMIC);

  //Blockly.Arduino.setups_['setup_back_'] = 'pinMode(4, OUTPUT);\n  pinMode(2, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_m1'] = 'pinMode(2, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_p1'] = 'pinMode(5, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_m2'] = 'pinMode(4, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_p2'] = 'pinMode(6, OUTPUT);';
   var code = 'digitalWrite(2,LOW);\nanalogWrite(5,'+value_right+');\ndigitalWrite(4,LOW);\nanalogWrite(6,'+value_right+');\n'; 
  return code;
};

////////////////////////////////turn_right//////////////////////////
Blockly.Arduino.tank_TURN_RIGHT = function() {
  //var value_T_right = Blockly.Arduino.valueToCode(this, 'speed_T_R', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.setups_['setup_output_m1'] = 'pinMode(2, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_p1'] = 'pinMode(5, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_m2'] = 'pinMode(4, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_p2'] = 'pinMode(6, OUTPUT);';
   var code = 'digitalWrite(2,LOW);\nanalogWrite(5,255);\ndigitalWrite(4,HIGH);\nanalogWrite(6,170);\n'; 
  return code;
};

////////////////////////////////stop//////////////////////////
Blockly.Arduino.tank_STOP = function() {
  //Blockly.Arduino.setups_['setup_back_'] = 'pinMode(4, OUTPUT);\n  pinMode(2, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_m1'] = 'pinMode(2, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_p1'] = 'pinMode(5, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_m2'] = 'pinMode(4, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_p2'] = 'pinMode(6, OUTPUT);';
   var code = 'digitalWrite(2,LOW);\nanalogWrite(5,0);\ndigitalWrite(4,HIGH);\nanalogWrite(6,0);\n'; 
  return code;
};



///////////////////////Ultrasonic sensor//////////////////////
Blockly.Arduino.Tank_Ultrasonic = function () {
    Blockly.Arduino.setups_['setup_output_T'] = 'pinMode(12, OUTPUT);';
    Blockly.Arduino.setups_['setup_output_E'] = 'pinMode(13, INPUT);';
    var funcName = 'checkdistance';
    var code = 'float' + ' ' + funcName + '() {\n'
  + '  digitalWrite(12, LOW);\n' + '  delayMicroseconds(2);\n'
  + '  digitalWrite(12, HIGH);\n' + '  delayMicroseconds(10);\n'
  + '  digitalWrite(12, LOW);\n'
  + '  float distance = pulseIn(13, HIGH) / 58.00;\n'
  + '  delay(10);\n' + '  return distance;\n'
  + '}\n';
    Blockly.Arduino.definitions_[funcName] = code;
    return [funcName + '()', Blockly.Arduino.ORDER_ATOMIC];
};







///////////////////////////////servo/////////////////////////
  Blockly.Arduino.Tank_SG90servo = function() {

  var value_degree = Blockly.Arduino.valueToCode(this, 'angle', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.definitions_['include_Servo'] = '#include <Servo.h>\n';
  Blockly.Arduino.definitions_['var_myservo'] = 'Servo myservo;';

  Blockly.Arduino.setups_['setup_servo'] = 'myservo.attach(10);';
  
  var code = 'myservo.write('+value_degree+');\n';
  return code;
};



Blockly.Arduino.Tank_IR_Avoidance = function() {

  Blockly.Arduino.setups_['setup_input_A1'] = 'pinMode(A1, INPUT);';
  Blockly.Arduino.setups_['setup_input_A2'] = 'pinMode(A2, INPUT);';
  var dropdown_type = this.getFieldValue('IR_avoid');


  var code = '';
  if (dropdown_type == "left_IR") code += 'digitalRead(A1)';
  if (dropdown_type == "right_IR") code += 'digitalRead(A2)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};



///////////////////////Tank_ir_receiver///////////////////
Blockly.Arduino.Tank_ir_receiver = function () {
    var variable = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    Blockly.Arduino.definitions_['var_declare' + variable] = 'long ' + variable + ';';
    //var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var branch2 = Blockly.Arduino.statementToCode(this, 'DO2');
    var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
       Blockly.Variables.NAME_TYPE);
    Blockly.Arduino.definitions_['include_IRremote'] = '#include <IRremote.h>\n';
    //Blockly.Arduino.definitions_['var_declare'+varName] = 'long '+varName+';\n';
    Blockly.Arduino.definitions_['var_ir_recv_3'] = 'IRrecv irrecv(3);\ndecode_results results;\n';
    Blockly.Arduino.setups_['setup_ir_recv_3'] = 'irrecv.enableIRIn();';
    var code = "if (irrecv.decode(&results)) {\n"
    code += '  ' + variable + '=results.value;\n';
    code += '  String type="UNKNOWN";\n';
    ////////////////////////////////////////////////////////////////
    code += '  String typelist[14]={"UNKNOWN", "NEC", "SONY", "RC5", "RC6", "DISH", "SHARP", "PANASONIC", "JVC", "SANYO", "MITSUBISHI", "SAMSUNG", "LG", "WHYNTER"};\n';
    code += '  if(results.decode_type>=1&&results.decode_type<=13){\n';
    code += '    type=typelist[results.decode_type];\n'
    code += '  }\n';
    code += '  Serial.print("IR TYPE:"+type+"  ");\n';
    code += branch;
    code += '  irrecv.resume();\n'
    code += '} else {\n';
    code += branch2;
    code += '}\n';
    return code;
};

/////////////////////////////////////Tank_bluetooth////////////////////////////////////
Blockly.Arduino.Tank_bluetooth = function () {
  var variable = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAL'), Blockly.Variables.NAME_TYPE);
  var val = this.getFieldValue('VAL');
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  //var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  //var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);


  //Blockly.Arduino.definitions_['include_Soft'] = '#include <SoftwareSerial.h>\n';
  //Blockly.Arduino.definitions_['mySerial'] = 'SoftwareSerial mySerial(0, 1);\n';
  Blockly.Arduino.definitions_['char'] = 'char '+val+';\n';

  Blockly.Arduino.setups_['mySerial23'] = 'Serial.begin(9600);';

   var code = 'if (Serial.available())\n{\n  '+val+' = Serial.read();\n';
   code += branch;
   code += '}\n';
  return code;
};

///////////////////////////////Desktop_Car/////////////////////////////////////////////////
