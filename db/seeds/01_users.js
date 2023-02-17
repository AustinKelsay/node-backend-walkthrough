exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { username: "user1", password: "password1" },
        { username: "user2", password: "password2" },
        { username: "user3", password: "password3" },
      ]);
    });
};
