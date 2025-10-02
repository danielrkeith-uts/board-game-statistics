package com.asd.board_game_statistics_api.statistics;

import com.asd.board_game_statistics_api.model.PlayerResult;

import java.util.List;

public interface IStatisticsRepository {
    List<PlayerResult> getPlayerResultsByGroup(Integer accountId, Integer groupId);
    List<PlayerResult> getAllPlayerResultsByPlayer(Integer accountId);
}
