import sqlite3 from 'sqlite3';

sqlite3.verbose();

const db = new sqlite3.Database('./NewsDatabase.db', (err) => {
    if (err) {
        console.error('Database opening error:', err);
    } else {
        console.log('Database opened');
    }
    });

    let createQuery = 
    `CREATE TABLE IF NOT EXISTS News (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        Topic TEXT,
        Anchor TEXT,
        NewsText TEXT,
        ImageID INTEGER,
        Date DATE
    )`;

    db.run(createQuery, err => {
        if (err) {
            console.error('Table creation error:', err);
        } else {
            console.log('Table created');
        }
    });
    export default db;