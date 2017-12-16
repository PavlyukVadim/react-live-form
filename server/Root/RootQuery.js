const graphql = require('graphql');
const Users = require('./../Users');
const Tests = require('./../Tests');
const Answers = require('./../Answers');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
} = graphql;

const {
  UserType,
  UserResolver,
} = Users;

const {
  TestType,
  TestResolver,
  AllTestsResolver,
} = Tests;

const {
  AnswerType,
  AnswerResolver,
  AnswersByStatusResolver,
} = Answers;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getUserById: {
      type: UserType,
      args: { id: { type: GraphQLString }},
      resolve: UserResolver,
    },
    getTestById: {
      type: TestType,
      args: { id: { type: GraphQLString }},
      resolve: TestResolver,
    },
    getAllTests: {
      type: new GraphQLList(TestType),
      args: { },
      resolve: AllTestsResolver,
    },
    getAnswerById: {
      type: AnswerType,
      args: { id: { type: GraphQLString }},
      resolve: AnswerResolver,
    },
    getAnswersByStatus: {
      type: new GraphQLList(AnswerType),
      args: { status: { type: GraphQLString }},
      resolve: AnswersByStatusResolver,
    },
  }
});

module.exports = RootQuery;
