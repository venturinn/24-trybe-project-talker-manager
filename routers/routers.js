const express = require('express');

const router = express.Router();
const rescue = require('express-rescue');

const crypto = require('crypto');
const talkersInfo = require('../helpers/talker');

const validatePassword = require('../middlewares/validatePassword');
const validateEmail = require('../middlewares/validateEmail');
const validateToken = require('../middlewares/validateToken');
const validateNewTalker = require('../middlewares/validateNewTalker');

// requisito 01:
router.get(
  '/talker',
  rescue(async (_req, res) => {
    const talkersData = await talkersInfo.getTalker();
    res.status(200).json(talkersData);
  }),
);

// Requisito 08:
router.get(
  '/talker/search',
  validateToken,
  rescue(async (req, res) => {
    const { q } = req.query;
    const talkersData = await talkersInfo.getTalker();

    if (q === undefined || q === '') {
      res.status(200).json(talkersData);
    }

    const talkerDataFiltered = talkersData.filter((talker) =>
      talker.name.includes(q));

    res.status(200).json(talkerDataFiltered);
  }),
);

// requisito 02:
router.get(
  '/talker/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const talkersData = await talkersInfo.getTalker();
    const talkerFound = talkersData.find((talker) => talker.id === Number(id));

    if (!talkerFound) {
      return res
        .status(404)
        .json({ message: 'Pessoa palestrante não encontrada' });
    }

    res.status(200).json(talkerFound);
  }),
);

// requisito 03 e 04:
function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

router.post(
  '/login',
  validatePassword.validatePasswordExist,
  validatePassword.validatePasswordFormat,
  validateEmail.validateEmailExist,
  validateEmail.validateEmailFormat,
  rescue((_req, res) => {
    const token = generateToken();

    res.status(200).json({ token });
  }),
);

// requisito 05:
router.post(
  '/talker',
  validateToken,
  validateNewTalker.validateNewTalkerName,
  validateNewTalker.validateNewTalkerAge,
  validateNewTalker.validateNewTalkerTalk,
  validateNewTalker.validateNewTalkerDate,
  validateNewTalker.validateNewTalkerRate,
  rescue(async (req, res) => {
    const newTalker = req.body;
    const talkersData = await talkersInfo.getTalker();
    newTalker.id = talkersData.length + 1;
    const newTalkersData = [...talkersData, newTalker];
    talkersInfo.addTalker(newTalkersData);

    res.status(201).json(newTalker);
  }),
);

// Requisito 06:
router.put(
  '/talker/:id',
  validateToken,
  validateNewTalker.validateNewTalkerName,
  validateNewTalker.validateNewTalkerAge,
  validateNewTalker.validateNewTalkerTalk,
  validateNewTalker.validateNewTalkerDate,
  validateNewTalker.validateNewTalkerRate,
  rescue(async (req, res) => {
    const { id } = req.params;
    const editedTalker = req.body;
    const talkersData = await talkersInfo.getTalker();

    const talkerDataFiltered = talkersData.filter(
      (talker) => talker.id !== Number(id),
    );

    editedTalker.id = Number(id);
    const editedTalkersData = [...talkerDataFiltered, editedTalker];
    talkersInfo.addTalker(editedTalkersData);

    res.status(200).json(editedTalker);
  }),
);

// Requisito 07:
router.delete(
  '/talker/:id',
  validateToken,
  rescue(async (req, res) => {
    const { id } = req.params;
    const talkersData = await talkersInfo.getTalker();

    const talkerDataFiltered = talkersData.filter(
      (talker) => talker.id !== Number(id),
    );
    talkersInfo.addTalker(talkerDataFiltered);

    res.status(204).json();
  }),
);

module.exports = router;
