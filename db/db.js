const postgres = require('postgres');

const sql = postgres({
    host: 'localhost',
    port: 5432,
    database: 'phonebook',
    username: 'postgres',
    password: 'postgres'
});

module.exports = sql;