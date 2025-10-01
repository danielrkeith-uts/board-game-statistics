package com.asd.board_game_statistics_api.games;

import com.asd.board_game_statistics_api.model.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PostgreSqlOwnedGameRepository implements IOwnedGameRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Game> getOwnedByAccount(int accountId) {
        String sql = """
            SELECT g.id, g.name, g.publisher
            FROM bgs.owned_game og
            JOIN bgs.board_game g ON g.id = og.game_id
            WHERE og.account_id = ?
            ORDER BY g.name ASC;
        """;
        return jdbcTemplate.query(sql, Game::fromRow, accountId);
    }

    @Override
    public boolean exists(int accountId, int gameId) {
        String sql = "SELECT COUNT(*) FROM bgs.owned_game WHERE account_id = ? AND game_id = ?;";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, accountId, gameId);
        return count != null && count > 0;
    }

    @Override
    public void addOwned(int accountId, int gameId) {
        String sql = "INSERT INTO bgs.owned_game (account_id, game_id) VALUES (?, ?) ON CONFLICT DO NOTHING;";
        jdbcTemplate.update(sql, accountId, gameId);
    }

    @Override
    public void removeOwned(int accountId, int gameId) {
        String sql = "DELETE FROM bgs.owned_game WHERE account_id = ? AND game_id = ?;";
        jdbcTemplate.update(sql, accountId, gameId);
    }
}