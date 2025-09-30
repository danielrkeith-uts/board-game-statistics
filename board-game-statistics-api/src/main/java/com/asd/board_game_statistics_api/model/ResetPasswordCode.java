package com.asd.board_game_statistics_api.model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

public record ResetPasswordCode(int id, int accountId, int code, Timestamp timestamp) {

    public static ResetPasswordCode fromResultSet(ResultSet rs) throws SQLException {
        if (!rs.next()) return null;
        return new ResetPasswordCode(
                rs.getInt("id"),
                rs.getInt("account_id"),
                rs.getInt("code"),
                rs.getTimestamp("timestamp")
        );
    }

    public boolean isValid() {
        Instant instantIssued = timestamp.toInstant();
        Instant now = Instant.now();

        // Is less than 24 hours ago, and not in the future
        return instantIssued.isAfter(now.minus(24, ChronoUnit.HOURS))
                && instantIssued.isBefore(now);
    }
}
