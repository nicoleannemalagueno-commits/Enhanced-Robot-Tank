#include <Servo.h>
#include <IRremote.h>
#include <DHT.h>

// Low-level trigger buzzer pin (D7 on LAFVIN V2.2 board)
const int BUZZER_PIN = 7;

// MQ-2 Gas Sensor on A0 (P4 header)
const int MQ2_PIN = A0;
const int GAS_THRESHOLD = 580; // Raised above the ~415 clean-air baseline
bool gasAlert = false;

// DHT22 Alert Pattern (Triple-beep + pause): {ON, OFF, ON, OFF, ON, PAUSE}
const unsigned long DHT_PATTERN[] = {120, 100, 120, 100, 120, 600};
const int DHT_STEPS = 6;

// MQ-2 Alert Pattern (Rapid urgent alarm): {ON, OFF}
const unsigned long GAS_PATTERN[] = {80, 80};
const int GAS_STEPS = 2;

int activeAlarmMode = 0; // 0 = OFF, 1 = DHT22, 2 = MQ-2
int alarmStep = 0;
unsigned long lastAlarmStepTime = 0;

// DHT22 (Adafruit library) on D8
#define DHTPIN 8
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

// Thresholds fitted for Philippine tropical conditions
const float TEMP_THRESHOLD     = 34.0; // °C (above typical 26–31°C baseline)
const float HUMIDITY_THRESHOLD = 88.0; // % RH (above typical 70–85% baseline)

const unsigned long DHT_READ_INTERVAL = 2000; // DHT22 needs ~2s between reads
unsigned long lastDhtRead = 0;
bool thresholdReached = false;

volatile int DL;
volatile int DM;
volatile int DR;
volatile int flag;
volatile int left_IR_Sensor;
volatile int right_IR_Sensor;
long ir_rec;

Servo myservo;
char bluetooth_data;

IRrecv irrecv(3);
decode_results results;

// Forward declarations
void forward(int a, int b);
void backward(int a, int b);
void turn_left(int a, int b);
void turn_right(int a, int b);
void rotate_left(int a, int b);
void rotate_right(int a, int b);
void stopp();

// Reads DHT22 + MQ-2 every 2s, prints to Serial Monitor, and drives distinct low-level buzzer alarms
void updateEnvironmentAndBuzzer() {
  unsigned long now = millis();

  if (now - lastDhtRead >= DHT_READ_INTERVAL) {
    lastDhtRead = now;
    float h = dht.readHumidity();
    float t = dht.readTemperature();
    int gasValue = analogRead(MQ2_PIN);

    gasAlert = (gasValue >= GAS_THRESHOLD);

    if (!isnan(h) && !isnan(t)) {
      thresholdReached = (t >= TEMP_THRESHOLD) || (h >= HUMIDITY_THRESHOLD);

      Serial.print("Temp: ");
      Serial.print(t, 1);
      Serial.print(" C | Hum: ");
      Serial.print(h, 1);
      Serial.print(" % | Gas: ");
      Serial.print(gasValue);
      Serial.print(" | Status: ");
      if (gasAlert) {
        Serial.println("GAS ALERT (RAPID BEEP)");
      } else if (thresholdReached) {
        Serial.println("TEMP/HUM ALERT (TRIPLE BEEP)");
      } else {
        Serial.println("NORMAL");
      }
    } else {
      Serial.print("DHT22 Error | Gas: ");
      Serial.println(gasValue);
    }
  }

  // Determine which alarm should be active (MQ-2 takes priority over DHT22)
  int desiredMode = 0;
  if (gasAlert) {
    desiredMode = 2;
  } else if (thresholdReached) {
    desiredMode = 1;
  }

  // If the alarm state just changed, reset the pattern immediately
  if (desiredMode != activeAlarmMode) {
    activeAlarmMode = desiredMode;
    alarmStep = 0;
    lastAlarmStepTime = now;
    digitalWrite(BUZZER_PIN, (activeAlarmMode == 0) ? HIGH : LOW);
  }

  // Run the active non-blocking beep pattern
  if (activeAlarmMode == 2) {
    if (now - lastAlarmStepTime >= GAS_PATTERN[alarmStep]) {
      lastAlarmStepTime = now;
      alarmStep = (alarmStep + 1) % GAS_STEPS;
      digitalWrite(BUZZER_PIN, (alarmStep % 2 == 0) ? LOW : HIGH);
    }
  } else if (activeAlarmMode == 1) {
    if (now - lastAlarmStepTime >= DHT_PATTERN[alarmStep]) {
      lastAlarmStepTime = now;
      alarmStep = (alarmStep + 1) % DHT_STEPS;
      digitalWrite(BUZZER_PIN, (alarmStep % 2 == 0) ? LOW : HIGH);
    }
  }
}

void Infrared_Obstacle_Avoidance() {
  flag = 0;
  while (flag == 0) {
    updateEnvironmentAndBuzzer();
    left_IR_Sensor = digitalRead(A1);
    right_IR_Sensor = digitalRead(A2);
    if (left_IR_Sensor == 0 && right_IR_Sensor == 0) {
      stopp();
      delay(500);
      backward(220, 220);
      delay(500);
      if (random(1, 10) > 5) {
        rotate_left(220, 220);
      } else {
        rotate_right(220, 220);
      }
      delay(500);
    } else if (left_IR_Sensor == 0 && right_IR_Sensor == 1) {
      backward(220, 220);
      delay(500);
      rotate_right(220, 220);
      delay(500);
    } else if (left_IR_Sensor == 1 && right_IR_Sensor == 0) {
      backward(220, 220);
      delay(500);
      rotate_left(255, 255);
      delay(500);
    } else {
      forward(150, 150);
    }
    if (Serial.available()) {
      bluetooth_data = Serial.read();
      if (bluetooth_data == 'S') {
        flag = 1;
      }
    }
  }
}

float checkdistance() {
  digitalWrite(12, LOW);
  delayMicroseconds(2);
  digitalWrite(12, HIGH);
  delayMicroseconds(10);
  digitalWrite(12, LOW);
  float distance = pulseIn(13, HIGH) / 58.00;
  delay(10);
  return distance;
}

void Ultrasonic_Obstacle_Avoidance() {
  flag = 0;
  while (flag == 0) {
    updateEnvironmentAndBuzzer();
    DM = checkdistance();
    if (DM < 30) {
      stopp();
      delay(1000);
      myservo.write(160);
      for (int i = 1; i <= 3; i = i + 1) {
        DL = checkdistance();
        delay(100);
      }
      myservo.write(20);
      for (int i = 1; i <= 3; i = i + 1) {
        DR = checkdistance();
        delay(100);
      }
      if (DL < 50 || DR < 50) {
        if (DL > DR) {
          myservo.write(90);
          rotate_left(255, 255);
          delay(500);
          forward(200, 200);
        } else {
          myservo.write(90);
          rotate_right(255, 255);
          delay(500);
          forward(200, 200);
        }
      } else {
        if (random(1, 10) > 5) {
          myservo.write(90);
          rotate_left(255, 255);
          delay(500);
          forward(200, 200);
        } else {
          myservo.write(90);
          rotate_right(255, 255);
          delay(500);
          forward(200, 200);
        }
      }
    } else {
      forward(200, 200);
    }
    if (Serial.available()) {
      bluetooth_data = Serial.read();
      if (bluetooth_data == 'S') {
        flag = 1;
      }
    }
  }
}

void Infrared_Remote_Control() {
  flag = 0;
  while (flag == 0) {
    updateEnvironmentAndBuzzer();
    if (irrecv.decode(&results)) {
      ir_rec = results.value;
      irrecv.resume();
    }

    if (ir_rec == 0xFF629D) {
      forward(240, 240);
    }
    if (ir_rec == 0xFFA857) {
      backward(240, 240);
    }
    if (ir_rec == 0xFF22DD) {
      rotate_left(240, 240);
      delay(50);
      stopp();
    }
    if (ir_rec == 0xFFC23D) {
      rotate_right(240, 240);
      delay(50);
      stopp();
    }
    if (ir_rec == 0xFF30CF) {
      rotate_left(240, 240);
    }
    if (ir_rec == 0xFF7A85) {
      rotate_right(240, 240);
    }
    if (ir_rec == 0xFF02FD) {
      stopp();
    }
    if (Serial.available()) {
      bluetooth_data = Serial.read();
      if (bluetooth_data == 'S') {
        flag = 1;
      }
    }
  }
}

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, HIGH); // Keep low-level trigger buzzer OFF initially

  lastDhtRead = millis();

  DL = 0;
  DM = 0;
  DR = 0;
  flag = 0;
  left_IR_Sensor = 0;
  right_IR_Sensor = 0;
  myservo.attach(10);
  Serial.begin(9600);
  myservo.write(90);
  pinMode(A1, INPUT);
  pinMode(A2, INPUT);
  pinMode(2, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(6, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(13, INPUT);
  irrecv.enableIRIn();
  dht.begin();
}

void loop() {
  updateEnvironmentAndBuzzer();

  if (Serial.available()) {
    bluetooth_data = Serial.read();
    Serial.println(bluetooth_data);
  }
  switch (bluetooth_data) {
    case 'F':
      forward(255, 255);
      break;
    case 'G':
      backward(255, 255);
      break;
    case 'H':
      rotate_left(255, 255);
      delay(50);
      stopp();
      bluetooth_data = 'S';
      break;
    case 'I':
      rotate_right(255, 255);
      delay(50);
      stopp();
      bluetooth_data = 'S';
      break;
    case 'J':
      rotate_left(255, 255);
      break;
    case 'K':
      rotate_right(255, 255);
      break;
    case 'S':
      stopp();
      break;
    case 'E':
      Infrared_Obstacle_Avoidance();
      break;
    case 'C':
      Ultrasonic_Obstacle_Avoidance();
      break;
    case 'D':
      Infrared_Remote_Control();
      break;
  }
}

void forward(int a, int b) {
  digitalWrite(2, LOW);
  analogWrite(5, a);
  digitalWrite(4, HIGH);
  analogWrite(6, b);
}

void backward(int a, int b) {
  digitalWrite(2, HIGH);
  analogWrite(5, a);
  digitalWrite(4, LOW);
  analogWrite(6, b);
}

void turn_left(int a, int b) {
  digitalWrite(2, LOW);
  analogWrite(5, a);
  digitalWrite(4, HIGH);
  analogWrite(6, b);
}

void turn_right(int a, int b) {
  digitalWrite(2, LOW);
  analogWrite(5, a);
  digitalWrite(4, HIGH);
  analogWrite(6, b);
}

void rotate_left(int a, int b) {
  digitalWrite(2, HIGH);
  analogWrite(5, a);
  digitalWrite(4, HIGH);
  analogWrite(6, b);
}

void rotate_right(int a, int b) {
  digitalWrite(2, LOW);
  analogWrite(5, a);
  digitalWrite(4, LOW);
  analogWrite(6, b);
}

void stopp() {
  digitalWrite(2, HIGH);
  analogWrite(5, 0);
  digitalWrite(4, LOW);
  analogWrite(6, 0);
}