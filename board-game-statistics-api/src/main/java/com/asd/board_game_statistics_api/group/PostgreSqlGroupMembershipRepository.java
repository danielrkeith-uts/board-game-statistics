package com.asd.board_game_statistics_api.group;

import com.asd.board_game_statistics_api.account.dto.MeResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PostgreSqlGroupMembershipRepository implements IGroupMembershipRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void create(int groupId, int accountId, String permissionsString) {
        String sql = "INSERT INTO bgs.group_membership (group_id, account_id, permissions_string) VALUES (?, ?, ?);";

        jdbcTemplate.update(sql, groupId, accountId, permissionsString);
    }

    @Override
    public List<MeResponse> getGroupMembers(int groupId) {
        String sql = """
                SELECT ac.email, ac.first_name, ac.last_name FROM bgs.game_group AS gg
                INNER JOIN bgs.group_membership AS gm ON gg.id = gm.group_id
                INNER JOIN bgs.account AS ac ON gm.account_id = ac.id
                WHERE gg.id = ?;
                """;

        return jdbcTemplate.query(sql, MeResponse::fromRow, groupId);
    }
}
