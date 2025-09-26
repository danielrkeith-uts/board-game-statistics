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

CREATE TABLE bgs.game_record (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    group_id INT NOT NULL REFERENCES bgs.game_group(id) ON DELETE CASCADE,
    game_id INT NOT NULL,
    played_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    win_condition VARCHAR(16) NOT NULL CHECK (win_condition IN ('single','team')),
    num_teams INT NULL CHECK (num_teams IS NULL OR num_teams >= 2),
    notes TEXT
);

CREATE TABLE bgs.game_record_player (
    record_id INT NOT NULL REFERENCES bgs.game_record(id) ON DELETE CASCADE,
    account_id INT NOT NULL REFERENCES bgs.account(id) ON DELETE CASCADE,
    team_number INT NULL,
    is_winner BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (record_id, account_id)
);