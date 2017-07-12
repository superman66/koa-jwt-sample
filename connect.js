const monk = require('monk');
const url = 'localhost:27017/library';
const db = monk(url);

module.exports = db;
