const express = require("express");
const knex = require("knex");
const dotenv = require("dotenv");
const pg = require("pg");
const helmet = require("helmet");
const morgan = require("morgan");
const userRouter = require("./routers/userRouter");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5500;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan("common"));

// Routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Points to the userRouter and adds the /users prefix to all routes in the userRouter.
app.use("/users", userRouter);

// Listen
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
