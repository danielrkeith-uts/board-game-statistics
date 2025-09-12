INSERT INTO bgs.account (email, password, first_name, last_name) VALUES
('alice@example.com', ?, 'Alice', 'Smith'),
('bob@example.com', ?, 'Bob', 'Johnson'),
('carol@example.com', ?, 'Carol', 'Williams'),
('dave@example.com', ?, 'Dave', 'Brown'),
('eve@example.com', ?, 'Eve', 'Davis'),
('frank@example.com', ?, 'Frank', 'Miller'),
('grace@example.com', ?, 'Grace', 'Wilson'),
('matthew@adler.id.au', ?, 'Matthew', 'Adler');

-- Game Groups
INSERT INTO bgs.game_group (group_name, creation_time) VALUES
('Board Gamers', NOW() - INTERVAL '10 days'),
('Strategy Masters', NOW() - INTERVAL '8 days'),
('Casual Players', NOW() - INTERVAL '6 days'),
('Weekend Warriors', NOW() - INTERVAL '4 days'),
('Family Fun', NOW() - INTERVAL '2 days'),
('Night Owls', NOW() - INTERVAL '1 day');

-- Group Memberships
INSERT INTO bgs.group_membership (group_id, account_id, permissions_string, join_timestamp) VALUES
(1, 1, '11110000', NOW() - INTERVAL '9 days'),
(1, 2, '11000011', NOW() - INTERVAL '8 days'),
(2, 3, '10101010', NOW() - INTERVAL '7 days'),
(2, 4, '11111111', NOW() - INTERVAL '6 days'),
(3, 5, '00001111', NOW() - INTERVAL '5 days'),
(3, 6, '00110011', NOW() - INTERVAL '4 days'),
(4, 7, '01010101', NOW() - INTERVAL '3 days'),
(5, 1, '10000001', NOW() - INTERVAL '2 days'),
(5, 3, '11111100', NOW() - INTERVAL '1 day'),
(6, 2, '00000011', NOW()),
(6, 8, '00000000', NOW() - INTERVAL '12 hours'),
(1, 8, '00000000', NOW() - INTERVAL '10 days');