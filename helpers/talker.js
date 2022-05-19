const fs = require('fs');

const getTalker = () => JSON.parse(fs.readFileSync('./talker.json', 'utf8'));

module.exports = getTalker;
