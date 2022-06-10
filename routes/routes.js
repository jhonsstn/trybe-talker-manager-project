const { Router } = require('express');
const fs = require('fs');

const routes = Router();

routes.get('/talker', (request, response) => {
  const talkers = JSON.parse(
    fs.readFileSync(`${__dirname}/../talker.json`, { encoding: 'utf8' }),
  );
  response.status(200).json(talkers);
});

module.exports = routes;
