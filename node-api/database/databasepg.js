require('dotenv').config();
const {Client} = require('pg')

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

client.connect();

const fetchData = async () => {
  try {
    const res = await client.query(`Select * from utilisateur`); // Example query
    console.log(res.rows); // Output the results
  } catch (err) {
    console.error(err);
  }
};

// Run the function to fetch data
fetchData();
