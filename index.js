const express = require("express");
const bodyParser = require("body-parser");

const fs = require("fs");
const { get } = require("express/lib/response");

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = "3000";

// não remova esse endpoint, e para o avaliador funcionar.
app.get("/", (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});


const getTalker = () => {
  return JSON.parse(fs.readFileSync("./talker.json", "utf8"));
};

// requisito 01:
app.get("/talker", (_req, res) => {
  const talkersData = getTalker();
  res.status(200).json(talkersData);
});

app.listen(PORT, () => {
  console.log("Online");
});
