// src/config/db.ts
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT as string),     // Corrected to DB_PORT for MySQL port
    database: process.env.DB_NAME, // Corrected to DB_NAME for the database name
    waitForConnections: true,
    connectionLimit: 10,           // Adjust based on your needs
    queueLimit: 0,
});


export default pool;
