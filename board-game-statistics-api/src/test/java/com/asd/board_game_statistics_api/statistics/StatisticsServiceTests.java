package com.asd.board_game_statistics_api.statistics;

import com.asd.board_game_statistics_api.group.exceptions.GroupException;
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

    @Test public void doesGetPlayerStatsByGroupIdReturnResponse() {
        int accountId = 1;
        int groupId = 1;

        PlayerStatisticResponse response = statisticsService.getPlayerStatsByGroupId(accountId, groupId);

        Assertions.assertNotNull(response);
        Assertions.assertEquals(6, response.numOfGamesPlayed());
        Assertions.assertEquals(1, response.wins());
        Assertions.assertEquals(5, response.losses());
    }
}
