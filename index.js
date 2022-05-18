const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar.
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const getTalker = () => JSON.parse(fs.readFileSync('./talker.json', 'utf8'));

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
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(talkerFound);
});

// requisito 03:

const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

app.post('/login', (req, res) => {
 const { email, password } = req.body;
 const token = generateToken();

 if (!email || !password) { return res.status(404).json({ message: 'Digite email e senha' }); }

  res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
