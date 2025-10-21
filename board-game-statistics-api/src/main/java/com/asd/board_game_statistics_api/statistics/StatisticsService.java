package com.asd.board_game_statistics_api.statistics;

import com.asd.board_game_statistics_api.exceptions.HttpBadRequestException;
import com.asd.board_game_statistics_api.group.GroupService;
import com.asd.board_game_statistics_api.group.exceptions.GroupException;
import com.asd.board_game_statistics_api.model.PlayerResult;
import com.asd.board_game_statistics_api.statistics.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.*;

import static com.asd.board_game_statistics_api.model.Game.ALLOWED_WIN_CONDITIONS;

@Service
public class StatisticsService implements IStatisticsService {
    @Autowired
    private GroupService groupService;
    @Autowired
    private IStatisticsRepository statisticsRepository;

    @Override
    public PlayerStatisticResponse getPlayerStatsByGroupId(Integer accountId, Integer groupId) {
        if (accountId == null) {
            throw new HttpBadRequestException("Failed to get player stats. AccountId is null.");
        }

        if (!groupService.belongsToGroup(accountId, groupId)) {
            throw new GroupException("Account does not belong to group.");
        }

        List<PlayerResult> playerResults = statisticsRepository.getPlayerResultsByGroup(accountId, groupId);

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

    @Override
    public GlobalStatisticResponse getGlobalStatisticsByAccount(Integer accountId) {
        if (accountId == null) {
            throw new HttpBadRequestException("Failed to get player stats. AccountId is null.");
        }

        // Fetch data
        List<WinLossData> winLossData = statisticsRepository.getWinLossResults(accountId);
        List<GameFrequencyData> gameFrequencyData = statisticsRepository.getGameFrequencyData(accountId);

        // Convert set to list and sort
        List<String> winConditions = new ArrayList<>(ALLOWED_WIN_CONDITIONS);
        Collections.sort(winConditions);

        // The indexes of the integer arrays correspond to a win condition, e.g. 0 -> COOPERATIVE, 1 -> FIRST_TO_FINISH, etc.
        Integer[] wins = new Integer[ALLOWED_WIN_CONDITIONS.size()];
        int winSum = 0;
        Integer[] losses = new Integer[ALLOWED_WIN_CONDITIONS.size()];
        int lossSum = 0;

        for (WinLossData result : winLossData) {
            int i = winConditions.indexOf(result.winCondition());

            // Change nulls to 0, as the arrays use Integer instead of int
            if (wins[i] == null) {
                wins[i] = 0;
            }
            if (losses[i] == null) {
                losses[i] = 0;
            }

            if (result.hasWon()) {
                wins[i] = result.numOfGames();
                winSum += result.numOfGames();
            } else {
                losses[i] = result.numOfGames();
                lossSum += result.numOfGames();
            }
        }

        BarChartData barChartData = new BarChartData(Arrays.asList(wins), Arrays.asList(losses));

        return new GlobalStatisticResponse(barChartData, getPieChartData(gameFrequencyData), getTableData(winSum, lossSum));
    }

    private PieChartData getPieChartData(List<GameFrequencyData> gameFrequencyData) {
        List<String> gameNames = new ArrayList<>();
        List<Integer> numOfGames = new ArrayList<>();

        for (GameFrequencyData gameData : gameFrequencyData) {
            gameNames.add(gameData.gameName());
            numOfGames.add(gameData.numOfGamesPlayed());
        }

        return new PieChartData(gameNames, numOfGames);
    }

    private TableData getTableData(int winSum, int lossSum) {
        int numOfGamesPlayed = winSum + lossSum;
        double winRate = (double) winSum / numOfGamesPlayed * 100;
        DecimalFormat oneDpFormat = new DecimalFormat("#.#");

        return new TableData(numOfGamesPlayed, Float.parseFloat(oneDpFormat.format(winRate)));
    }
}
