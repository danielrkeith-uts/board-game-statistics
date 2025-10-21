package com.asd.board_game_statistics_api.statistics;

import com.asd.board_game_statistics_api.statistics.dto.GlobalStatisticResponse;
import com.asd.board_game_statistics_api.statistics.dto.PlayerStatisticResponse;

public interface IStatisticsService {
    PlayerStatisticResponse getPlayerStatsByGroupId(Integer accountId, Integer groupId);
    GlobalStatisticResponse getGlobalStatisticsByAccount(Integer accountId);
}
