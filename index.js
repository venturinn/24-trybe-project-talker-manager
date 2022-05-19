const express = require('express');
const bodyParser = require('body-parser');

const crypto = require('crypto');
const talkersInfo = require('./helpers/talker');

const validatePassword = require('./middlewares/validatePassword');
const validateEmail = require('./middlewares/validateEmail');
const validateToken = require('./middlewares/validateToken');
const validateNewTalker = require('./middlewares/validateNewTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar.
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// requisito 01:
app.get('/talker', async (_req, res) => {
  const talkersData = await talkersInfo.getTalker();
  res.status(200).json(talkersData);
});

// requisito 02:
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkersData = await talkersInfo.getTalker();
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

// requisito 05:
app.post(
  '/talker',
  validateToken,
  validateNewTalker.validateNewTalkerName,
  validateNewTalker.validateNewTalkerAge,
  validateNewTalker.validateNewTalkerTalk,
  validateNewTalker.validateNewTalkerDate,
  validateNewTalker.validateNewTalkerRate,
 async (req, res) => {
    const newTalker = req.body;
    const talkersData = await talkersInfo.getTalker();
    newTalker.id = talkersData.length + 1;
    const newTalkersData = [...talkersData, newTalker];
    talkersInfo.addTalker(newTalkersData);

    res.status(201).json(newTalker);
  },
);

// Requisito 06:
app.put('/talker/:id', 
validateToken,
validateNewTalker.validateNewTalkerName,
validateNewTalker.validateNewTalkerAge,
validateNewTalker.validateNewTalkerTalk,
validateNewTalker.validateNewTalkerDate,
validateNewTalker.validateNewTalkerRate,
async (req, res) => {
  const { id } = req.params;
  const editedTalker = req.body;
  const talkersData = await talkersInfo.getTalker();

  const talkerDataFiltered = talkersData.filter((talker) => talker.id !== Number(id));

  editedTalker.id = Number(id);
  const editedTalkersData = [...talkerDataFiltered, editedTalker];
  talkersInfo.addTalker(editedTalkersData);

  res.status(200).json(editedTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
