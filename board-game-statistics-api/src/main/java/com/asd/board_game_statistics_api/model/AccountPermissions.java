package com.asd.board_game_statistics_api.model;

import com.asd.board_game_statistics_api.util.EnumSetUtils;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.EnumSet;

public record AccountPermissions(int accountId, EnumSet<Permission> permissions) {

    public static AccountPermissions fromRow(ResultSet rs, int ignoredRowNum) throws SQLException {
        return new AccountPermissions(
                rs.getInt("account_id"),
                EnumSetUtils.fromBitmask(Permission.class, rs.getInt("permissions_mask"))
        );
    }
}
