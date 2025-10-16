package com.asd.board_game_statistics_api.model;

import java.sql.ResultSet;
import java.sql.SQLException;

public record Game(int id, String name, String publisher, String winCondition) {

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