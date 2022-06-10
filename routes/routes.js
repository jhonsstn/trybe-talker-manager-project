const { Router } = require('express');
const fs = require('fs');
const talkerExists = require('../middlewares/talkerExistsMiddleware');

const routes = Router();

routes.get('/talker', (_request, response) => {
  const talkers = JSON.parse(
    fs.readFileSync(`${__dirname}/../talker.json`, { encoding: 'utf8' }),
  );
  response.status(200).json(talkers);
});

routes.get('/talker/:id', talkerExists, (request, response) => {
  const { id } = request.params;
  const talkers = JSON.parse(
    fs.readFileSync(`${__dirname}/../talker.json`, { encoding: 'utf8' }),
  );
  const requestedTalker = talkers.find((talker) => talker.id === Number(id));
  response.status(200).json(requestedTalker);
});

module.exports = routes;
