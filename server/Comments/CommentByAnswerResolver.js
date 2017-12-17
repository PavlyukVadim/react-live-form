const db = require('../config/db');

const getCommentByAnswerId = (id) => {
  return db.one(`
    SELECT
      answer_id,
      comment_id,
      content
    FROM comments
    JOIN answers
    USING (answer_id)
    WHERE answer_id = $1`, id);
};

const CommentByAnswerResolver = async(parentValue, args) => {
  let answerId = args.id || parentValue.answer_id;
  let comment = await getCommentByAnswerId(answerId);
  return comment;
};

module.exports = CommentByAnswerResolver;
