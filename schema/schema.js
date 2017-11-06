const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} = graphql;


const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  }
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        for (company of companies) {
          if (company.id === parentValue.companyId) {
            return company;
          }
        }
      }
    }
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
      resolve(parentValue, args) {
        for (user of users) {
          if (user.id === args.id) {
            return user;
          }
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
