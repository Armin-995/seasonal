"""loader.py - create SQLite DB from schema.sql and inserts.sql"""
import sqlite3, os
here = os.path.dirname(__file__)
db_path = os.path.join(here, "wildpflanzen.db")
conn = sqlite3.connect(db_path)
cur = conn.cursor()
with open(os.path.join(here, "schema.sql"), "r", encoding="utf-8") as f:
    cur.executescript(f.read())
with open(os.path.join(here, "inserts.sql"), "r", encoding="utf-8") as f:
    cur.executescript(f.read())
conn.commit()
conn.close()
print("Created", db_path)