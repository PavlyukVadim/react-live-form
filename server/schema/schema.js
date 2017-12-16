const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

const Users = require('./../Users');
const {
  UserType,
  UserResolver,
} = Users;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  }
});

const users = [
  { id: '23', firstName: 'Walter', lastName: 'White', companyId: '1'},
  { id: '47', firstName: 'Jesse', lastName: 'Pinkman'},
];

const companies = [
  { id: '1', name: 'Gray Matter Technologies' }
];

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString }},
      resolve: UserResolver,
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString }},
      resolve(parentValue, args) {
        for (company of companies) {
          if (company.id === args.id) {
            return company;
          }
        }
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        companyId: { type: GraphQLString }
      },
      resolve(parentValue, { firstName, lastName }) {
        users.push({
          id: users.length + '',
          firstName,
          lastName
        });
        return users[users.length - 1];
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
