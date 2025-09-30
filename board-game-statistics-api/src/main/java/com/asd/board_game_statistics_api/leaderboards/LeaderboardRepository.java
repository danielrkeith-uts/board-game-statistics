package com.asd.board_game_statistics_api.leaderboards;

import com.asd.board_game_statistics_api.leaderboards.dto.GameResponse;
import com.asd.board_game_statistics_api.leaderboards.dto.LeaderboardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LeaderboardRepository implements ILeaderboardRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<GameResponse> getOwnedGames(int groupId) {
        String sql = "SELECT * FROM bgs.owned_game WHERE group_id = ?;";

        return jdbcTemplate.query(sql, GameResponse::fromRow, groupId);
    }

    @Override
    public List<LeaderboardResponse> getLeaderboard(int groupId, int gameId) {
        String sql = """
                SELECT bgs.player_result.account_id, bgs.account.first_name, bgs.account.last_name, SUM(bgs.player_result.points)
                FROM bgs.player_result INNER JOIN bgs.played_game
                ON bgs.played_game.played_game_id = bgs.player_result.played_game_id
                INNER JOIN bgs.account
                ON account.id = player_result.account_id
                WHERE bgs.played_game.group_id = ? AND bgs.played_game.game_id = ?
                GROUP BY bgs.player_result.account_id, bgs.account.first_name, bgs.account.last_name
                ORDER BY SUM(bgs.player_result.points) DESC;
        """;
        return jdbcTemplate.query(sql, LeaderboardResponse::fromRow, groupId, gameId);
    }


}
