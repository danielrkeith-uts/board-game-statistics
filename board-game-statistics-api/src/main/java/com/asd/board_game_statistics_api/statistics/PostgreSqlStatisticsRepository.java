package com.asd.board_game_statistics_api.statistics;

import com.asd.board_game_statistics_api.model.PlayerResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PostgreSqlStatisticsRepository implements IStatisticsRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;
    
    @Override
    public List<PlayerResult> getPlayerResultsByGroup(Integer accountId, Integer groupId) {
        // Using a join here so we can query on accountId AND groupId from the player_result table
        String sql = """
                SELECT pr.player_result_id, pr.played_game_id, pr.account_id, pr.points, pr.player_team, pr.has_won FROM bgs.player_result AS pr
                INNER JOIN bgs.played_game AS pg ON pr.played_game_id = pg.played_game_id
                WHERE pr.account_id = ?
                AND pg.group_id = ?
                """;

        return jdbcTemplate.query(sql, PlayerResult::fromRow, accountId, groupId);
    }

    @Override
    public List<PlayerResult> getAllPlayerResultsByPlayer(Integer accountId) {
        return List.of();
    }
}
