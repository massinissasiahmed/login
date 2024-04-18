require('dotenv').config();
const knexConfig = require('./knexfile.js').development;
const knex = require('knex')(knexConfig);

module.exports = knex;
