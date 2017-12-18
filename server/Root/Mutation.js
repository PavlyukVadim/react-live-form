const graphql = require('graphql');
const GraphQLJSON = require('graphql-type-json');
const Answers = require('./../Answers');
const Tests = require('./../Tests');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

const {
  AnswerType,
  AddAnswerByUserResolver,
} = Answers;

const {
  TestType,
  AddTestResolver,
} = Tests;

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    AddAnswerByUser: {
      type: AnswerType,
      args: {
        testId: { type: GraphQLString },
        userId: { type: GraphQLString },
        formAnswers: { type: GraphQLJSON },
        statusId: { type: GraphQLString }, 
      },
      resolve: AddAnswerByUserResolver,
    },
    AddTest: {
      type: TestType,
      args: {
        userId: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        formConfig: { type: GraphQLJSON },
      },
      resolve: AddTestResolver,
    },
  }
});

module.exports = Mutation;
