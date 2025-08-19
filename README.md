# Board Game Statistics
Project for 41026 Advanced Software Development

## Setup local postgres database
Make sure you have postgres installed and can access the `psql` command-line tool.

To log in with the admin user (by default `postgres`): `psql -U postgres`

1. Run `CREATE USER bgs_admin_local WITH PASSWORD 'tagwUs-nethys-numfi8';`
2. Run `CREATE DATABASE board_game_statistics_local OWNER bgs_admin_local;`


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
