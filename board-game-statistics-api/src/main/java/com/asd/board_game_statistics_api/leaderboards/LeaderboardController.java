package com.asd.board_game_statistics_api.leaderboards;

import com.asd.board_game_statistics_api.leaderboards.dto.GameResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LeaderboardController {
    @Autowired
    private LeaderboardService leaderboardService;

    @GetMapping("/api/ownedgames/{groupId}")
    public List<GameResponse> getOwnedGames(@PathVariable("groupId") int groupId) {
        return leaderboardService.getOwnedGames(groupId);
    }
}
