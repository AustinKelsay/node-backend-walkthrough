const User = require("../db/models/User");
const router = require("express").Router();

// This route is for creating a new user.
router.post("/", async (req, res) => {
  // Extracts the name, email, and password from the request body.
  const { username, password } = req.body;
  // Calls the User.create function and passes in the extracted values to create a new user.
  const user = await User.create({ username, password });
  // Sends the created user as a JSON response.
  res.json(user);
});

// This route is for getting a user by ID.
router.get("/:id", async (req, res) => {
  // Extracts the ID parameter from the request.
  const { id } = req.params;
  // Calls the User.findById function and passes in the ID to retrieve the user with that ID.
  const user = await User.findById(id);
  // Sends the retrieved user as a JSON response.
  res.json(user);
});

// This route is for updating a user by ID.
router.put("/:id", async (req, res) => {
  // Extracts the ID parameter from the request.
  const { id } = req.params;
  // Extracts the updated username, and password from the request body.
  const { username, password } = req.body;
  // Calls the User.update function and passes in the ID and updated values to update the user with that ID.
  const user = await User.update(id, { username, password });
  // Sends the updated user as a JSON response.
  res.json(user);
});

// This route is for deleting a user by ID.
router.delete("/:id", async (req, res) => {
  // Extracts the ID parameter from the request.
  const { id } = req.params;
  // Calls the User.delete function and passes in the ID to delete the user with that ID.
  const user = await User.delete(id);
  // Sends the deleted user as a JSON response.
  res.json(user);
});

module.exports = router;
