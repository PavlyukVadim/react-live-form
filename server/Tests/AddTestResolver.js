const db = require('../config/db');

const addTest = (
  userId,
  title,
  description,
  formConfig
) => {
  return db.one(`
    INSERT INTO tests (owner, title, description, form_config)
    VALUES ($1, $2, $3, $4::jsonb);
  `, [userId, title, description, formConfig]);
};

const AddTestResolver = async(
  parentValue, {
    userId,
    title,
    description,
    formConfig,
  }) => {
  const answer = addTest(
    userId,
    title,
    description,
    formConfig
  );
  return {};
};

module.exports = AddTestResolver;
