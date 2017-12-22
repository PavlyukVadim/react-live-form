const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
  	answer_id: { type: GraphQLString },
    comment_id: { type: GraphQLString },
    content: { type: GraphQLString },
  },
});

module.exports = CommentType;
