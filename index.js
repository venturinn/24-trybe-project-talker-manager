const express = require('express');
const bodyParser = require('body-parser');

const crypto = require('crypto');
const getTalker = require('./helpers/talker');
const validatePassword = require('./middlewares/validatePassword');
const validateEmail = require('./middlewares/validateEmail');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar.
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// requisito 01:
app.get('/talker', (_req, res) => {
  const talkersData = getTalker();
  res.status(200).json(talkersData);
});

// requisito 02:
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talkersData = getTalker();
  const talkerFound = talkersData.find((talker) => talker.id === Number(id));

  if (!talkerFound) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(talkerFound);
});

// requisito 03 e 04:

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

app.post(
  '/login',
  validatePassword.validatePasswordExist,
  validatePassword.validatePasswordFormat,
  validateEmail.validateEmailExist,
  validateEmail.validateEmailFormat,
  (_req, res) => {
    const token = generateToken();

    res.status(200).json({ token });
  },
);

app.listen(PORT, () => {
  console.log('Online');
});
