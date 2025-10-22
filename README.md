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

### Aaron Falco
Feature 1: Group Invitations
This feature allows for group members to invite other users to join their groups by sending an invite code via email:
- `board-game-statistics/src/pages/group/InviteMemberView.tsx`
- `board-game-statistics/src/pages/group/EnterInviteCodeView.tsx`
- `board-game-statistics/src/utils/api/invitation-api-utils.ts`
- `board-game-statistics-api/src/main/java/com/board-game-statistics-api/invitation`
- `board-game-statistics-api/src/test/java/com/board-game-statistics-api/invitation`
- `board-game-statistics-api/src/main/java/com/board-game-statistics-api/util/EmailService`
- `board-game-statistics-api/src/main/java/com/board-game-statistics-api/test_utils/EmailServiceTests.java`

Feature 2: Group Leaderboards
This feature allows for group members to see leaderboards for each game in their group, across all recorded games played:
- `board-game-statistics/src/pages/group/leaderboard`
- `board-game-statistics/src/utils/api/leaderboard-api-utils.ts`
- `board-game-statistics-api/src/main/java/com/board-game-statistics-api/leaderboards`

### Ray Kinjo

Feature 1: Account creation
This feature allows for Users to create a new account to use the website and its features:

- board-game-statistics/src/pages/signup/SignupView.tsx
- board-game-statistics/src/utils/api/account-api-utils.ts

Feature 2: Owned Games List
This feature allows for Users to add board games to an owned list, including stats and win conditions on a user basis

- board-game-statistics/src/utils/api/games-api-utils.ts
- board-game-statistics/src/pages/games/GamesView.tsx
- board-game-statistics/src/pages/games/AddCustomGameModal.tsx
- board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/model/Game.java
- board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/games/PostgreSqlUserGameProfileRepository.java
- board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/games/PostgreSqlOwnedGameRepository.java
- board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/games/PostgreSqlGameRepository.java
- board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/games/IUserGameProfileRepository.java
- board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/games/IOwnedGameRepository.java
- board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/games/IGameService.java
- board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/games/IGameRepository.java
- board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/games/GamesController.java
- board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/games/GameService.java

### Noah Bondoc

Feature 1: Manage Account
This feature allows users to view and manage their account details, update profile information and delete their account:
- `board-game-statistics/src/pages/account/ManageAccountView.tsx`
- `board-game-statistics/src/pages/account/UpdateProfileModal.tsx`
- `board-game-statistics/src/pages/account/DeleteAccountModal.tsx`
- `board-game-statistics/src/utils/api/account-api-utils.ts`
- `board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/account/AccountController.java`
- `board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/account/AccountService.java`
- `board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/account/IAccountRepository.java`
- `board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/account/IAccountService.java`
- `board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/account/PostgreSqlAccountRepository.java`
- `board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/account/dto/ChangePasswordRequest.java`
- `board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/account/dto/UpdateAccountRequest.java`

Feature 2: Record Played Game
This feature allows group members to record the results of a game.
- `board-game-statistics/src/pages/group/games/RecordGameModal.tsx`
- `board-game-statistics/src/pages/group/games/steps/GameSelectionStep.tsx`
- `board-game-statistics/src/pages/group/games/steps/PlayersStep.tsx`
- `board-game-statistics/src/pages/group/games/steps/WinConditionStep.tsx`
- `board-game-statistics/src/pages/group/games/GroupGamesView.tsx`
- `board-game-statistics/src/utils/api/games-api-utils.ts`
- `board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/games/GameRecordController.java`
- `board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/games/GameRecordService.java`
- `board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/games/PostgreSqlGameRecordRepository.java`
- `board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/games/dto/GameRecordRequest.java`
- `board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/games/dto/GameRecordResponse.java`

### Matthew Adler

Feature 4: Board Game Groups
This feature allows users to create groups, and view a dashboard of information for their currently selected group, including a list of all the members. Users can also leave their currently selected group.

- `board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/group/**`
- `board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/model/Group.java`
- `board-game-statistics-api/src/main/resources/postgresql/insert_sample_data.sql`
- `board-game-statistics-api/src/test/java/com/asd/board_game_statistics_api/test_utils/TestResourceReaderConfig`
- `board-game-statistics-api/src/test/java/com/asd/board_game_statistics_api/test_utils/TestsWithMockedDatabase`
- `board-game-statistics-api/src/test/java/com/asd/board_game_statistics_api/group/**`
- `board-game-statistics/eslint.config.js`
- `board-game-statistics/.prettierrc`
- `board-game-statistics/src/App.tsx` - Setting up routes
- `board-game-statistics/src/components/AlertMessage.tsx`
- `board-game-statistics/src/components/Alerts.tsx`
- `board-game-statistics/src/components/Header.tsx`
- `board-game-statistics/src/context/AlertContext.tsx`
- `board-game-statistics/src/scss/custom.scss`
- `board-game-statistics/src/pages/group/CreateGroupButton.tsx`
- `board-game-statistics/src/pages/group/CreateGroupModal.tsx`
- `board-game-statistics/src/pages/group/GroupDashboard.tsx`
- `board-game-statistics/src/pages/group/GroupDropDown.tsx`
- `board-game-statistics/src/pages/group/GroupManagementHeader.tsx`
- `board-game-statistics/src/pages/group/GroupView.tsx`
- `board-game-statistics/src/pages/group/LeaveGroupModal.tsx`
- `board-game-statistics/src/pages/group/home/GroupHomeView.tsx`
- `board-game-statistics/src/pages/group/home/MembersSection.tsx`
- `board-game-statistics/src/utils/api/group-api-utils.ts`

Feature 10: Player statistics
This feature allows users to view their personal statistics in the currently selected group, as well as a global view of their statistics collated from all groups, and displayed as graphs.

- `board-game-statistics-api/src/main/java/com/asd/board_game_statistics_api/statistics/**`
- `board-game-statistics-api/src/test/java/com/asd/board_game_statistics_api/statistics/**`
- `board-game-statistics/src/components/ProfileMenu.tsx`
- `board-game-statistics/src/pages/globalStats/**`
- `board-game-statistics/src/pages/group/home/StatsSection.tsx`
- `board-game-statistics/src/utils/api/stats-api-utils.ts`

## Setup environment variables
Environment variables can be set in multiple ways; pick one of the below.

These environment variables must be set to a value of your choice:
- BGS_DB_URL (The url for the postgresql database being used)
  - If following the below local setup instructions, this will be `localhost:5432/board_game_statistics_local`
- BGS_DB_USERNAME (A username of your choosing)
- BGS_DB_PASSWORD (A password of your choosing)
- BGS_ADMIN_PASSWORD (A password of your choosing)
- BGS_MAIL_USERNAME (See pinned messages in discord for username)
- BGS_MAIL_PASSWORD (See pinned messages in discord for password)
- BGS_BACKEND_URL (The url that the backend is running on)
  - If running locally, this is likely `http://localhost:8080`
- BGS_FRONTEND_URL (The url that the frontend is running on)
  - If running locally, this is likely `http://localhost:3000`

**Write these passwords down somewhere**


### Set environment variables on device
Guide for each OS:  
https://configu.com/blog/setting-env-variables-in-windows-linux-macos-beginners-guide/


### Set environment variables in IntelliJ run configuration
Guide:  
https://www.jetbrains.com/help/idea/program-arguments-and-environment-variables.html#environment_variables

If doing this, two separate `.env` files will need to be created - one inside `board-game-statistics` with the variable `BGS_BACKEND_URL`, and one in `board-game-statistics-api` (or wherever IntelliJ is set to point) with the rest of the variables.


## Setup local PostgreSQL database
Make sure you have postgres installed and can access the `psql` command-line tool.

To log in with the admin user: `psql -U <username>`  
*(username is* `postgres` *by default)*

1. Run `CREATE USER <BGS_DB_USERNAME> WITH PASSWORD '<BGS_DB_PASSWORD>';`
   * Replace `<BGS_DB_USERNAME>` with the username used for the corresponding environment variable
   * Replace `<BGS_DB_PASSWORD>` with the password used for the corresponding environment variable
2. Run `CREATE DATABASE board_game_statistics_local OWNER <BGS_DB_USERNAME>;`
   * Replace `<BGS_DB_USERNAME>` with the username used for the corresponding environment variable

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
