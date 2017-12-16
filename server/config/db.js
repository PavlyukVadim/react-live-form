const pgp = require('pg-promise')();
const db = pgp('postgres://vadim:vadim@localhost:5432/TestingSystem');

module.exports = db;
