import sqlite3

with open('./database.csv', 'w+') as write_file:
# open a file to write to
    conn = sqlite3.connect('./database.db')
    # connect to your database
    cursor = conn.cursor()
    # create a cursor object (which lets you address the table results individually)
    for row in cursor.execute('SELECT * FROM amp'):
    # use the cursor as an iterable
        write_file.write(row)