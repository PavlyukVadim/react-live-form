const db = require('../config/db');

const getCommentByAnswerId = (id) => {
  return db.any(`
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
  console.log('answerId', answerId )
  let comments = await getCommentByAnswerId(answerId);
  let comment = comments[0];
  
  if(!comment || !comment.content) {
    return {};
  }
  return comment;
};

module.exports = CommentByAnswerResolver;
