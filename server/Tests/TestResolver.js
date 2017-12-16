const db = require('../config/db');

const getTestById = (id) => {
  return db.one('SELECT * FROM tests WHERE test_id = $1', id);
};

const TestResolver = async(parentValue, args) => {
  const test = await getTestById(args.id);
  return test;
};

module.exports = TestResolver;
