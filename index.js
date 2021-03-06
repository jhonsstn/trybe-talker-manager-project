const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use(routes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
