package com.asd.board_game_statistics_api.leaderboards;

import com.asd.board_game_statistics_api.leaderboards.dto.GameResponse;
import java.util.List;

public interface ILeaderboardRepository {
    public List<GameResponse> getOwnedGames(int groupId);
}
