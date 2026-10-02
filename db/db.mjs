import sqlite3 from "sqlite3"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url))
const db = new sqlite3.Database(join(__dirname, "../database.sqlite"),(err)=>{
    if(err){
        console.error(`Ошибка при подключении к базе данных`)
    }
    else{
        console.log(`база данных подключена`)
    }
})
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        username TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`)
export default db