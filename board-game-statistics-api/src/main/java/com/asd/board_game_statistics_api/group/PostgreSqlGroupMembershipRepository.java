package com.asd.board_game_statistics_api.group;

import com.asd.board_game_statistics_api.group.dto.GroupMemberResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Repository
public class PostgreSqlGroupMembershipRepository implements IGroupMembershipRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void create(int groupId, int accountId, String permissionsString, Instant joinTimestamp) {
        String sql = "INSERT INTO bgs.group_membership (group_id, account_id, permissions_string, join_timestamp) VALUES (?, ?, ?, ?);";

        jdbcTemplate.update(sql, groupId, accountId, permissionsString, Timestamp.from(joinTimestamp));
    }

    @Override
    public List<GroupMemberResponse> getGroupMembers(int groupId) {
        String sql = """
                SELECT ac.email, ac.first_name, ac.last_name, gm.join_timestamp FROM bgs.game_group AS gg
                INNER JOIN bgs.group_membership AS gm ON gg.id = gm.group_id
                INNER JOIN bgs.account AS ac ON gm.account_id = ac.id
                WHERE gg.id = ?;
                """;

        return jdbcTemplate.query(sql, GroupMemberResponse::fromRow, groupId);
    }

    @Override
    public boolean delete(int groupId, int accountId) {
        String sql = """
                DELETE FROM bgs.group_membership
                WHERE group_id = ?
                AND account_id = ?;
                """;

        return jdbcTemplate.update(sql, groupId, accountId) > 0;
    }
}
