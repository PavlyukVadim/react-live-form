const express = require('express');
const cors = require('cors');

const app = express();

app.use('/', express.static(__dirname + './../client/static'));

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
};
app.use(cors(corsOptions));

module.exports = app;
