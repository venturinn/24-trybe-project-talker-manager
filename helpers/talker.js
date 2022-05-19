const fs = require('fs').promises;

const getTalker = () =>
  fs
    .readFile('./talker.json', 'utf8')
    .then((data) => {
      console.log('O arquivo "./talker.json" foi lido com sucesso');
      return JSON.parse(data);
    })
    .catch((err) => {
      console.error(
        `Não foi possível ler o arquivo './talker.json'\n Erro: ${err}`,
      );
      return err;
    });

const addTalker = (newTalkersData) => {
  fs.writeFile('./talker.json', JSON.stringify(newTalkersData))
    .then(() => {
      console.log('Arquivo escrito com sucesso!');
    })
    .catch((err) => {
      console.error(`Erro ao escrever o arquivo: ${err.message}`);
    });
};

module.exports = { getTalker, addTalker };
