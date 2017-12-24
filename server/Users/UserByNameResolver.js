const db = require('../config/db');

const getUserByName = (name) => {
  return db.any(`
    SELECT *
    FROM users
    WHERE name = $1
  `, name);
};

const UserByNameResolver = async(parentValue, args) => {
  const users = await getUserByName(args.name);
  const user = users[0] || {};
  return user;
};

module.exports = UserByNameResolver;
