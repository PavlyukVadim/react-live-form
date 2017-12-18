const graphql = require('graphql');
const GraphQLJSON = require('graphql-type-json');
const Answers = require('./../Answers');

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
  }
});

module.exports = Mutation;
