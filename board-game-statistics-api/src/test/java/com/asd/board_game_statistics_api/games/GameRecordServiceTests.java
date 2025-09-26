package com.asd.board_game_statistics_api.games;

import com.asd.board_game_statistics_api.games.dto.GameRecordRequest;
import com.asd.board_game_statistics_api.games.dto.GameRecordResponse;
import com.asd.board_game_statistics_api.model.Account;
import com.asd.board_game_statistics_api.test_utils.TestsWithMockedDatabase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class GameRecordServiceTests extends TestsWithMockedDatabase {

    @Autowired
    private GameRecordService gameRecordService;

    private final Account dummyAccount = new Account(1, "alice@example.com", "", "Alice", "Smith");

    @Test
    void createSingleWinner() {
        GameRecordRequest req = new GameRecordRequest(
                1, // groupId
                999, // gameId
                "single",
                null,
                List.of(1, 2, 5),
                null,
                "1",
                "unit test single"
        );

        GameRecordResponse created = gameRecordService.recordGame(dummyAccount, req);
        assertThat(created.recordId()).isPositive();
        assertThat(created.winCondition()).isEqualTo("single");

        List<GameRecordResponse> byGroup = gameRecordService.getRecordsForGroup(dummyAccount, 1);
        assertThat(byGroup).anyMatch(r -> r.recordId() == created.recordId());
    }

    @Test
    void createTeamMatch() {
        GameRecordRequest bad = new GameRecordRequest(
                1, 100, "team", null, List.of(1, 2), List.of(1, 2), "1", null
        );
        assertThrows(IllegalArgumentException.class, () -> gameRecordService.recordGame(dummyAccount, bad));

        GameRecordRequest ok = new GameRecordRequest(
                1, 100, "team", 2, List.of(1, 2), List.of(1, 2), "1", null
        );
        GameRecordResponse created = gameRecordService.recordGame(dummyAccount, ok);
        assertThat(created.recordId()).isPositive();
        assertThat(created.numTeams()).isEqualTo(2);
    }

    @Test
    void DeleteRecord() {
        // create
        GameRecordRequest req = new GameRecordRequest(
                1, 777, "single", null, List.of(1, 2), null, "1", "to delete"
        );
        GameRecordResponse created = gameRecordService.recordGame(dummyAccount, req);

        // delete
        gameRecordService.deleteRecord(dummyAccount, created.recordId());

        // verify
        List<GameRecordResponse> byGroup = gameRecordService.getRecordsForGroup(dummyAccount, 1);
        assertThat(byGroup).noneMatch(r -> r.recordId() == created.recordId());
    }
}


