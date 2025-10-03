# Board Game Statistics
Project for 41026 Advanced Software Development

## Project structure and responsibilities
This project is divided into a frontend folder `board-game-statistics` and a backend folder `board-game-statistics-api`.
Each of these components have parts relevant to each feature.

The frontend is divided into a few key pages, each located in `board-game-statistics/src/pages`.
Each file and subfolder in these page folders contain further components relevant to those pages.

The backend is divided into multiple packages, each located in `board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api`.
Each package operates as its own unit, containing the relevant controllers, services, and repositories related to that feature.
There are also a few general packages such as `config` and `util` which are for shared use between the features.

### Group member responsibilities

#### Daniel Keith
Feature 1: Account login & forgot password system
This feature uses the following major folders and files (along with other minor ones not mentioned):
- `board-game-statistics/src/pages/login`
- `board-game-statistics/src/context/AlertContext.tsx`
- `board-game-statistics/src/utils/api/account-api-utils.ts`
- `board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/account`
- `board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/config`
- `board-game-statistics-api/src/test/java/com/asd/board_game_statistics_api/account`

Feature 2: Group member permissions
This feature uses the following major folders and files (along with other minor ones not mentioned):
- `board-game-statistics/src/pages/group/home/EditPermissionsModal.tsx`
- `board-game-statistics/src/context/PermissionsContext.tsx`
- `board-game-statistics/src/utils/api/permissions-api-utils.ts`
- `board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/permissions`
- `board-game-statistics-api/src/test/java/com/asd/board_game_statistics_api/permissions`


## Setup environment variables
Environment variables can be set in multiple ways; pick one of the below.

These environment variables must be set to a password of your choice:
- BGS_DB_PASSWORD (The password for the bgs_admin_local account)
- BGS_ADMIN_PASSWORD (A password of your choosing)
- BGS_MAIL_USERNAME (See pinned messages in discord for username)
- BGS_MAIL_PASSWORD (See pinned messages in discord for password)

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

1. Run `CREATE USER bgs_admin_local WITH PASSWORD '<BGS_DB_PASSWORD>';`
   * Replace `<BGS_DB_PASSWORD>` with the password used for the corresponding environment variable
2. Run `CREATE DATABASE board_game_statistics_local OWNER bgs_admin_local;`

Now run the backend API, and use Postman (or some other tool) to rebuild the schema using the API:
1. Create a `POST` request to one of the following endpoints:
    - `http://localhost:8080/api/admin/db/rebuild-schema` - builds the schema with empty tables
    - `http://localhost:8080/api/admin/db/rebuild-with-sample-data` - builds the schema with sample data inserted into tables
        - Note: all sample accounts are inserted with the same password: "test#123456"
2. Include a header with key `ADMIN-AUTHENTICATION` and value `<BGS_ADMIN_PASSWORD>`
   * Replace `<BGS_ADMIN_PASSWORD>` with the corresponding environment variable

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
3. Run `npm prepare` *(Only needs to be done once)*
4. Run `npm dev`

This will run the frontend on port 3000

## Tests
If you would like to write JUnit tests using a mocked PostgreSQL database, please ensure your test class extends the "TestsWithMockedDatabase" abstract class.

The database will be automatically created before tests run, and rebuilt before each individual test. Your repository classes will function as expected when using the mocked database.
