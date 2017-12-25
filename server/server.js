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

app.get('/stats', (req, res) => {
  db.any(`
    SELECT * FROM crosstab(
    $$
      SELECT
        date_part('year', reg_date) AS year,
        date_part('month', reg_date) AS month,
        COUNT(*)
      FROM users
      GROUP BY year, month
      ORDER BY 1
    $$,
    $$ SELECT m FROM generate_series(1,12) m $$
  ) AS (
    year int,
    "Jan" int,
    "Feb" int,
    "Mar" int,
    "Apr" int,
    "May" int,
    "Jun" int,
    "Jul" int,
    "Aug" int,
    "Sep" int,
    "Oct" int,
    "Nov" int,
    "Dec" int
  )`)
    .then((data) => res.send(data));
})

module.exports = app;
