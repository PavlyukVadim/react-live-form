const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

const Root = require('./../Root');
const { RootQuery } = Root;

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

// const mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     addUser: {
//       type: UserType,
//       args: {
//         firstName: { type: new GraphQLNonNull(GraphQLString) },
//         lastName: { type: new GraphQLNonNull(GraphQLString) },
//         companyId: { type: GraphQLString }
//       },
//       resolve(parentValue, { firstName, lastName }) {
//         users.push({
//           id: users.length + '',
//           firstName,
//           lastName
//         });
//         return users[users.length - 1];
//       }
//     }
//   }
// });

module.exports = new GraphQLSchema({
  query: RootQuery,
  // mutation
});
