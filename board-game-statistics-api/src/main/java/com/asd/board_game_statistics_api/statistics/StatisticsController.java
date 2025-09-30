package com.asd.board_game_statistics_api.statistics;

import com.asd.board_game_statistics_api.model.Account;
import com.asd.board_game_statistics_api.statistics.dto.PlayerStatisticResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
public class StatisticsController {
    @Autowired
    private IStatisticsService statisticsService;

    @GetMapping("/{groupId}")
    public ResponseEntity<?> getPlayerStatsByGroupId(@AuthenticationPrincipal Account account, @PathVariable Integer groupId) {
        PlayerStatisticResponse playerStatisticResponse = statisticsService.getPlayerStatsByGroupId(account.id(), groupId);
        return ResponseEntity.ok(playerStatisticResponse);
    }
}
