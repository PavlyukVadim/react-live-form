const pgp = require('pg-promise')();
const db = pgp('postgres://vadim:vadim@localhost:5432/TestingSystem');
console.log('call db');
module.exports = db;
