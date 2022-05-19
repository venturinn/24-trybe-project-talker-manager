const express = require('express');
const bodyParser = require('body-parser');

const routers = require('./routers/routers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar.
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/', routers);

app.use((err, req, res, _next) => {
  res.status(500).json({ error: `Erro: ${err.message}` });
});

app.listen(PORT, () => {
  console.log('Online');
});
