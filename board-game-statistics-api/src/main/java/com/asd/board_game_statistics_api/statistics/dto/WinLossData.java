package com.asd.board_game_statistics_api.statistics.dto;

import java.sql.ResultSet;
import java.sql.SQLException;

public record WinLossData(String winCondition, boolean hasWon, Integer numOfGames) {
    public static WinLossData fromRow(ResultSet resultSet, int i) throws SQLException {
        return new WinLossData(
                resultSet.getString("win_condition"),
                resultSet.getBoolean("has_won"),
                resultSet.getInt("num_of_games")
        );
    }
}
