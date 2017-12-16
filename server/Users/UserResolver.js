const db = require('../config/db');

const getUserById = (id) => {
  return db.one('SELECT * FROM users Where user_id = $1', id);
};

const UserResolver = async(parentValue, args) => {
  const user = await getUserById(args.id);
  return user;
};

module.exports = UserResolver;
