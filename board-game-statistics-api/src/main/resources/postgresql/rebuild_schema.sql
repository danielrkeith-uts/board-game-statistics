DROP SCHEMA IF EXISTS bgs CASCADE;

CREATE SCHEMA bgs;

CREATE TABLE bgs.account (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

CREATE TABLE bgs.invitation (
    invite_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_email VARCHAR(100),
    group_id INT,
    invite_code INT DEFAULT floor(random() * (999999 - 100000 + 1) + 100000)::int UNIQUE,--floor((999999 * random()) + 100000)::int,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);