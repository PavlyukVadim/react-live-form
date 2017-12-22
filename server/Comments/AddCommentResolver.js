const db = require('../config/db');

const addComment = (
  answerId,
  userId,
  content
) => {
  return db.one(`
    INSERT INTO comments (answer_id, user_id, content)
    VALUES ($1, $2, $3);
  `, [answerId, userId, content]);
};

const AddCommentResolver = async(
  parentValue, {
    answerId,
    userId,
    content
  }) => {
  const answer = addComment(
    answerId,
    userId,
    content
  );
  return {};
};

module.exports = AddCommentResolver;
