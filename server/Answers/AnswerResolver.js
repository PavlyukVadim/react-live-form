const db = require('../config/db');

const getAnswerById = (id) => {
  return db.one('SELECT * FROM answers WHERE answer_id = $1', id);
};

const AnswerResolver = async(parentValue, args) => {
  const test = await getAnswerById(args.id);
  return test;
};

module.exports = AnswerResolver;
