package com.asd.board_game_statistics_api.model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Set;

public record Game(int id, String name, String publisher, String winCondition) {
    public static final Set<String> ALLOWED_WIN_CONDITIONS = Set.of(
            "HIGH_SCORE", "LOW_SCORE", "FIRST_TO_FINISH", "COOPERATIVE"
    );

    public static Game fromResultSet(ResultSet rs) throws SQLException {
        if (!rs.next()) return null;
        return fromRow(rs, rs.getRow());
    }

    public static Game fromRow(ResultSet rs, int ignoredRowNum) throws SQLException {
        return new Game(
            rs.getInt("id"),
            rs.getString("name"),
            rs.getString("publisher"),
            rs.getString("win_condition")
        );
    }
}