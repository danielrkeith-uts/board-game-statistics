package com.asd.board_game_statistics_api.statistics;

import com.asd.board_game_statistics_api.model.PlayerResult;
import com.asd.board_game_statistics_api.statistics.dto.GameFrequencyData;
import com.asd.board_game_statistics_api.statistics.dto.WinLossData;

import java.util.List;

public interface IStatisticsRepository {
    List<PlayerResult> getPlayerResultsByGroup(Integer accountId, Integer groupId);
    List<PlayerResult> getAllPlayerResultsByPlayer(Integer accountId);

    List<WinLossData> getWinLossResults(Integer accountId);

    List<GameFrequencyData> getGameFrequencyData(Integer accountId);
}
