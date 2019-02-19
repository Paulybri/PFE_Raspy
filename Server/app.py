from __future__ import print_function
from flask import Flask, render_template, g
import sqlite3

# SQLITE FUNCTIONS ----------------------

DATABASE = 'database.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db
	
def data_entry(db,timestamp,value):
	db.cursor().execute('INSERT INTO amp (timestamp, value) VALUES(?, ?)',(timestamp, value))
	db.commit()

def read_all_db(db):
	db.cursor().execute('SELECT * FROM amp')
	data = db.cursor().fetchall()
	return data

# FLASK APP ----------------------------

app = Flask(__name__)

@app.route('/')
def index():
	db = get_db()
	db.cursor().execute('CREATE TABLE IF NOT EXISTS amp(timestamp REAL, value REAL)')
	data_entry(db, 001, 111)
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

