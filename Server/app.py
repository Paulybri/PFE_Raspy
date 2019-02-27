from __future__ import print_function
from flask import Flask, render_template, g
import sqlite3
import serial
import time
import datetime
import struct
import threading
import atexit

# SQLITE FUNCTIONS ----------------------

DATABASE = 'database.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db
	
def data_entry(db,timestamp,uC,sensor,value):
	db.cursor().execute('INSERT INTO amp (timestamp,uC,sensor,value) VALUES(?, ?, ?, ?)',(timestamp,uC,sensor,value))
	db.commit()

def read_all_db(db):
	cursor = db.cursor()
	cursor.execute("SELECT * FROM 'amp'")
	data = cursor.fetchall()
	return data

# COMMUNICATION FUNCTIONS --------------
ser = serial.Serial('/dev/ttyACM0', 9600, timeout = 1)

ucAddresses = [0x41,0x42,0x43,0x44]

def uc_probe_and_store(ucAddress):
	ser.reset_input_buffer()
	ser.write('' + struct.pack('!B',ucAddress))
	response  = ser.read(1)
	if response == ('' + struct.pack('!B',ucAddress)) :
		for i in range(1,5):
			timeStamp = datetime.datetime.now()
			ampValue = ord(ser.read(1)) 
			
			data_entry(get_db(),timeStamp, ucAddress, i, ampValue)
			'''print('sensor #',i)
			print('timeStamp: ', timeStamp)
			print('ampValue: ', ampValue)
			print('\n')'''
	else:
		print("uC didn't send correct response")
		print("Expected :",ucAddress)
		print("Recieved :", hex(ord(response)))

# FLASK APP ----------------------------
POOL_TIME = 5 #Seconds

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
		db.cursor().execute('CREATE TABLE IF NOT EXISTS amp(timestamp STRING, uc INT, sensor INT, value REAL)')
		print('Probing uCs')
		for i in ucAddresses:
			uc_probe_and_store(i)
		
	# Set the next thread to happen
	probingThread = threading.Timer(POOL_TIME, probe, ())
	probingThread.start()   

# Initiate
probe()
# When you kill Flask (SIGTERM), clear the trigger for the next thread
atexit.register(interrupt)

@app.route('/')
def index():
	
	return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
    
@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


