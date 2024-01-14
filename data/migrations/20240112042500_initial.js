/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
      .createTable('users', function (table) {
          table.increments('id').primary();
          table.string('username').notNullable();
          table.string('password').notNullable().unique();
      })
      .createTable('passwords', function (table) {
          table.increments('id').primary();
          table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
          table.string('encrypted_password').notNullable();
          table.string('website_name').notNullable();
          table.string('iv').notNullable(); // Add the iv column
      });
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function (knex) {
  return knex.schema
      .dropTable('passwords')
      .dropTable('users');
};
