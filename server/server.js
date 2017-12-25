const express = require('express');
const cors = require('cors');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const db = require('./config/db');

const app = express();

app.use('/', express.static(__dirname + './../client/static'));

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
};
app.use(cors(corsOptions));

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.get('/stat', (req, res) => {
  db.one('SELECT * FROM tests WHERE test_id = 1')
    .then((data) => res.send(data));
})

module.exports = app;
