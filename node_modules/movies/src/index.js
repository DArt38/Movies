var uniqueRandomArray = require('unique-random-array');
var moviesNames = require('./movies.json');

module.exports = {
    all: moviesNames,
    random: uniqueRandomArray(moviesNames)
};

