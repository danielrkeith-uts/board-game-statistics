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

CREATE TABLE bgs.played_game (
    played_game_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    game_id INT NOT NULL,
    group_id INT NOT NULL REFERENCES bgs.game_group(id) ON DELETE CASCADE,
    date_played DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE bgs.player_result (
    player_result_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    played_game_id INT NOT NULL REFERENCES bgs.played_game(played_game_id) ON DELETE CASCADE,
    account_id INT NOT NULL REFERENCES bgs.account(id) ON DELETE CASCADE,
    points INT,
    player_team INT,
    has_won BOOLEAN NOT NULL DEFAULT FALSE
);