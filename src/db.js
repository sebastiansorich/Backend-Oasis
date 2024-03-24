const { Pool } = require("pg");
import { Config } from 'dotenv';

const pool = new Pool({
   connectionString: process.env.DATABASE_URL
});

module.exports = { pool };

