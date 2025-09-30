package com.asd.board_game_statistics_api.leaderboards;

import com.asd.board_game_statistics_api.leaderboards.dto.GameResponse;
import com.asd.board_game_statistics_api.leaderboards.dto.LeaderboardsResponse;

import java.util.List;

public class LeaderboardService implements ILeaderboardService {

    @Override
    public List<GameResponse> getOwnedGames(int groupId) {
        return List.of();
    }

    @Override
    public List<LeaderboardsResponse> getLeaderboardsForGame(int groupId, int gameId) {
        return List.of();
    }
}
