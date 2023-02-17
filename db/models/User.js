// require the database configuration module
const db = require("../dbConfig");

module.exports = {
  // a function to find a user by id
  findById: (id) => {
    // query the 'users' table for the user with the given id
    return db("users").where({ id }).first();
  },
  // a function to create a new user
  create: (user) => {
    // insert the user object into the 'users' table and return the inserted user object
    return db("users").insert(user).returning("*");
  },
  // a function to update an existing user with the given id
  update: (id, user) => {
    // update the user object in the 'users' table where the id matches and return the updated user object
    return db("users").where({ id }).update(user).returning("*");
  },
  // a function to delete an existing user with the given id
  delete: (id) => {
    // delete the user from the 'users' table where the id matches
    return db("users").where({ id }).del();
  },
};
