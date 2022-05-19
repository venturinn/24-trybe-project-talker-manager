const validatePasswordExist = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    return res
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  next();
};

const validatePasswordFormat = (req, res, next) => {
  const { password } = req.body;
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = { validatePasswordExist, validatePasswordFormat };
