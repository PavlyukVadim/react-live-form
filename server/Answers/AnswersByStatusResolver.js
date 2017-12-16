const db = require('../config/db');

const getAnswersByStatus = (status) => {
  return db.any(`
    SELECT
      answer_id,
      test_id,
      user_id,
      form_answers,
      status_id,
      passage_date,
      statuses.type
    FROM answers
    JOIN statuses
    USING (status_id)
    WHERE statuses.type = $1
  `, status);
};

const AnswersByStatusResolver = async(parentValue, { status }) => {
  const answers = await getAnswersByStatus(status);
  return answers;
};

module.exports = AnswersByStatusResolver;
