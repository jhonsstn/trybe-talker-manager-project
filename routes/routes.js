const { Router } = require('express');
const crypto = require('crypto');
const readTalkers = require('../utils/readTalkers');
const writeTalkers = require('../utils/writeTalkers');
const talkerExists = require('../middlewares/talkerExistsMiddleware');
const loginVerification = require('../middlewares/loginVerificationMiddleware');
const talkerVerification = require('../middlewares/talkerVerificationMiddleware');
const authorizationVerification = require('../middlewares/authorizationVerificationMiddleware');

const routes = Router();

routes.get('/talker/search', authorizationVerification, (req, res) => {
  const { q } = req.query;
  const talkers = readTalkers();
  if (!q === undefined) res.status(200).json(talkers);
  const filteredTalkers = talkers.filter((talker) => talker.name.includes(q));
  if (filteredTalkers.length === 0) res.status(200).json([]);
  res.status(200).json(filteredTalkers);
});

routes.get('/talker', (_request, res) => {
  const talkers = readTalkers();
  res.status(200).json(talkers);
});

routes.get('/talker/:id', talkerExists, (req, res) => {
  const { id } = req.params;
  const talkers = readTalkers();
  const requestedTalker = talkers.find((talker) => talker.id === Number(id));
  res.status(200).json(requestedTalker);
});

routes.post('/login', loginVerification, (_request, res) => {
  res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
});

routes.post(
  '/talker',
  authorizationVerification,
  talkerVerification,
  (req, res) => {
    const talkers = readTalkers();
    let id = 1;
    if (talkers.length === 0) {
      id = 1;
    } else {
      id = talkers[talkers.length - 1].id + 1;
    }
    const newTalkers = [...talkers, { id, ...req.body }];
    writeTalkers(JSON.stringify(newTalkers));
    res.status(201).json({ id, ...req.body });
  },
);

routes.put(
  '/talker/:id',
  authorizationVerification,
  talkerVerification,
  (req, res) => {
    const { id } = req.params;
    const talkers = readTalkers();
    const newTalkers = talkers.map((talker) => {
      if (talker.id === Number(id)) {
        return { id: Number(id), ...req.body };
      }
      return talker;
    });
    writeTalkers(JSON.stringify(newTalkers));
    res.status(200).json({ id: Number(id), ...req.body });
  },
);

routes.delete('/talker/:id', authorizationVerification, (req, res) => {
  const { id } = req.params;
  const talkers = readTalkers();
  const newTalkers = talkers.filter((talker) => talker.id !== Number(id));
  writeTalkers(JSON.stringify(newTalkers));
  res.sendStatus(204);
});

module.exports = routes;
