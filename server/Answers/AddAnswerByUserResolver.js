const db = require('../config/db');
const Answers = require('./AnswerType');

const {
  AnswerType,
  AnswerResolver,
} = Answers;

const addAnswerByUser = (
  testId,
  userId,
  formAnswers,
  statusId
) => {
  return db.one(`
    INSERT INTO answers (test_id, user_id, form_answers, status_id)
    VALUES ($1, $2, $3::jsonb, $4);
  `, [testId, userId, formAnswers, statusId]);
};

const AddAnswerByUserResolver = async(
  parentValue, {
    testId,
    userId,
    formAnswers,
    statusId,
  }) => {
  const answer = addAnswerByUser(
    testId,
    userId,
    formAnswers,
    statusId
  );
  return {};
};

module.exports = AddAnswerByUserResolver;
