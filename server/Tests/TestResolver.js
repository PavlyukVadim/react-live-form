const db = require('../config/db');

const getTestById = (id) => {
  return db.one('SELECT * FROM tests WHERE test_id = $1', id);
};

const TestResolver = async(parentValue, args) => {
	let testId = args.id || parentValue.test_id;
  let test = await getTestById(testId);
  test.formConfig = test.form_config;
  return test;
};

module.exports = TestResolver;
