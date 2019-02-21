int incomingByte = 0;
uint32_t timeStamp = 0;
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
          uint8_t ts[4];
          ts[0] = timeStamp;
          ts[1] = timeStamp >>  8;
          ts[2] = timeStamp >> 16;
          ts[3] = timeStamp >> 24;
          
          Serial.write(incomingByte);
          
          Serial.write(ts, 4);
          Serial.write(ampValue);

          Serial.write(ts, 4);
          Serial.write(ampValue+1);

          Serial.write(ts, 4);
          Serial.write(ampValue+2);

          Serial.write(ts, 4);
          Serial.write(ampValue+3);


  }
}
