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
  UserByNameResolver,
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
  AnswersByStatusAndUserIdResolver,
} = Answers;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    userById: {
      type: UserType,
      args: { id: { type: GraphQLString }},
      resolve: UserResolver,
    },
    userByName: {
      type: UserType,
      args: { name: { type: GraphQLString }},
      resolve: UserByNameResolver,
    },
    testById: {
      type: TestType,
      args: { id: { type: GraphQLString }},
      resolve: TestResolver,
    },
    allTests: {
      type: new GraphQLList(TestType),
      args: { },
      resolve: AllTestsResolver,
    },
    answerById: {
      type: AnswerType,
      args: { id: { type: GraphQLString }},
      resolve: AnswerResolver,
    },
    answersByStatus: {
      type: new GraphQLList(AnswerType),
      args: { status: { type: GraphQLString }},
      resolve: AnswersByStatusResolver,
    },
    answersByStatusAndUserId: {
      type: new GraphQLList(AnswerType),
      args: {
        userId: { type: GraphQLString },
        status: { type: GraphQLString },
      },
      resolve: AnswersByStatusAndUserIdResolver,
    },
  }
});

module.exports = RootQuery;
