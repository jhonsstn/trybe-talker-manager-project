function verifyName(name) {
  if (!name) throw new Error('O campo "name" é obrigatório');
  if (name.length < 3) {
    throw new Error('O "name" deve ter pelo menos 3 caracteres');
  }
}

function verifyAge(age) {
  if (!age) throw new Error('O campo "age" é obrigatório');
  if (age < 18) {
    throw new Error('A pessoa palestrante deve ser maior de idade');
  }
}

function verifyTalk(talk) {
  if (!talk) throw new Error('O campo "talk" é obrigatório');
}

function verifyRate(rate) {
  if (rate === undefined) throw new Error('O campo "rate" é obrigatório');
  if (rate < 1 || rate > 5) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
}

function verifyWatchedAt(watchedAt) {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[-/.](0[1-9]|1[012])[- /.](19|20)\d\d$/gm;
  if (!watchedAt) throw new Error('O campo "watchedAt" é obrigatório');
  if (!dateRegex.test(watchedAt)) {
    throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
  }
}

function newTalkerVerify(req, res, next) {
  const { name, age, talk } = req.body;
  try {
    verifyName(name);
    verifyAge(age);
    verifyTalk(talk);
    verifyRate(talk.rate);
    verifyWatchedAt(talk.watchedAt);
    next();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

module.exports = newTalkerVerify;
