package com.asd.board_game_statistics_api.statistics.dto;

import java.sql.ResultSet;
import java.sql.SQLException;

public record GameFrequencyData(String gameName, Integer numOfGamesPlayed) {
    public static GameFrequencyData fromRow(ResultSet resultSet, int i) throws SQLException {
        return new GameFrequencyData(
                resultSet.getString("name"),
                resultSet.getInt("num_of_games")
        );
    }
}
