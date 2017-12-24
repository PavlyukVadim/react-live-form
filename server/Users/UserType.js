const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    user_id: { type: GraphQLString },
    name: { type: GraphQLString },
    role_id: { type: GraphQLString },
  }
});

module.exports = UserType;
