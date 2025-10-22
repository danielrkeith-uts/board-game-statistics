package com.asd.board_game_statistics_api.leaderboards.dto;

import java.sql.ResultSet;
import java.sql.SQLException;

public record GameResponse(int gameId, int groupId, String gameName) {
    public static GameResponse fromRow(ResultSet resultSet, int rowNum) throws SQLException {
        return new GameResponse(
                resultSet.getInt("id"),
                resultSet.getInt("group_id"),
                resultSet.getString("name")
        );
    }
}
