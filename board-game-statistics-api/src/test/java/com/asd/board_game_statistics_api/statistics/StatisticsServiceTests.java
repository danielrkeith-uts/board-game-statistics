package com.asd.board_game_statistics_api.statistics;

import com.asd.board_game_statistics_api.exceptions.HttpBadRequestException;
import com.asd.board_game_statistics_api.group.exceptions.GroupException;
import com.asd.board_game_statistics_api.statistics.dto.GlobalStatisticResponse;
import com.asd.board_game_statistics_api.statistics.dto.PlayerStatisticResponse;
import com.asd.board_game_statistics_api.test_utils.TestsWithMockedDatabase;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class StatisticsServiceTests extends TestsWithMockedDatabase {
    @Autowired
    StatisticsService statisticsService;

    @Test
    public void doesGetPlayerStatsByGroupIdErrorForInvalidGroupId() {
        int accountId = 1;
        int groupId = -1;

        Assertions.assertThrows(
                GroupException.class,
                () -> statisticsService.getPlayerStatsByGroupId(accountId, groupId)
        );
    }

    @Test
    public void doesGetPlayerStatsByGroupIdReturnResponse() {
        int accountId = 1;
        int groupId = 1;

        PlayerStatisticResponse response = statisticsService.getPlayerStatsByGroupId(accountId, groupId);

        Assertions.assertNotNull(response);
        Assertions.assertNotNull(response.numOfGamesPlayed());
        Assertions.assertNotNull(response.wins());
        Assertions.assertNotNull(response.losses());
    }

    @Test
    public void doesGetGlobalStatisticsByAccountErrorWhenThereIsNoAccountId() {
        Assertions.assertThrows(
                HttpBadRequestException.class,
                () -> statisticsService.getGlobalStatisticsByAccount(null)
        );
    }

    @Test
    public void doesGetGlobalStatisticsByAccountReturnAnActualResult() {
        int accountId = 1;

        GlobalStatisticResponse response = statisticsService.getGlobalStatisticsByAccount(accountId);

        Assertions.assertNotNull(response);
        Assertions.assertNotNull(response.barChartData());
        Assertions.assertNotNull(response.pieChartData());
        Assertions.assertNotNull(response.tableData());
    }
}
