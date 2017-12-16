const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

const AnswerType = new GraphQLObjectType({
  name: 'Answer',
  fields: {
    answer_id: { type: GraphQLString },
    status_id: { type: GraphQLString },
  }
});

module.exports = AnswerType;
