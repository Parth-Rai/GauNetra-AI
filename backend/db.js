const { Pool } = require('pg');
const dns = require('dns').promises; 
const url = require('url');


async function getIPv4Host(hostname) {
  try {
    const { address } = await dns.lookup(hostname, 4); 
    console.log(`Resolved ${hostname} to IPv4: ${address}`);
    return address;
  } catch (err) {
    console.error(`Error resolving hostname ${hostname} to IPv4:`, err);
    return hostname; 
  }
}

async function createPool() {
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  
  const ipv4Host = await getIPv4Host(params.hostname);

  const pool = new Pool({
    user: auth[0],
    password: auth[1],
    host: ipv4Host, 
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: {
      rejectUnauthorized: false
    }
  });

  
  try {
    const client = await pool.connect();
    console.log('Successfully connected to the database via IPv4.');
    client.release();
  } catch (err) {
    console.error('Failed to connect to the database:', err);
  }

  return pool;
}


const poolPromise = createPool();

module.exports = {
 
  query: async (text, params) => {
    const pool = await poolPromise;
    return pool.query(text, params);
  },
};