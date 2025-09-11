INSERT INTO bgs.account (email, password, first_name, last_name) VALUES
('alice@example.com', '', 'Alice', 'Smith'),
('bob@example.com', '', 'Bob', 'Johnson'),
('carol@example.com', '', 'Carol', 'Williams'),
('dave@example.com', '', 'Dave', 'Brown'),
('eve@example.com', '', 'Eve', 'Davis'),
('frank@example.com', '', 'Frank', 'Miller'),
('grace@example.com', '', 'Grace', 'Wilson');

-- Game Groups
INSERT INTO bgs.game_group (group_name, creation_time) VALUES
('Board Gamers', NOW() - INTERVAL '10 days'),
('Strategy Masters', NOW() - INTERVAL '8 days'),
('Casual Players', NOW() - INTERVAL '6 days'),
('Weekend Warriors', NOW() - INTERVAL '4 days'),
('Family Fun', NOW() - INTERVAL '2 days'),
('Night Owls', NOW() - INTERVAL '1 day');

-- Group Memberships
INSERT INTO bgs.group_membership (group_id, account_id, permissions_string) VALUES
(1, 1, '11110000'),
(1, 2, '11000011'),
(2, 3, '10101010'),
(2, 4, '11111111'),
(3, 5, '00001111'),
(3, 6, '00110011'),
(4, 7, '01010101'),
(5, 1, '10000001'),
(5, 3, '11111100'),
(6, 2, '00000011');