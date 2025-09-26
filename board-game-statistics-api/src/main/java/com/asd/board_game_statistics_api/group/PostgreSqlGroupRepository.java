package com.asd.board_game_statistics_api.group;

import com.asd.board_game_statistics_api.model.Group;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Repository
public class PostgreSqlGroupRepository implements IGroupRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public int create(String groupName, Instant creationTime) {
        KeyHolder keyholder = new GeneratedKeyHolder();

        String sql = "INSERT INTO bgs.game_group(group_name, creation_time) VALUES (?, ?);";

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, new String[] {"id"});

            preparedStatement.setString(1, groupName);
            preparedStatement.setTimestamp(2, Timestamp.from(creationTime));

            return preparedStatement;
        }, keyholder);

        Number groupId = keyholder.getKey();

        if (groupId == null) {
            return -1;
        }

        return groupId.intValue();
    }

    @Override
    public List<Group> get() {
        String sql = "SELECT * FROM bgs.game_group;";

        return jdbcTemplate.query(sql, Group::fromRow);
    }

    @Override
    public Group getByGroupId(int groupId) {
        String sql = """
                SELECT * FROM bgs.game_group
                WHERE game_group.id = ?;
                """;

        return jdbcTemplate.query(sql, Group::fromResultSet, groupId);
    }

    public List<String> getAllGroupNames() {
        String sql = """
                SELECT group_name FROM bgs.game_group
                """;

        return jdbcTemplate.queryForList(sql, String.class);
    }

    @Override
    public List<Group> getByAccountId(int accountId) {
        String sql = """
                SELECT gg.id, gg.group_name, gg.creation_time FROM bgs.game_group AS gg
                INNER JOIN bgs.group_membership AS gm ON gg.id = gm.group_id
                WHERE gm.account_id = ?
                ORDER BY gg.group_name ASC;
                """;

        return jdbcTemplate.query(sql, Group::fromRow, accountId);
    }
}
