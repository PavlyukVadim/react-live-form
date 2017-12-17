const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
} = graphql;
const GraphQLJSON = require('graphql-type-json');

const TestType = new GraphQLObjectType({
  name: 'Test',
  fields: {
    test_id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    formConfig: { type: GraphQLJSON },
  }
});

module.exports = TestType;
