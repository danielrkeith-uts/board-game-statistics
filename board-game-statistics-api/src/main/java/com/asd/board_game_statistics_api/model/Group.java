package com.asd.board_game_statistics_api.model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

public record Group(int id, String groupName, Timestamp creationTime) {
    // Methods for converting from ResultSet to Group from an SQL query
    public static Group fromResultSet(ResultSet rs) throws SQLException {
        if (!rs.next()) return null;
        return fromRow(rs, rs.getRow());
    }

    public static Group fromRow(ResultSet resultSet, int rowNum) throws SQLException {
        return new Group(
                resultSet.getInt("id"),
                resultSet.getString("group_name"),
                resultSet.getTimestamp("creation_time")
        );
    }
}