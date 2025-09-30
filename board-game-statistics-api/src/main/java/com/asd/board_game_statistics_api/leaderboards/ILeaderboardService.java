package com.asd.board_game_statistics_api.leaderboards;

import com.asd.board_game_statistics_api.leaderboards.dto.GameResponse;
import com.asd.board_game_statistics_api.leaderboards.dto.LeaderboardsResponse;

import java.util.List;

public interface ILeaderboardService {
    List<GameResponse> getOwnedGames(int groupId);
    List<LeaderboardsResponse> getLeaderboardsForGame(int groupId, int gameId);
}
