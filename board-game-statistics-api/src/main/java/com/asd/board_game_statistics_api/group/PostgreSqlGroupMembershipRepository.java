package com.asd.board_game_statistics_api.group;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class PostgreSqlGroupMembershipRepository implements IGroupMembershipRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void create(int groupId, int accountId, byte[] permissionsString) {
        String sql = "INSERT INTO bgs.group_membership (group_id, account_id, permissions_string) VALUES (?, ?, ?);";

        jdbcTemplate.update(sql, groupId, accountId, permissionsString);
    }
}
