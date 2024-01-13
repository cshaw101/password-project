const db = require('./dbConfig');

class UserModel {
  constructor() {
    this.tableName = 'users';
  }

  async createUser(username, password) {
    return db(this.tableName).insert({ username, password });
  }

  async getUserByUsername(username) {
    return db(this.tableName).select().where({ username }).first();
  }
}

module.exports = UserModel;