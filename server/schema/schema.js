const graphql = require('graphql');
const { GraphQLSchema } = graphql;

const Root = require('./../Root');
const {
  RootQuery,
  Mutation,
} = Root;

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
