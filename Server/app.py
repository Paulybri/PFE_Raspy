from __future__ import print_function
from flask import Flask, render_template, g, jsonify
import sqlite3
import serial
import time
import datetime
import struct
import threading
import atexit
import math

#global sensorNo = 4
#global uCNo = 2

# SQLITE FUNCTIONS ----------------------

DATABASE = 'database.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db
	
def data_entry(db,timestamp,uC,sensor,value):
	db.cursor().execute('INSERT INTO amp (timestamp,uC,sensor,current) VALUES(?, ?, ?, ?)',(timestamp,uC,sensor,value))
	db.commit()

def read_all_db(db):
	cursor = db.cursor()
	cursor.execute("SELECT * FROM 'amp'")
	data = cursor.fetchall()
	return data

# COMMUNICATION FUNCTIONS --------------
#port = '/dev/ttyAMA0' #GPIO UART
#port = '/dev/ttyACM0' #USB PORT
port = '/dev/ttyUSB0' #USB PORT

ucAddresses = [0x41, 0x42]
sensorsPerUc = 4
global currentArray
#currentArray = [len(ucAddresses)*sensorsPerUc]
#print('lenght: ',len(currentArray))

def uc_probe_and_store(ucAddress, uCIndex):
	ser = serial.Serial(
	port=port,\
	baudrate=9600,\
	timeout=1,\
	parity=serial.PARITY_NONE,\
	stopbits=serial.STOPBITS_ONE,\
	bytesize=serial.EIGHTBITS)
	
	ser.write('' + struct.pack('!B',ucAddress))
	response  = ser.read(1)
	if response == ('' + struct.pack('!B',ucAddress)) :
		#print('Recieved acknowledgment from uC')
		for i in range(0,4):#(0,4):
			timeStamp = datetime.datetime.now()
			variance = struct.unpack('!H',ser.read(2))
			standDev = math.sqrt(variance[0])
			global current
			current = (standDev*0.235)-0.5857
			global currentArray
			currentArray.append(current)
			data_entry(get_db(),timeStamp, ucAddress, i, current)
			#print('sensor #',i)
			#print('timeStamp: ', timeStamp)
			#print('standard deviation: ', standDev)
			#print('current: ',current)
			#print('\n')
		#print('________________________________\n')
				
	else:
		#if len(response) > 0:
			#print("uC didn't send correct response")
			#print("Expected :",ucAddress)
			#print("Recieved :", hex(ord(response)))
		#else:
		print("Delay expired, no response")
	ser.close()

# FLASK APP ----------------------------
POOL_TIME = 1 #Seconds

# lock to control access to variable
dataLock = threading.Lock()
# thread handler
probingThread = threading.Thread()

app = Flask(__name__)

def interrupt():
	global yourThread
	probingThread.cancel()
	
def probe():
	global probingThread
	with dataLock and app.app_context():

		db = get_db()
		db.cursor().execute('CREATE TABLE IF NOT EXISTS amp(timestamp STRING, uc INT, sensor INT, current REAL)')
		#print('Probing uCs')
		global currentArray
		currentArray = []
		for i in range(0,len(ucAddresses)):
			uc_probe_and_store(ucAddresses[i],i)
		
	# Set the next thread to happen
	probingThread = threading.Timer(POOL_TIME, probe, ())
	probingThread.start()   

# Initiate
probe()
# When you kill Flask (SIGTERM), clear the trigger for the next thread
atexit.register(interrupt)
	
@app.route('/parametres', methods=['GET', 'POST'])
def parametres():
	return render_template('parametres.html')	

@app.route('/background_process')
def background_process():
	return jsonify(currentArray = currentArray)

@app.route('/')
def index():
	return render_template('index.html')

if __name__ == '__main__':
	app.run(debug=False, host='0.0.0.0')
    
@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()
