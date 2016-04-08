/*
  DigitalReadSerial
 Reads a digital input on pin 2, prints the result to the serial monitor

 This example code is in the public domain.
 */

// digital pin 2 has a pushbutton attached to it. Give it a name:
int but2 = 2;
int but3 = 3;
int but4 = 4;
int but5 = 5;
 int buttonState2;
  int buttonState3;
  int buttonState4;
  int buttonState5;

// the setup routine runs once when you press reset:
void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  // make the pushbutton's pin an input:
  pinMode(but2, INPUT);
  pinMode(but3, INPUT);
  pinMode(but4, INPUT);
  pinMode(but5, INPUT);
}

// the loop routine runs over and over again forever:
void loop() {
  // read the input pin:
   buttonState2 = digitalRead(but2);
   buttonState3 = digitalRead(but3);
   buttonState4 = digitalRead(but4);
   buttonState5 = digitalRead(but5);
  // print out the state of the button:

  if (buttonState2==1){
    Serial.println("pad 2");
      delay(50);
    }
    if (buttonState3==1){
    Serial.println("pad 3");
      delay(50);
    }
    if (buttonState4==1){
    Serial.println("pad 4");
      delay(50);
    }
    if (buttonState5==1){
    Serial.println("pad 5");
    delay(50);
    }
     buttonState2 = 0;
   buttonState3 = 0;
   buttonState4 = 0;
   buttonState5 = 0;
  delay(50);        // delay in between reads for stability
}



