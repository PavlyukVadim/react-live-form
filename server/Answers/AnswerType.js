const graphql = require('graphql');
const GraphQLJSON = require('graphql-type-json');

const Tests = require('./../Tests');
const Comments = require('./../Comments');
const Users = require('./../Users');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

const {
  TestType,
  TestResolver,
  AllTestsResolver,
} = Tests;

const {
  CommentType,
  CommentByAnswerResolver,
} = Comments;

const {
  UserType,
  UserByAnswerResolver,
} = Users;

const AnswerType = new GraphQLObjectType({
  name: 'Answer',
  fields: {
    answer_id: { type: GraphQLString },
    status_id: { type: GraphQLString },
    form_answers: { type: GraphQLJSON },
    passage_date: { type: GraphQLJSON },
    user: {
      type: UserType,
      resolve: UserByAnswerResolver,
    },
    test: {
      type: TestType,
      resolve: TestResolver,
    },
    comment: {
      type: CommentType,
      resolve: CommentByAnswerResolver,
    }
  }
});

module.exports = AnswerType;
