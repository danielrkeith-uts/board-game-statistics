package com.asd.board_game_statistics_api.leaderboards;

import com.asd.board_game_statistics_api.leaderboards.dto.GameResponse;
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
        String sql = "SELECT * FROM bgs.owned_game WHERE group_id = ?;";
        
        return jdbcTemplate.query(sql, GameResponse::fromRow, groupId);
    }
}
