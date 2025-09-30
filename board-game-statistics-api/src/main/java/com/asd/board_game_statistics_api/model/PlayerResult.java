package com.asd.board_game_statistics_api.model;

import java.sql.ResultSet;
import java.sql.SQLException;

public record PlayerResult(Integer id, Integer playedGameId, Integer accountId, Integer points, Integer playerTeam, boolean hasWon) {
    // Methods for converting from ResultSet to PlayerResult from an SQL query
    public static PlayerResult fromResultSet(ResultSet rs) throws SQLException {
        if (!rs.next()) return null;
        return fromRow(rs, rs.getRow());
    }

    public static PlayerResult fromRow(ResultSet resultSet, int rowNum) throws SQLException {
        return new PlayerResult(
                resultSet.getInt("player_result_id"),
                resultSet.getInt("played_game_id"),
                resultSet.getInt("account_id"),
                resultSet.getInt("points"),
                resultSet.getInt("player_team"),
                resultSet.getBoolean("has_won")
        );
    }
}
