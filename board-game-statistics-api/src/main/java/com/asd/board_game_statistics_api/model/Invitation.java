package com.asd.board_game_statistics_api.model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;

public record Invitation (int invite_id, String user_email, int group_id, int invite_code, Timestamp timestamp) {
    public static Invitation fromResultSet(ResultSet rs) throws SQLException {
        if (!rs.next()) return null;
        return new Invitation(
                rs.getInt("invite_id"),
                rs.getString("user_email"),
                rs.getInt("group_id"),
                rs.getInt("invite_code"),
                rs.getTimestamp("timestamp")
        );
    }
}
