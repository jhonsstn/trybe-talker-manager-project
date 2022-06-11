const fs = require('fs');

function talkerExists(req, res, next) {
  const { id } = req.params;
  const talkers = JSON.parse(
    fs.readFileSync(`${__dirname}/../talker.json`, { encoding: 'utf8' }),
  );
  try {
    if (!talkers[id - 1]) {
      throw new Error('Pessoa palestrante não encontrada');
    }
    next();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports = talkerExists;
