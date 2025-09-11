package com.asd.board_game_statistics_api.account.dto;

import com.asd.board_game_statistics_api.model.Group;

import java.sql.ResultSet;
import java.sql.SQLException;

public record MeResponse(String firstName, String lastName, String email) {
    public static MeResponse fromRow(ResultSet resultSet, int rowNum) throws SQLException {
        return new MeResponse(
                resultSet.getString("first_name"),
                resultSet.getString("last_name"),
                resultSet.getString("email")
        );
    }
}
