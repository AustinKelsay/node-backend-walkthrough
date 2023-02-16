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

`npm install express knex sqlite3 dotenv pg nodemon helmet morgan`

This will install the following packages:

- express: A popular web framework for Node.js that simplifies the process of building web applications.
- knex: A SQL query builder for Node.js that provides a convenient way to interact with databases.
- sqlite3: A Node.js module that provides an SQLite database driver for use with Knex.
- dotenv: A zero-dependency module that loads environment variables from a .env file into process.env.
- pg: A PostgreSQL database driver for use with Knex, which enables you to connect and interact with PostgreSQL databases from your Node.js application.
- nodemon: A utility that monitors changes to your source code and automatically restarts your server, saving you from manually stopping and starting your server every time you make changes.
- helmet: A middleware that helps secure your Express app by setting various HTTP headers.
- morgan: A middleware that logs HTTP requests and responses.

You can install additional packages as needed for your project. Once the dependencies are installed, you can begin setting up your Node.js app with Express and Knex.

## Step 2: Setting up your Express server

### 2.1 Create an app.js file

To create the basic Express server, follow these steps:

- Create a new file called app.js in the root directory of your project by running the following command in the terminal: touch app.js
- Open the app.js file in your preferred code editor.

### 2.2 Import necessary modules and middleware

To use Express, Knex, Dotenv, pg, helmet, and morgan in your app.js file, you need to import them at the top of the file:

```
const express = require('express');
const knex = require('knex');
const dotenv = require('dotenv');
const pg = require('pg');
const helmet = require('helmet');
const morgan = require('morgan');

require('dotenv').config();
```

### 2.3 Set up the server

To set up the server, you need to define the necessary routes and middleware, and configure any necessary settings. Here's an example:

```
const app = express();
const port = process.env.PORT || 5500;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan('common'));

// Routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Listen
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

In this example, we're creating a new instance of the Express application (app) and setting the port to listen on. We're also setting up some basic middleware to parse incoming requests (using the express.json() and express.urlencoded() middleware), as well as the helmet() and morgan() middleware for security and logging purposes. We're also defining a simple route that sends a "Hello, world!" message as the response. Finally, we're starting the server by calling the listen() method on the app instance.

You can now run `node app.js` in your termnial and start up the server!

You should now see your .listen() message in the terminal `Server running on port 5500` if there are no errors.

Now you can go into Insomnia or Postman and make a get request to `http://localhost:5500` and you should see your welcome message!

## Step 3: Setting up database config with settings for a local SQLite db and a production Postgres db

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

### 3.2 Create a database directory and config
To use the settings from your knexfile.js file in your Express server, you need to create a new directory called `db` (the directory our knexfile is referencing) and inside of db add a file called `dbConfig.js` to create a database instance. 
Here's an example:

```
const knex = require('knex');
const config = require('../knexfile');

const env = process.env.NODE_ENV || 'development';
const db = knex(config[env]);

module.exports = db;
```

In this example, we're importing the knex library and the knexfile.js configuration settings. We're then setting the environment to use based on the NODE_ENV environment variable, defaulting to 'development' if the variable is not set. Finally, we're creating a new instance of the database using the configuration settings for the current environment and exporting it for use in our Express server.

You can customize this example to fit your specific needs by updating the configuration settings in your knexfile.js file, or using a different method to set the environment (such as using process.env.DB_ENV).

## Step 4: Setting up a user model and migration

### 4.1 Create a new migration
To set up a user model and database table, you will need to create a new migration file. Migrations are scripts that describe how to modify the database schema.

To create a new migration file, run the following command in your terminal:

`npx knex migrate:make create_users_table`

This will generate a new migration file inside the directory specified in the knexfile.js for migrations (e.g. /db/migrations in the example).

### 4.2 Define the user table schema
Open the newly created migration file and add the schema for the user table. Here is an example:

```
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
```

In this example, we are creating a users table with id, name, email, and password columns. The id column is a primary key, which will automatically generate a unique ID for each row added to the table. The email column is set to be unique, which means that it will be enforced as a unique constraint in the database. The timestamps method is used to automatically create created_at and updated_at columns for the table.

The down method describes how to undo the changes made by the up method.

### 4.3 Seed the database

To seed the database with initial data, you need to create seed files that contain the data you want to insert into your tables. Seed files should be named with a descriptive name and should be placed in the directory specified in your knexfile.js.

To create a new seed file, run the following command in your terminal:

`npx knex seed:make 01_users`
This will create a new seed file named 01_users.js in the seeds directory of your project. You can then edit this file to add the data you want to insert.

In your seed files, you can use Knex to insert data into your tables. Here's an example:

```
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'user1', password: 'password1' },
        { username: 'user2', password: 'password2' },
        { username: 'user3', password: 'password3' }
      ]);
    });
};
```

In this example, we're deleting all existing entries in the users table and then inserting new entries. You can modify this code to match the data you want to insert into your table.

### 4.4 Run the migration
To apply the migration and create the users table in your database, run the following command in your terminal:

`npx knex migrate:latest`

This will execute all pending migrations and update your database schema.

### 4.5 Run the seeds
Now that the user table is created in our local database we can test it by running our seeds and attempting to save our dummy user objects into our database

To run your seed files run the following command in your terminal:

`npx knex seed:run`

Great now we have a local database, we have a schema for our users table, and a seed file with dummy data to save to our db and test our user schema!

### 5.1 Create a User model
Now that the users table has been created in the database, you can create a User model to interact with it.

These will be the methods that our endpoints call to make changes or get data from our database.

Create a new `models` directory in our `db/` directory and add a file called `User.js` in the models directory and add the following code:

```
const db = require('../dbConfig');

module.exports = {
  findById: (id) => {
    return db('users').where({ id }).first();
  },
  create: (user) => {
    return db('users').insert(user).returning('*');
  },
  update: (id, user) => {
    return db('users').where({ id }).update(user).returning('*');
  },
  delete: (id) => {
    return db('users').where({ id }).del();
  },
};
```

This model has four methods:
- findById: finds a user by their ID
- create: creates a new user in the database
- update: updates an existing user in the database
- delete: deletes a user from the database

Each method returns a Knex query object.

### 4.5 Test the User model
To test the User model, add some routes to your Express app that interact with the User model. Here are some examples:

```
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res.json(user);
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const user = await User.update(id, { name, email, password });
  res.json(user);
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.delete(id);
  res.json(user);
});
```

These routes allow you to create, read, update, and delete users. When you make a POST request to the /users route, a new user will be created in the database. When you make a GET request to the /users/:id route, the user with the specified ID will be returned. When you make a PUT request to the /users/:id route, the user with the specified ID will be updated. When you make a DELETE request to the /users/:id route, the user with the specified ID will be deleted.

You can test these routes using a tool like Insomnia or Postman.

## Step 5: Seeding your local database

### 5.1 Create seed files
To seed your database, you need to create seed files that contain the data you want to insert into your tables. Seed files should be named with a descriptive name and should be placed in the directory specified in your knexfile.js.

To create a new seed file, run the following command in your terminal:

`knex seed:make seed_name`

This will create a new seed file in your specified directory. You can then edit this file to add the data you want to insert.

### 5.2 Add data to seed files
In your seed files, you can use Knex to insert data into your tables. Here's an example:

```
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};
```

In this example, we're deleting all existing entries in the 'table_name' table and then inserting new entries. You can modify this code to match the schema of your tables and the data you want to insert.

### 5.3 Seed your database
To seed your database, run the following command in your terminal:

`knex seed:run`
This will execute all seed files in your specified directory and insert the data into your database.

That's it! You should now have a seeded local database ready to be used in your Node.js app. You can now start your app and test your routes to ensure that the data is being retrieved and updated correctly.

## Step 6: Deploying to Heroku

### 6.1 Create a new Heroku app
To deploy your Node.js app to Heroku, you need to create a new Heroku app. Follow these steps to create a new Heroku app:

- Log in to your Heroku account and navigate to the Heroku Dashboard.
- Click the "New" button in the top right corner and select "Create new app" from the dropdown menu.
- Enter a unique name for your app and select a region.
- Click the "Create app" button.

### 6.2 Connect your Heroku app to your GitHub repository
To connect your Heroku app to your GitHub repository, follow these steps:

- In the "Deploy" tab of your Heroku app dashboard, select "GitHub" as the deployment method.
- Connect your Heroku account to your GitHub account by clicking the "Connect to GitHub" button and following the prompts.
- Select the GitHub repository that contains your Node.js app.
- Choose the branch you want to deploy.
- Click the "Enable Automatic Deploys" button.

### 6.3 Set up environment variables on Heroku
To set up environment variables on Heroku, follow these steps:

- In the "Settings" tab of your Heroku app dashboard, click the "Reveal Config Vars" button.
- Enter the name and value for each environment variable you want to set.
- Click the "Add" button for each environment variable.

In this example, you would need to set the following environment variables:

DATABASE_URL: The connection URL for your production Postgres database. You can find this in the Heroku Postgres add-on settings.
NODE_ENV: The environment setting for your app. Set this to "production".

### 6.4 Deploy your app to Heroku
To deploy your app to Heroku, follow these steps:

- In the "Deploy" tab of your Heroku app dashboard, click the "Deploy Branch" button to deploy your app to Heroku.
- Wait for the deployment process to complete.
- Once the deployment is complete, click the "View" button to open your app in a new browser window.

That's it! Your Node.js app should now be deployed and running on Heroku. If you run into any issues, you can view the logs in the "More" tab of your Heroku app dashboard to help diagnose the problem.
