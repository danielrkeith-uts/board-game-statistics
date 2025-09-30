package com.asd.board_game_statistics_api.leaderboards;

import com.asd.board_game_statistics_api.leaderboards.dto.GameResponse;
import com.asd.board_game_statistics_api.leaderboards.dto.LeaderboardsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaderboardService implements ILeaderboardService {

    @Autowired
    LeaderboardRepository leaderboardRepository;

    @Override
    public List<GameResponse> getOwnedGames(int groupId) {
        return leaderboardRepository.getOwnedGames(groupId);
    }

    @Override
    public List<LeaderboardsResponse> getLeaderboardsForGame(int groupId, int gameId) {
        return List.of();
    }
}
