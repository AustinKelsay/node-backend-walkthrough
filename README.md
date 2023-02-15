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

## Step 2: Setting up the basic Express server

- Create an app.js file and import the necessary modules (express, knex, and dotenv).
- Set up the server by defining the necessary routes and middleware, and configuring any necessary settings (such as the port to listen on).

## Step 3: Creating a local SQLite database and setting up Knex

- Create a local SQLite database by running sqlite3 mydatabase.db in the command line.
- Set up Knex by creating a knexfile.js file in the root directory of the project and configuring it to use SQLite for local development and Postgres for deployment.

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
