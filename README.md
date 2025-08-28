# Board Game Statistics
Project for 41026 Advanced Software Development


## Setup environment variables
Environment variables can be set in multiple ways; pick one of the below.

These environment variables must be set to a password of your choice:
- AC_DB_PASSWORD
- AC_ADMIN_PASSWORD

**Write these passwords down somewhere**


### Set environment variables on device
Guide for each OS:  
https://configu.com/blog/setting-env-variables-in-windows-linux-macos-beginners-guide/


### Set environment variables in IntelliJ run configuration
Guide:  
https://www.jetbrains.com/help/idea/program-arguments-and-environment-variables.html#environment_variables


## Setup local PostgreSQL database
Make sure you have postgres installed and can access the `psql` command-line tool.

To log in with the admin user: `psql -U <username>`  
*(username is* `postgres` *by default)*

1. Run `CREATE USER bgs_admin_local WITH PASSWORD '<AC_DB_PASSWORD>';`
   * Replace `<AC_DB_PASSWORD>` with the password used for the corresponding environment variable
2. Run `CREATE DATABASE board_game_statistics_local OWNER bgs_admin_local;`

Now run the backend API, and use Postman (or some other tool) to rebuild the schema using the API:
1. Create a `POST` request to `http://localhost:8000/api/admin/db/rebuild-schema`
2. Include a header with key `ADMIN-AUTHENTICATION` and value `<AC_ADMIN_PASSWORD>`
   * Replace `<AC_ADMIN_PASSWORD>` with the corresponding environment variable

## Running project locally
The project will only run as intended when both the frontend and backend are running

### Running backend locally
1. Navigate to `board-game-statistics-api`
2. Run `mvn package`
3. Run `java -jar target/*.jar`

This will run the backend on port 8080

### Running frontend locally
1. Navigate to `board-game-statistics`
2. Run `npm install` *(Only needs to be done once)*
3. Run `npm dev`

This will run the frontend on port 3000
