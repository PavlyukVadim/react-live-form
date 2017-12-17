const graphql = require('graphql');
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
      args: { id: { type: GraphQLString }},
      resolve: AddAnswerByUserResolver,
    },
  }
});

module.exports = Mutation;
