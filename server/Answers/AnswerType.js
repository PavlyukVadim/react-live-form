const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;
const GraphQLJSON = require('graphql-type-json');
const Tests = require('./../Tests');
const {
  TestType,
  TestResolver,
  AllTestsResolver,
} = Tests;

const AnswerType = new GraphQLObjectType({
  name: 'Answer',
  fields: {
    answer_id: { type: GraphQLString },
    status_id: { type: GraphQLString },
    test: {
      type: TestType,
      resolve: TestResolver,
    },
  }
});

module.exports = AnswerType;
