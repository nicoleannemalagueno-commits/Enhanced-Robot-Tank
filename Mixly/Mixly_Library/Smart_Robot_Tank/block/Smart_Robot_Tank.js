'use strict';

goog.provide('Blockly.Blocks.Smart_Robot_Tank');

goog.require('Blockly.Blocks');

//////////////////color/////////////////////
Blockly.Blocks.Smart_Robot_Tank.HUE = 222;


//////////////////////////////Smart_Robot_Tank/////////////////////////////

///////////////////////////front////////////////
Blockly.Blocks.tank_FRONT = {
  init: function() {
    this.setColour(Blockly.Blocks.Smart_Robot_Tank.HUE);
    
    this.appendDummyInput("")
    .appendField(Blockly.tank_front)
    .appendField(new Blockly.FieldImage("../../media/Smart_Robot_Tank/tank.png", 60, 60))
    .appendField(Blockly.tank_speed);
    this.appendValueInput("speed_F", Number)
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField("PWM");
 
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};

////////////////////////////back////////////////
Blockly.Blocks.tank_BACK = {
  init: function() {
    this.setColour(Blockly.Blocks.Smart_Robot_Tank.HUE);
    
    this.appendDummyInput("")
    .appendField(Blockly.tank_back)
    .appendField(new Blockly.FieldImage("../../media/Smart_Robot_Tank/tank.png", 60, 60))
    .appendField(Blockly.tank_speed);
    this.appendValueInput("speed_B", Number)
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField("PWM");
 
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};

////////////////////////////left////////////////
Blockly.Blocks.tank_LEFT = {
  init: function() {
    this.setColour(Blockly.Blocks.Smart_Robot_Tank.HUE);
    
    this.appendDummyInput("")
    .appendField(Blockly.tank_left)
    .appendField(new Blockly.FieldImage("../../media/Smart_Robot_Tank/tank.png", 60, 60))
    .appendField(Blockly.tank_speed);
    this.appendValueInput("speed_L", Number)
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField("PWM");
 
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};

////////////////////////////turn_left////////////////
Blockly.Blocks.tank_TURN_LEFT = {
  init: function() {
    this.setColour(Blockly.Blocks.Smart_Robot_Tank.HUE);
    
    this.appendDummyInput("")
    .appendField(Blockly.tank_turn_left)
    .appendField(new Blockly.FieldImage("../../media/Smart_Robot_Tank/tank.png", 60, 60));
    //.appendField(Blockly.tank_speed);
    //this.appendValueInput("speed_T_L", Number)
    //.setCheck(Number);
    this.appendDummyInput("")
    .appendField("PWM");
 
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};

////////////////////////////right////////////////
Blockly.Blocks.tank_RIGHT = {
  init: function() {
    this.setColour(Blockly.Blocks.Smart_Robot_Tank.HUE);
    
    this.appendDummyInput("")
    .appendField(Blockly.tank_right)
    .appendField(new Blockly.FieldImage("../../media/Smart_Robot_Tank/tank.png", 60, 60))
    .appendField(Blockly.tank_speed);
    this.appendValueInput("speed_R", Number)
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField("PWM");
 
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};

////////////////////////////turn_right////////////////
Blockly.Blocks.tank_TURN_RIGHT = {
  init: function() {
    this.setColour(Blockly.Blocks.Smart_Robot_Tank.HUE);
    
    this.appendDummyInput("")
    .appendField(Blockly.tank_turn_right)
    .appendField(new Blockly.FieldImage("../../media/Smart_Robot_Tank/tank.png", 60, 60));
    //.appendField(Blockly.tank_speed);
    //this.appendValueInput("speed_T_R", Number)
    //.setCheck(Number);
    this.appendDummyInput("")
    .appendField("PWM");
 
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};


////////////////////////////stop////////////////
Blockly.Blocks.tank_STOP = {
  init: function() {
    this.setColour(Blockly.Blocks.Smart_Robot_Tank.HUE);
    
    this.appendDummyInput("")
    .appendField(Blockly.tank_stop)
    .appendField(new Blockly.FieldImage("../../media/Smart_Robot_Tank/tank.png", 60, 60))
 
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};



///////////////Tank_Ultrasonic/////////////////////////
Blockly.Blocks.Tank_Ultrasonic = {
  init: function () {
    this.setColour(Blockly.Blocks.Smart_Robot_Tank.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.tank_sr01)
    .appendField(new Blockly.FieldImage("../../media/Smart_Robot_Tank/ul.png", 50, 40));
    
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_CHAOSHENGBO);
  }
};





///////////////////////////servo///////////////////////////////////
Blockly.Blocks.Tank_SG90servo = {
  init: function() {
    this.setColour(Blockly.Blocks.Smart_Robot_Tank.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_Tank_SERVO)
    .appendField(new Blockly.FieldImage("../../media/Smart_Robot_Tank/servosg90.png", 70, 60));
    this.appendValueInput("angle", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("0~180");
    
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};


///////////Infrared obstacle avoidance sensor///////////////
Blockly.Blocks.Tank_IR_Avoidance = {
  init: function() {
    this.setColour(Blockly.Blocks.Smart_Robot_Tank.HUE);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown([["left_infrared_avoidance_sensor", "left_IR"], ["right_infrared_avoidance_sensor", "right_IR"]]), "IR_avoid")
    .appendField(new Blockly.FieldImage("../../media/Smart_Robot_Tank/iravoid.png", 60, 32));
    
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};


////////////////Infrared receiver////////////////////////////

Blockly.Blocks.Tank_ir_receiver = {
    init: function () {
        this.setColour(Blockly.Blocks.Smart_Robot_Tank.HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldTextInput('ir_rec'), 'VAR')
            .appendField(Blockly.tank_ir_R)
            .appendField(new Blockly.FieldImage("../../media/Smart_Robot_Tank/irreceiver.png", 70, 32));
        this.appendStatementInput('DO')
            .appendField(Blockly.tank_ir_RD);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_IR_RECIEVE_TOOLTIP);
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};

//////////////////////bluetooth remote////////////////////////////
Blockly.Blocks.Tank_bluetooth = {
    init: function () {
        this.setColour(Blockly.Blocks.Smart_Robot_Tank.HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldTextInput('bluetooth_val'), 'VAL')
            .appendField(Blockly.tank_Bluetooth)
            .appendField(new Blockly.FieldImage("../../media/Smart_Robot_Tank/bluetooth1.png", 100, 45))
        this.appendStatementInput('DO')
            .appendField(Blockly.tank_Bluetooth_rec);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip("bluetooth");
    },
    getVars: function () {
        return [this.getFieldValue('VAL')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAL'))) {
            this.setTitleValue(newName, 'VAL');
        }
    }
};


