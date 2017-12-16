const users = [
  { id: '25', firstName: 'Walter', lastName: 'White', companyId: '1'},
  { id: '47', firstName: 'Jesse', lastName: 'Pinkman'},
];

const UserResolver = (parentValue, args) => {
  for (user of users) {
    if (user.id === args.id) {
      return user;
    }
  }
};

module.exports = UserResolver;
