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
    comment_id: { type: GraphQLString },
    content: { type: GraphQLString },
  },
});

module.exports = CommentType;
