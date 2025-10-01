DROP SCHEMA IF EXISTS bgs CASCADE;

CREATE SCHEMA bgs;

CREATE TABLE bgs.account (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

CREATE TABLE bgs.invitation
(
    invite_id   INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_email  VARCHAR(100),
    group_id    INT,
    inviteCode  INT       DEFAULT floor(random() * (999999 - 100000 + 1) + 100000)::int UNIQUE,
    timestamp   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bgs.game_group (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    group_name VARCHAR(100) UNIQUE NOT NULL,
    creation_time TIMESTAMP NOT NULL
);

CREATE TABLE bgs.group_membership (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    group_id INT NOT NULL,
    account_id INT NOT NULL,
    permissions_mask INT,
    join_timestamp TIMESTAMP NOT NULL,
    FOREIGN KEY (group_id) REFERENCES bgs.game_group(id),
    FOREIGN KEY (account_id) REFERENCES bgs.account(id)
);

CREATE TABLE bgs.board_game (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL UNIQUE,
    publisher TEXT
);

CREATE TABLE bgs.owned_game (
    account_id INT NOT NULL REFERENCES bgs.account(id) ON DELETE CASCADE,
    game_id    INT NOT NULL REFERENCES bgs.board_game(id) ON DELETE CASCADE,
    added_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT owned_pk PRIMARY KEY (account_id, game_id)
);

CREATE TABLE IF NOT EXISTS bgs.user_game_profile (
  account_id INT NOT NULL REFERENCES bgs.account(id) ON DELETE CASCADE,
  game_id    INT NOT NULL REFERENCES bgs.board_game(id) ON DELETE CASCADE,
  win_condition TEXT NOT NULL DEFAULT 'HIGH_SCORE'
    CHECK (win_condition IN ('HIGH_SCORE','LOW_SCORE','FIRST_TO_FINISH','COOPERATIVE','CUSTOM')),
  custom_win_condition TEXT,
  PRIMARY KEY (account_id, game_id)
);
