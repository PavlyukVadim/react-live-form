const graphql = require('graphql');
const Users = require('./../Users');
const Tests = require('./../Tests');

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
  }
});

module.exports = RootQuery;
