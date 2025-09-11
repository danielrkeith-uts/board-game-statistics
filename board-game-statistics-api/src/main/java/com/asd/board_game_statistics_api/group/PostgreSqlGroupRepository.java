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
    public List<Group> get(int userId) {
        String sql = "SELECT * FROM bgs.game_group WHERE account_id = ?;";

        return jdbcTemplate.query(sql, Group::fromRow, userId);
    }
}
