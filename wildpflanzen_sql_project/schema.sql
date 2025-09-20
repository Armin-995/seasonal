-- Schema for Wildpflanzen project (SQLite)
PRAGMA foreign_keys = OFF;

CREATE TABLE IF NOT EXISTS wildkraeuter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    standort TEXT,
    gruende TEXT,
    monate TEXT
);

CREATE TABLE IF NOT EXISTS fruechte_beeren (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    standort TEXT,
    gruende TEXT,
    monate TEXT
);

CREATE TABLE IF NOT EXISTS nuesse_huelsenfruechte (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    standort TEXT,
    gruende TEXT,
    monate TEXT
);