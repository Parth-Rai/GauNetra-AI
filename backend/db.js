const { Pool } = require('pg');
const url = require('url'); 

const isProduction = process.env.NODE_ENV === 'production';

let pool;

if (isProduction) {
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  pool = new Pool({
    user: auth[0],
    password: auth[1],
    host: params.hostname, 
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: { rejectUnauthorized: false },
    family: 4, 
  });

} else {
  pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });
}

module.exports = {
  query: (text, params) => pool.query(text, params),
};