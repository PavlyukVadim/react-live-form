const db = require('../config/db');

const getTestById = (id) => {
  return db.one('SELECT * FROM tests WHERE test_id = $1', id);
};

const TestResolver = async(parentValue, args) => {
  let test = await getTestById(args.id);
  test.formConfig = test.form_config;
  return test;
};

module.exports = TestResolver;
