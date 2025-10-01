package com.asd.board_game_statistics_api.games;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class PostgreSqlUserGameProfileRepository implements IUserGameProfileRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public String getWinCondition(int accountId, int gameId) {
        String sql = "SELECT win_condition FROM bgs.user_game_profile WHERE account_id = ? AND game_id = ?;";
        try {
            return jdbcTemplate.queryForObject(sql, String.class, accountId, gameId);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    @Override
    public String getCustomWinCondition(int accountId, int gameId) {
        String sql = "SELECT custom_win_condition FROM bgs.user_game_profile WHERE account_id = ? AND game_id = ?;";
        try {
            return jdbcTemplate.queryForObject(sql, String.class, accountId, gameId);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    @Override
    public void upsertProfile(int accountId, int gameId, String winCondition, String customWinCondition) {
        String custom = "CUSTOM".equalsIgnoreCase(winCondition) ? customWinCondition : null;
        String sql = """
            INSERT INTO bgs.user_game_profile (account_id, game_id, win_condition, custom_win_condition)
            VALUES (?, ?, ?, ?)
            ON CONFLICT (account_id, game_id)
            DO UPDATE SET win_condition = EXCLUDED.win_condition,
                          custom_win_condition = EXCLUDED.custom_win_condition;
        """;
        jdbcTemplate.update(sql, accountId, gameId, winCondition, custom);
    }

    @Override
    public void deleteProfile(int accountId, int gameId) {
        String sql = "DELETE FROM bgs.user_game_profile WHERE account_id = ? AND game_id = ?;";
        jdbcTemplate.update(sql, accountId, gameId);
    }
}