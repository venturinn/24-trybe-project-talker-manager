// Ref.: https://stackoverflow.com/questions/940577/javascript-regular-expression-email-validation
const emailValidationRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const validateEmailExist = (req, res, next) => {
    const { email } = req.body;
  
    if (!email || email === '') {
      return res
        .status(400)
        .json({ message: 'O campo "email" é obrigatório' });
    }
    next();
  };

  const validateEmailFormat = (req, res, next) => {
    const { email } = req.body;
    
    if (!email.match(emailValidationRegex)) {
      return res
        .status(400)
        .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
  };
  
  module.exports = { validateEmailExist, validateEmailFormat };