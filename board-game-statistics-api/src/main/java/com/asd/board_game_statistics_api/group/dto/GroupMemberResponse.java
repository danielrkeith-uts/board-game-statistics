package com.asd.board_game_statistics_api.group.dto;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.Instant;

public record GroupMemberResponse(int id, String firstName, String lastName, String email, Instant joinTimestamp) {
    public static GroupMemberResponse fromRow(ResultSet resultSet, int rowNum) throws SQLException {
        return new GroupMemberResponse(
                resultSet.getInt("id"),
                resultSet.getString("first_name"),
                resultSet.getString("last_name"),
                resultSet.getString("email"),
                resultSet.getTimestamp("join_timestamp").toInstant()
        );
    }
}
