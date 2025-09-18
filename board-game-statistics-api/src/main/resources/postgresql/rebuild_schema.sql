DROP SCHEMA IF EXISTS bgs CASCADE;

CREATE SCHEMA bgs;

CREATE TABLE bgs.account (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100)
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
    permissions_string VARCHAR(8),
    join_timestamp TIMESTAMP NOT NULL,
    FOREIGN KEY (group_id) REFERENCES bgs.game_group(id),
    FOREIGN KEY (account_id) REFERENCES bgs.account(id)
);