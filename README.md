# node-backend-walkthrough

A step-by-step walkthrough on how to setup and deploy a nodejs backend built with Express / Knex / SQLite (dev db) / Postgres (production db)


## Step 1: Setting up your project / dependencies

### 1.1 Create a new Node.js project
To set up a new Node.js project, follow these steps:

- Create a new directory for your project by running the following command in the terminal:
`mkdir my-project`

- Navigate into the new directory by running:
`cd my-project`
- Initialize a new Node.js project by running:
`npm init`
- Answer the prompts to generate a package.json file for your project.
### 1.2 Install necessary dependencies
To install the necessary dependencies for your project, run the following command in the terminal:
`npm install express knex sqlite3 dotenv`

This will install the following packages:

- express: A popular web framework for Node.js that simplifies the process of building web applications.
- knex: A SQL query builder for Node.js that provides a convenient way to interact with databases.
- sqlite3: A Node.js module that provides an SQLite database driver for use with Knex.
- dotenv: A zero-dependency module that loads environment variables from a .env file into process.env.

You can install additional packages as needed for your project. Once the dependencies are installed, you can begin setting up your Node.js app with Express and Knex.

### 2.1 Create an app.js file
To create the basic Express server, follow these steps:

- Create a new file called app.js in the root directory of your project by running the following command in the terminal:
`touch app.js`
- Open the app.js file in your preferred code editor.

### 2.2 Import necessary modules
To use Express, Knex, and Dotenv in your app.js file, you need to import them at the top of the file:

```
const express = require('express');
const knex = require('knex');
require('dotenv').config();
```

### 2.3 Set up the server
To set up the server, you need to define the necessary routes and middleware, and configure any necessary settings. Here's an example:

```
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Listen
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

In this example, we're creating a new instance of the Express application (app) and setting the port to listen on. We're also setting up some basic middleware to parse incoming requests (using the express.json() and express.urlencoded() middleware) and defining a simple route that sends a "Hello, world!" message as the response. Finally, we're starting the server by calling the listen() method on the app instance.

You can customize this example to fit your specific needs by adding additional routes and middleware, or configuring other settings (such as database connections).

## Step 3: Setting up DBConfig with settings for local SQLite db and production Postgres db

### 3.1 Create a knexfile.js file
To use Knex to manage your database, you need to create a knexfile.js file in the root directory of your project. This file will contain the configuration settings for your database, including the connection settings for your local SQLite database and your production Postgres database.

Here's an example knexfile.js:
```
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
};
```

In this example, we're defining two environments: development and production. For the development environment, we're using SQLite as the database client and specifying a connection to a local file (./dev.sqlite3). We're also specifying the directories for our migrations and seeds.

For the production environment, we're using Postgres as the database client and specifying a connection to a URL stored in the process.env.DATABASE_URL environment variable. We're using the same directories for our migrations and seeds.

### 3.2 Import DBConfig and create a database instance
To use the settings from your knexfile.js file in your Express server, you need to import DBConfig and create a database instance. Here's an example:

```
const knex = require('knex');
const config = require('../knexfile');

const env = process.env.NODE_ENV || 'development';
const db = knex(config[env]);

module.exports = db;
```

In this example, we're importing the knex library and the knexfile.js configuration settings. We're then setting the environment to use based on the NODE_ENV environment variable, defaulting to 'development' if the variable is not set. Finally, we're creating a new instance of the database using the configuration settings for the current environment and exporting it for use in our Express server.

You can customize this example to fit your specific needs by updating the configuration settings in your knexfile.js file, or using a different method to set the environment (such as using process.env.DB_ENV).

## Step 4: Creating a migration to set up the database schema

- Create a migration file to set up the database schema by running knex migrate:make create_table_name.
- Write the necessary code in the migration file to create the database schema, including defining the table schema and any necessary indexes or constraints.

## Step 5: Running the migration and creating a seed to populate the database

- Run the migration to create the database table by running knex migrate:latest.
- Create a seed file to populate the database with initial data by running knex seed:make seed_name.
- Write the necessary code in the seed file to insert initial data into the database.
- Run the seed to insert the initial data by running knex seed:run.

## Step 6: Updating the Express server to use the database

- Import Knex into the app.js file and use it to handle database requests.
- Define the necessary routes and middleware to handle database requests, such as creating, reading, updating, and deleting records.

## Step 7: Testing the server locally

- Test the server locally by running npm start in the command line and making requests to the API using a tool like Postman.
- Ensure that the server is properly handling database requests and returning the expected data.

## Step 8: Deploying the app to Heroku and using a Postgres database

- Create a new Heroku app and set up a Postgres database for production.
- Configure the app to use the Postgres database in production by updating the knexfile.js configuration.
- Push the app to Heroku and ensure that it is properly deployed.
- Test the deployed app by making requests to the API using the Heroku URL.
