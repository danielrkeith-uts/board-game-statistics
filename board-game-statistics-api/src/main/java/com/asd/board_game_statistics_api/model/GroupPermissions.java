package com.asd.board_game_statistics_api.model;

import com.asd.board_game_statistics_api.util.EnumSetUtils;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.EnumSet;

public record GroupPermissions(int groupId, EnumSet<Permission> permissions) {

    public static GroupPermissions fromRow(ResultSet rs, int ignoredRowNum) throws SQLException {
        return new GroupPermissions(
                rs.getInt("group_id"),
                EnumSetUtils.fromBitmask(Permission.class, rs.getInt("permissions_mask"))
        );
    }
}
