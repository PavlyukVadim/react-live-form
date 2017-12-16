const db = require('../config/db');

const getTests = () => {
  return db.any('SELECT * FROM tests');
};

const AllTestsResolver = async(parentValue) => {
  const tests = await getTests();
  return tests;
};

module.exports = AllTestsResolver;
