package com.asd.board_game_statistics_api.leaderboards;

import com.asd.board_game_statistics_api.leaderboards.dto.GameResponse;
import com.asd.board_game_statistics_api.leaderboards.dto.LeaderboardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LeaderboardRepository implements ILeaderboardRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<GameResponse> getOwnedGames(int groupId) {
        String sql = """
                SELECT bgs.board_game.name, bgs.group_membership.group_id, bgs.board_game.id FROM bgs.group_membership
                INNER JOIN bgs.owned_game
                ON bgs.group_membership.account_id = bgs.owned_game.account_id
                INNER JOIN bgs.board_game
                ON bgs.board_game.id = bgs.owned_game.game_id
                WHERE bgs.group_membership.group_id = ?
                GROUP BY bgs.board_game.name, bgs.group_membership.group_id, bgs.board_game.id;
                """;

        return jdbcTemplate.query(sql, GameResponse::fromRow, groupId);
    }

    @Override
    public List<LeaderboardResponse> getLeaderboard(int groupId, int gameId) {
        String sql = """
                SELECT bgs.player_result.account_id, bgs.account.first_name, bgs.account.last_name, SUM(CASE WHEN bgs.player_result.has_won = TRUE THEN 1 ELSE 0 END) AS Wins
                FROM bgs.group_membership
                INNER JOIN bgs.account
                ON bgs.account.id = bgs.group_membership.account_id
                INNER JOIN bgs.player_result
                ON bgs.account.id = bgs.player_result.account_id
                INNER JOIN bgs.played_game
                ON bgs.player_result.played_game_id = bgs.played_game.played_game_id
                WHERE bgs.group_membership.group_id = ?
                AND bgs.played_game.game_id = ?
                GROUP BY bgs.player_result.account_id, bgs.account.first_name, bgs.account.last_name
                ORDER BY Wins DESC;
        """;
        return jdbcTemplate.query(sql, LeaderboardResponse::fromRow, groupId, gameId);
    }


}
