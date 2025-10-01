package com.asd.board_game_statistics_api.leaderboards;

import com.asd.board_game_statistics_api.leaderboards.dto.GameResponse;
import com.asd.board_game_statistics_api.leaderboards.dto.LeaderboardResponse;

import java.util.List;

public interface ILeaderboardRepository {
    public List<GameResponse> getOwnedGames(int groupId);
    public List<LeaderboardResponse> getLeaderboard(int groupId, int gameId);
}
