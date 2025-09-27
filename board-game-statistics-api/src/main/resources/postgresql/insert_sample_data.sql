INSERT INTO bgs.account (email, password, first_name, last_name) VALUES
('alice@example.com', ?, 'Alice', 'Smith'),
('bob@example.com', ?, 'Bob', 'Johnson'),
('carol@example.com', ?, 'Carol', 'Williams'),
('dave@example.com', ?, 'Dave', 'Brown'),
('eve@example.com', ?, 'Eve', 'Davis'),
('frank@example.com', ?, 'Frank', 'Miller'),
('grace@example.com', ?, 'Grace', 'Wilson'),
('matthew@adler.id.au', ?, 'Matthew', 'Adler'),
('henry@example.com', ?, 'Henry', 'Taylor'),
('iris@example.com', ?, 'Iris', 'Anderson'),
('jack@example.com', ?, 'Jack', 'Thomas'),
('kate@example.com', ?, 'Kate', 'Jackson'),
('liam@example.com', ?, 'Liam', 'White'),
('maya@example.com', ?, 'Maya', 'Harris'),
('noah@example.com', ?, 'Noah', 'Martin'),
('olivia@example.com', ?, 'Olivia', 'Garcia'),
('paul@example.com', ?, 'Paul', 'Rodriguez'),
('quinn@example.com', ?, 'Quinn', 'Lewis'),
('ruby@example.com', ?, 'Ruby', 'Lee'),
('sam@example.com', ?, 'Sam', 'Walker'),
('bianca@example.com', ?, 'Bianca', 'Bankingman'),
('aaron.falco2@gmail.com', ?, 'Test', 'Testerson');

-- Game Groups
INSERT INTO bgs.game_group (group_name, creation_time) VALUES
('Board Gamers', NOW() - INTERVAL '10 days'),
('Strategy Masters', NOW() - INTERVAL '8 days'),
('Casual Players', NOW() - INTERVAL '6 days'),
('Weekend Warriors', NOW() - INTERVAL '4 days'),
('Family Fun', NOW() - INTERVAL '2 days'),
('Night Owls', NOW() - INTERVAL '1 day');

-- Group Memberships
INSERT INTO bgs.group_membership (group_id, account_id, permissions_mask, join_timestamp) VALUES
(1, 1, 31, NOW() - INTERVAL '9 days'),
(1, 2, 0, NOW() - INTERVAL '8 days'),
(1, 5, 0, NOW() - INTERVAL '6 days'),
(1, 7, 0, NOW() - INTERVAL '6 days'),
(1, 8, 0, NOW() - INTERVAL '10 days'),
(1, 9, 0, NOW() - INTERVAL '9 days'),
(1, 10, 0, NOW() - INTERVAL '8 days'),
(1, 12, 0, NOW() - INTERVAL '4 days'),
(1, 14, 0, NOW() - INTERVAL '12 hours'),
(1, 16, 0, NOW() - INTERVAL '3 days'),
(1, 19, 0, NOW() - INTERVAL '2 days'),
(1, 20, 0, NOW() - INTERVAL '30 minutes'),
(2, 3, 31, NOW() - INTERVAL '7 days'),
(2, 4, 0, NOW() - INTERVAL '6 days'),
(2, 6, 0, NOW() - INTERVAL '5 days'),
(2, 9, 0, NOW() - INTERVAL '5 days'),
(2, 11, 0, NOW() - INTERVAL '7 days'),
(2, 12, 0, NOW() - INTERVAL '6 days'),
(2, 13, 0, NOW() - INTERVAL '3 days'),
(2, 15, 0, NOW() - INTERVAL '6 hours'),
(2, 18, 0, NOW() - INTERVAL '4 days'),
(3, 1, 31, NOW() - INTERVAL '7 days'),
(3, 4, 0, NOW() - INTERVAL '4 days'),
(3, 5, 0, NOW() - INTERVAL '5 days'),
(3, 6, 0, NOW() - INTERVAL '4 days'),
(3, 8, 0, NOW() - INTERVAL '4 days'),
(3, 10, 0, NOW() - INTERVAL '4 days'),
(3, 13, 0, NOW() - INTERVAL '5 days'),
(3, 14, 0, NOW() - INTERVAL '4 days'),
(3, 16, 0, NOW() - INTERVAL '3 hours'),
(4, 2, 31, NOW() - INTERVAL '5 days'),
(4, 5, 0, NOW() - INTERVAL '3 days'),
(4, 7, 0, NOW() - INTERVAL '3 days'),
(4, 11, 0, NOW() - INTERVAL '3 days'),
(4, 15, 0, NOW() - INTERVAL '3 days'),
(4, 16, 0, NOW() - INTERVAL '2 days'),
(4, 17, 0, NOW() - INTERVAL '2 hours'),
(4, 20, 0, NOW() - INTERVAL '1 day'),
(5, 1, 31, NOW() - INTERVAL '2 days'),
(5, 3, 0, NOW() - INTERVAL '1 day'),
(5, 4, 0, NOW() - INTERVAL '2 days'),
(5, 6, 0, NOW() - INTERVAL '2 days'),
(5, 9, 0, NOW() - INTERVAL '3 days'),
(5, 12, 0, NOW() - INTERVAL '2 days'),
(5, 14, 0, NOW() - INTERVAL '2 days'),
(5, 17, 0, NOW() - INTERVAL '1 day'),
(5, 18, 0, NOW() - INTERVAL '12 hours'),
(5, 19, 0, NOW() - INTERVAL '1 hour'),
(6, 2, 31, NOW()),
(6, 3, 0, NOW() - INTERVAL '3 days'),
(6, 7, 0, NOW() - INTERVAL '1 day'),
(6, 8, 0, NOW() - INTERVAL '12 hours'),
(6, 10, 0, NOW() - INTERVAL '2 days'),
(6, 11, 0, NOW() - INTERVAL '1 day'),
(6, 13, 0, NOW() - INTERVAL '1 day'),
(6, 15, 0, NOW() - INTERVAL '1 day'),
(6, 17, 0, NOW() - INTERVAL '1 day'),
(6, 18, 0, NOW() - INTERVAL '2 days'),
(6, 19, 0, NOW() - INTERVAL '6 hours'),
(6, 20, 0, NOW() - INTERVAL '3 hours');

-- Sample played games
INSERT INTO bgs.playedGame (gameId, groupId, datePlayed)
VALUES (100, 1, CURRENT_DATE - INTERVAL '1 day');

INSERT INTO bgs.playerResult (playedGameId, accountId, points, playerTeam, hasWon)
SELECT playedGameId, 1, 150, 'Solo', TRUE FROM bgs.playedGame ORDER BY playedGameId DESC LIMIT 1;

INSERT INTO bgs.playedGame (gameId, groupId, datePlayed)
VALUES (200, 1, CURRENT_DATE - INTERVAL '12 hours');

WITH last AS (SELECT playedGameId FROM bgs.playedGame ORDER BY playedGameId DESC LIMIT 1)
INSERT INTO bgs.playerResult (playedGameId, accountId, points, playerTeam, hasWon)
SELECT playedGameId, 1, 120, 'Team 1', FALSE FROM last UNION ALL
SELECT playedGameId, 2, 110, 'Team 1', FALSE FROM last UNION ALL
SELECT playedGameId, 5, 180, 'Team 2', TRUE  FROM last UNION ALL
SELECT playedGameId, 7, 175, 'Team 2', TRUE  FROM last;

INSERT INTO bgs.playedGame (gameId, groupId, datePlayed)
VALUES (101, 1, CURRENT_DATE - INTERVAL '2 hours');

INSERT INTO bgs.playerResult (playedGameId, accountId, points, playerTeam, hasWon)
SELECT playedGameId, 2, 200, 'Solo', TRUE FROM bgs.playedGame ORDER BY playedGameId DESC LIMIT 1;

INSERT INTO bgs.playedGame (gameId, groupId, datePlayed)
VALUES (300, 1, CURRENT_DATE - INTERVAL '6 hours');

WITH last3 AS (SELECT playedGameId FROM bgs.playedGame ORDER BY playedGameId DESC LIMIT 1)
INSERT INTO bgs.playerResult (playedGameId, accountId, points, playerTeam, hasWon)
SELECT playedGameId, 1, 90, 'Team 1', FALSE FROM last3 UNION ALL
SELECT playedGameId, 2, 85, 'Team 1', FALSE FROM last3 UNION ALL
SELECT playedGameId, 5, 160, 'Team 2', TRUE  FROM last3 UNION ALL
SELECT playedGameId, 7, 155, 'Team 2', TRUE  FROM last3 UNION ALL
SELECT playedGameId, 9, 100, 'Team 3', FALSE FROM last3;
