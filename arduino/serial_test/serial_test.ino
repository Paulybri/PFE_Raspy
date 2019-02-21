int incomingByte = 0;
int timeStamp = 0;
int timeStampCounter = 0;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:

  //timestamp simulation counter
  timeStampCounter++;
  if (timeStampCounter % 1000 == 0){
    timeStamp++;
  }
   // send data only when you receive data:
  if (Serial.available() > 0) {
          // read the incoming byte:
          incomingByte = Serial.read();          
          int ampValue;
          switch (incomingByte) {
            case 0x41:              
              ampValue = 10;
            case 0x42:              
              ampValue = 20;
            case 0x43:              
              ampValue = 30;
            case 0x44:              
              ampValue = 40;            
          }
    
          Serial.write(timestamp);
          Serial.write(ampValue);
          Serial.write(timestamp);
          Serial.write(ampValue+1)
          Serial.write(timestamp);
          Serial.write(ampValue+2)
          Serial.write(timestamp);
          Serial.write(ampValue+3)
  }
}
