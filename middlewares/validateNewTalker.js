const validateNewTalkerName = (req, res, next) => {
  const newTalker = req.body;

  if (newTalker.name === undefined) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (newTalker.name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateNewTalkerAge = (req, res, next) => {
  const newTalker = req.body;

  if (newTalker.age === undefined) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (newTalker.age < 18) {
    return res
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateNewTalkerTalk = (req, res, next) => {
    const newTalker = req.body;
    const { talk } = newTalker;

    if (talk === undefined || talk.watchedAt === undefined || talk.rate === undefined) {
      return res.status(400).json({ 
          message:
           'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }
    
    next();
  };

const validateNewTalkerDate = (req, res, next) => {
  const newTalker = req.body;
  const { watchedAt } = newTalker.talk;

  // Ref.: https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy
  const dateValidationRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  if (!watchedAt.match(dateValidationRegex)) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateNewTalkerRate = (req, res, next) => {
  const newTalker = req.body;
  const { rate } = newTalker.talk;

  if (rate < 1 || rate > 5 || Number.isInteger(rate) === false) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = {
  validateNewTalkerName,
  validateNewTalkerAge,
  validateNewTalkerTalk,
  validateNewTalkerDate,
  validateNewTalkerRate,
};
