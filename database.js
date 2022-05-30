import pg from 'pg'
import dotenv from "dotenv"
dotenv.config()

let chachedDB = null;
let connectionParams = {
 
}

export default async function connectDB() {
  if (chachedDB) {
    return chachedDB
  }

  if (process.env.DB_URL) {
    connectionParams = {
      connectionString: process.env.DB_URL,
      ssl: {
          rejectUnauthorized: false
      }
    }
  }

  const { Pool } = pg

  const db = new Pool(connectionParams)

  await db.connect()

  chachedDB = db

  return db
}