package com.asd.board_game_statistics_api.statistics;

import com.asd.board_game_statistics_api.games.PostgreSqlGameRecordRepository;
import com.asd.board_game_statistics_api.group.GroupService;
import com.asd.board_game_statistics_api.group.exceptions.GroupException;
import com.asd.board_game_statistics_api.model.PlayerResult;
import com.asd.board_game_statistics_api.statistics.dto.PlayerStatisticResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatisticsService implements IStatisticsService {
    @Autowired
    private GroupService groupService;
    @Autowired
    private PostgreSqlGameRecordRepository gameRecordRepository;

    public PlayerStatisticResponse getPlayerStatsByGroupId(Integer accountId, Integer groupId) {
        if (!groupService.belongsToGroup(accountId, groupId)) {
            throw new GroupException("Account does not belong to group.");
        }

        List<PlayerResult> playerResults = gameRecordRepository.getPlayerResultsByGroup(accountId, groupId);

        int wins = 0;
        int losses = 0;

        for (PlayerResult result : playerResults) {
            if (result.hasWon()) {
                wins++;
            } else {
                losses++;
            }
        }

        return new PlayerStatisticResponse(
                playerResults.size(),
                wins,
                losses
        );
    }
}
