const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

console.log('DB instance created');

module.exports = db;