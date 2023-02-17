exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    // Creates an auto-incrementing PK column called id
    table.increments("id").primary();
    // Creates a text column called username which is both required and unique
    table.string("username").notNullable().unique();
    // Creates a text column called password which is required
    table.string("password").notNullable();
    // Creates a timestamp column called created_at which is both required and defaults to the current time
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  // Drops the entire table if it exists (opposite of createTable)
  // This is useful for rolling back migrations if something goes wrong
  return knex.schema.dropTableIfExists("users");
};
