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
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    // company: {
    //   type: CompanyType,
    //   resolve(parentValue, args) {
    //     for (company of companies) {
    //       if (company.id === parentValue.companyId) {
    //         return company;
    //       }
    //     }
    //   }
    // }
  }
});

module.exports = UserType;
