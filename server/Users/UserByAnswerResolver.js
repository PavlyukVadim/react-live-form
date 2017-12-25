const db = require('../config/db');

const getUserByAnswer = (answerId) => {
  return db.any(`
    SELECT
      user_id,
      name,
      role_id,
      answer_id
    FROM answers
    JOIN users
    USING (user_id)
    WHERE answer_id = $1
  `, answerId);
};

const UserByAnswerResolver = async(parentValue, args) => {
  const users = await getUserByAnswer(parentValue.answer_id);
  const user = users[0] || {};
  return user;
};

module.exports = UserByAnswerResolver;
