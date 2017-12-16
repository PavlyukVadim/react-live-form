const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

const TestType = new GraphQLObjectType({
  name: 'Test',
  fields: {
    test_id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  }
});

module.exports = TestType;
