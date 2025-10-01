package com.asd.board_game_statistics_api.leaderboards;

import com.asd.board_game_statistics_api.leaderboards.dto.GameResponse;
import com.asd.board_game_statistics_api.leaderboards.dto.LeaderboardResponse;

import java.util.List;

public interface ILeaderboardService {
    List<GameResponse> getOwnedGames(int groupId);
    List<LeaderboardResponse> getLeaderboardsForGame(int groupId, int gameId);
}
