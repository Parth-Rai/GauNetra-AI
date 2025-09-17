const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


pool.on('connect', (client) => {
  client.query('SET search_path TO gaunetra_schema, public');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};