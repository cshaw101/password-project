const db = require('../../data/dbConfig');
const bcrypt = require("bcrypt")

async function createUser(username, password) {

const trimmedUsername = username.trim();

const hashedPassword = await bcrypt.hash(password,8)

  const [newUser] = await db('users').returning(['id', 'username', 'password']).insert({
    username:trimmedUsername,
    password:hashedPassword,
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
