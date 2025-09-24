package com.asd.board_game_statistics_api.permissions;

import com.asd.board_game_statistics_api.model.AccountPermissions;
import com.asd.board_game_statistics_api.model.GroupPermissions;
import com.asd.board_game_statistics_api.model.Permission;
import com.asd.board_game_statistics_api.util.EnumSetUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.EnumSet;
import java.util.List;

@Repository
public class PostgreSqlPermissionsRepository implements IPermissionsRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public EnumSet<Permission> getPermissionsForGroup(int accountId, int groupId) {
        String sql = "SELECT permissions_mask FROM bgs.group_membership WHERE account_id = ? AND group_id = ?;";

        Integer mask = jdbcTemplate.queryForObject(sql, Integer.class, accountId, groupId);
        if (mask == null) {
            return null;
        }

        return EnumSetUtils.fromBitmask(Permission.class, mask);
    }

    @Override
    public List<GroupPermissions> getAllGroupPermissions(int accountId) {
        String sql = "SELECT group_id, permissions_mask FROM bgs.group_membership WHERE account_id = ?;";

        return jdbcTemplate.query(sql, GroupPermissions::fromRow, accountId);
    }

    @Override
    public List<AccountPermissions> getAllAccountPermissions(int groupId) {
        String sql = "SELECT account_id, permissions_mask FROM bgs.group_membership WHERE group_id = ?;";

        return jdbcTemplate.query(sql, AccountPermissions::fromRow, groupId);
    }

}
