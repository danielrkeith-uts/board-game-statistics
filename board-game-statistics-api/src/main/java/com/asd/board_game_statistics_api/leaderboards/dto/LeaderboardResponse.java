package com.asd.board_game_statistics_api.leaderboards.dto;

import java.sql.ResultSet;
import java.sql.SQLException;

public record LeaderboardResponse(int accountId, String firstName, String lastName, int points){
    public static LeaderboardResponse fromRow(ResultSet resultSet, int rowNum) throws SQLException {
        return new LeaderboardResponse(
                resultSet.getInt("account_id"),
                resultSet.getString("first_name"),
                resultSet.getString("last_name"),
                resultSet.getInt("sum")
        );
    }
}
