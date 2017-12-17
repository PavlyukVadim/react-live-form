const graphql = require('graphql');
const Answers = require('./AnswerType');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

const {
  AnswerType,
} = Answers;


const AddAnswerByUserResolver = (parentValue, args) => {
  // const test = await getAnswerById(args.id);
  console.log(parentValue, args);
  return {};
};


// const AddAnswerByUser = new GraphQLObjectType({
//   name: 'AddAnswerByUser',
//   fields: {
//     addAnswer: {
//       type: AnswerType,
//       args: {
//         firstName: { type: new GraphQLNonNull(GraphQLString) },
//         lastName: { type: new GraphQLNonNull(GraphQLString) },
//         companyId: { type: GraphQLString }
//       },
//       resolve(parentValue, args) {
//         console.log(args)
//         // users.push({
//         //   id: users.length + '',
//         //   firstName,
//         //   lastName
//         // });
//         // return users[users.length - 1];
//       }
//     }
//   }
// });

module.exports = AddAnswerByUserResolver;
