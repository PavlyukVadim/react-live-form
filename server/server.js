const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use('/', express.static(__dirname + './../client/static'));

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

module.exports = app;
