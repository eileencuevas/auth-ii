
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
      table.increments();
      table.string('username', 255)
        .notNullable()
        .unique('uq_users_username');
      table
        .string('password', 255)
        .notNullable();
      table.string('department', 255).defaultTo('none');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
