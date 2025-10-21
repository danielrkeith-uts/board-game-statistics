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
(1, 1, 15, NOW() - INTERVAL '9 days'),
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

-- Seed board games (catalog)
INSERT INTO bgs.board_game (name, publisher, win_condition) VALUES
('Catan', 'Kosmos', 'HIGH_SCORE'),
('Carcassonne', 'Hans im Glück', 'HIGH_SCORE'),
('Terraforming Mars', 'FryxGames', 'HIGH_SCORE'),
('7 Wonders', 'Repos Production', 'HIGH_SCORE'),
('Jails and Jaberwocks', 'Unknown Publisher', 'FIRST_TO_FINISH'),
('Worms and Walkways', 'Unknown Publisher', 'COOPERATIVE'),
('Chess 2.0', 'Unknown Publisher', 'FIRST_TO_FINISH'),
('One', 'Unknown Publisher', 'LOW_SCORE'),
('Dice', 'Unknown Publisher', 'HIGH_SCORE'),
('Duopoly', 'Unknown Publisher', 'COOPERATIVE'),
('Game Board', 'Unknown Publisher', 'FIRST_TO_FINISH')
ON CONFLICT (name) DO NOTHING;

INSERT INTO bgs.owned_game (account_id, game_id) VALUES
(1, 1), -- Alice owns Catan
(1, 2), -- Alice owns Carcassonne
(2, 1), -- Bob owns Catan
(2, 3), -- Bob owns Terraforming Mars
(3, 4), -- Carol owns 7 Wonders
(4, 2), -- Dave owns Carcassonne
(5, 3), -- Eve owns Terraforming Mars
(6, 1), -- Frank owns Catan
(7, 4); -- Grace owns 7 Wonders

-- Sample owned games
INSERT INTO bgs.temp_owned_game (game_id, group_id, game_name) VALUES
(5, 1, 'Jails and Jaberwocks'),
(6, 1, 'Worms and Walkways'),
(7, 1, 'Chess 2.0'),
(8, 1, 'One'),
(9, 1, 'Dice'),
(10, 1, 'Duopoly'),
(11, 2, 'Game Board');

-- Sample played games
INSERT INTO bgs.played_game (game_id, group_id, date_played)
VALUES (5, 1, CURRENT_DATE - INTERVAL '1 day');

INSERT INTO bgs.player_result (played_game_id, account_id, points, player_team, has_won)
SELECT played_game_id, 1, 150, NULL, TRUE FROM bgs.played_game ORDER BY played_game_id DESC LIMIT 1;

INSERT INTO bgs.played_game (game_id, group_id, date_played)
VALUES (6, 1, CURRENT_DATE - INTERVAL '12 hours');

WITH last AS (SELECT played_game_id FROM bgs.played_game ORDER BY played_game_id DESC LIMIT 1)
INSERT INTO bgs.player_result (played_game_id, account_id, points, player_team, has_won)
SELECT played_game_id, 1, 120, 1, FALSE FROM last UNION ALL
SELECT played_game_id, 2, 110, 1, FALSE FROM last UNION ALL
SELECT played_game_id, 5, 180, 2, TRUE  FROM last UNION ALL
SELECT played_game_id, 7, 175, 2, TRUE  FROM last;

INSERT INTO bgs.played_game (game_id, group_id, date_played)
VALUES (7, 1, CURRENT_DATE - INTERVAL '2 hours');

INSERT INTO bgs.player_result (played_game_id, account_id, points, player_team, has_won)
SELECT played_game_id, 2, 200, NULL, TRUE FROM bgs.played_game ORDER BY played_game_id DESC LIMIT 1;

INSERT INTO bgs.played_game (game_id, group_id, date_played)
VALUES (8, 1, CURRENT_DATE - INTERVAL '6 hours');

WITH last3 AS (SELECT played_game_id FROM bgs.played_game ORDER BY played_game_id DESC LIMIT 1)
INSERT INTO bgs.player_result (played_game_id, account_id, points, player_team, has_won)
SELECT played_game_id, 1, 90, 1, FALSE FROM last3 UNION ALL
SELECT played_game_id, 2, 85, 1, FALSE FROM last3 UNION ALL
SELECT played_game_id, 5, 160, 2, TRUE  FROM last3 UNION ALL
SELECT played_game_id, 7, 155, 2, TRUE  FROM last3 UNION ALL
SELECT played_game_id, 9, 100, 3, FALSE FROM last3;

INSERT INTO bgs.reset_password_code (account_id, code) VALUES
(1, 123456),  -- Alice has a pending password reset code
(3, 789012),  -- Carol has a pending password reset code  
(5, 456789);  -- Eve has a pending password reset code

INSERT INTO bgs.invitation (user_email, group_id, inviteCode) VALUES
('newuser1@example.com', 1, 555001),  -- Invitation to Board Gamers group
('newuser2@example.com', 2, 555002),  -- Invitation to Strategy Masters group
('newuser3@example.com', 3, 555003),  -- Invitation to Casual Players group
('friend@example.com', 1, 555004),    -- Another invitation to Board Gamers
('colleague@example.com', 4, 555005), -- Invitation to Weekend Warriors
('family@example.com', 5, 555006);    -- Invitation to Family Fun group
