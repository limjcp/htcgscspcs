// src/utils/db.ts
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.AIVEN_MYSQL_HOST, // Your Aiven MySQL host
  user: process.env.AIVEN_MYSQL_USER, // Your Aiven MySQL user
  password: process.env.AIVEN_MYSQL_PASSWORD, // Your Aiven MySQL password
  database: process.env.AIVEN_MYSQL_DATABASE, // The database you want to access
  ssl: {
    rejectUnauthorized: true, // Aiven requires an SSL connection
  },
});

export default db;
