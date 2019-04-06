import sqlite3
import csv

with sqlite3.connect("database.db") as connection:
    print("opened db")
    csvWriter = csv.writer(open("database.csv", "w"))
    c = connection.cursor()

    #rows = c.fetchall()
    rows = c.execute('SELECT * from amp')
    print('exporting...')
    for x in rows:
        csvWriter.writerow(x)
    print('done')
