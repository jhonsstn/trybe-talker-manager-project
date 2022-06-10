const fs = require('fs');

function talkerExists(request, response, next) {
  const { id } = request.params;
  const talkers = JSON.parse(
    fs.readFileSync(`${__dirname}/../talker.json`, { encoding: 'utf8' }),
  );
  try {
    if (!talkers[id - 1]) {
      throw new Error('Pessoa palestrante não encontrada');
    }
    next();
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
}

module.exports = talkerExists;
