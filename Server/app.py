from __future__ import print_function
from flask import Flask, render_template, g
import sqlite3
import serial
import time
import struct

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

def uc_probe_and_store(ucAddress):
	ser.reset_input_buffer()
	ser.write('' + struct.pack('!B',ucAddress))
	response  = ser.read(1)
	if response == ('' + struct.pack('!B',ucAddress)) :
		for i in range(1,5):
			timeStampStr = ser.read(4)
			timeStamp = struct.unpack("<I", timeStampStr)[0]
			ampValue = ord(ser.read(1)) 
			
			data_entry(get_db(),timeStamp, ucAddress, i, ampValue)
			print('sensor #',i)
			print('timeStamp: ', timeStamp)
			print('ampValue: ', ampValue)
			print('\n')	
	else:
		print("uC didn't send correct response")
		print("Expected :",ucAddress)
		print("Recieved :", hex(ord(response)))

# FLASK APP ----------------------------

app = Flask(__name__)

@app.route('/')
def index():
	db = get_db()
	db.cursor().execute('CREATE TABLE IF NOT EXISTS amp(timestamp REAL, uc INT, sensor INT, value REAL)')
	uc_probe_and_store(0x41)
	uc_probe_and_store(0x42)
	uc_probe_and_store(0x43)
	uc_probe_and_store(0x44)
	data = read_all_db(db)
	print(data)
	return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
    
@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

