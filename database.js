import pg from 'pg'
import dotenv from "dotenv"
dotenv.config()

let chachedDB = null;
let connectionParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export default async function connectDB() {
  if (chachedDB) {
    return chachedDB
  }

  if (process.env.DB_URL) {
    connectionParams = {
      connectionString: process.env.DB_URL,
    };
  }

  const { Pool } = pg

  const db = new Pool(connectionParams)

  await db.connect()

  chachedDB = db

  return db
}