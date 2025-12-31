import mysql from "mysql2/promise";
import dotenv from "dotenv"
dotenv.config()
export const db = mysql.createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  port: Number(process.env.DB_PORT)!,
  waitForConnections: true
});


// test the db connection
export const testDB = async () => {
  try {
    await db.query("SELECT 1");
    console.log("MySQL connected");
  } catch (err) {
    console.error("MySQL connection failed", err);
  }
};
