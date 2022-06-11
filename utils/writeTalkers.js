const fs = require('fs');
const path = require('path');

function writeTalkers(data) {
  fs.writeFileSync(path.join(__dirname, '..', 'talker.json'), data, {
    encoding: 'utf8',
  });
}

module.exports = writeTalkers;
