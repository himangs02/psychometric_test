import mysql from 'mysql2/promise';

let pool;

function getPool() {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      return {
        query: async () => [[]],
        execute: async () => [{ insertId: 0 }],
      };
    }
    pool = mysql.createPool(process.env.DATABASE_URL);
  }
  return pool;
}

const db = {
  query: (...args) => getPool().query(...args),
  execute: (...args) => getPool().execute(...args),
};

export default db;
