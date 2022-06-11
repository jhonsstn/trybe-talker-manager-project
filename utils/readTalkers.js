const fs = require('fs');
const path = require('path');

function readTalkers() {
  const talkers = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'talker.json'), {
      encoding: 'utf8',
    }),
  );
  return talkers;
}

module.exports = readTalkers;
