package com.asd.board_game_statistics_api.statistics;

import com.asd.board_game_statistics_api.model.PlayerResult;
import com.asd.board_game_statistics_api.statistics.dto.GameFrequencyData;
import com.asd.board_game_statistics_api.statistics.dto.WinLossData;
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
                SELECT pr.player_result_id, pr.played_game_id, pr.account_id, pr.points, pr.player_team, pr.has_won
                FROM bgs.player_result AS pr
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

    @Override
    public List<WinLossData> getWinLossResults(Integer accountId) {
        createResultsView();

        String sql = """
                SELECT win_condition, has_won, COUNT(has_won) as num_of_games
                FROM Results
                WHERE account_id = ?
                GROUP BY win_condition, has_won
                ORDER BY win_condition, has_won ASC;
                """;

        return jdbcTemplate.query(sql, WinLossData::fromRow, accountId);
    }

    @Override
    public List<GameFrequencyData> getGameFrequencyData(Integer accountId) {
        createResultsView();

        String sql = """
                SELECT name, COUNT(*) as num_of_games
                FROM Results
                WHERE account_id = ?
                GROUP BY name;
                """;

        return jdbcTemplate.query(sql, GameFrequencyData::fromRow, accountId);
    }

    private void createResultsView() {
        String createViewSql = """
                DROP VIEW IF EXISTS Results;

                CREATE VIEW Results AS
                SELECT bg.id, pr.account_id, bg.name, bg.win_condition, pg.date_played, pr.has_won FROM bgs.board_game bg
                INNER JOIN bgs.played_game pg ON bg.id = pg.game_id
                INNER JOIN bgs.player_result pr ON pg.played_game_id = pr.played_game_id;
                """;

        jdbcTemplate.execute(createViewSql);
    }
}
