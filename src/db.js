const { Pool } = require("pg");

const pool = new Pool({
    user: 'postgres',
    password: 'Passw0rd',
    host: 'localhost',
    database: 'inventario_oasis',
});

module.exports = { pool };

