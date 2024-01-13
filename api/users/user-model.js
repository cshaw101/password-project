const db = require('../../data/dbConfig');

async function createUser(username, password) {
  const [newUser] = await db('users').returning(['id', 'username']).insert({
    username,
    password,
  });
  return newUser;
}


async function getUserByUsername(username) {
  return db('users').select().where({ username }).first();
}

module.exports = {
  createUser,
  getUserByUsername
};
