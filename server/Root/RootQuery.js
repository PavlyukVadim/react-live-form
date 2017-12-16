const Users = require('./../Users');
const {
  UserType,
  UserResolver,
} = Users;

const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString }},
      resolve: UserResolver,
    },  
  }
});

module.exports = RootQuery;
