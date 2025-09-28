package com.asd.board_game_statistics_api.games;

import com.asd.board_game_statistics_api.games.dto.GameRecordRequest;
import com.asd.board_game_statistics_api.games.dto.GameRecordResponse;
import com.asd.board_game_statistics_api.model.Account;
import com.asd.board_game_statistics_api.test_utils.TestsWithMockedDatabase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class GameRecordServiceTests extends TestsWithMockedDatabase {

    @Autowired
    private GameRecordService gameRecordService;

    private final Account dummyAccount = new Account(1, "alice@example.com", "", "Alice", "Smith");

    @Test
    void createSingleWinner() {
        GameRecordRequest req = new GameRecordRequest(
                1, // groupId
                999, // gameId
                "2024-01-15", // datePlayed
                List.of(1, 2, 5), // playerIds
                List.of(150, 120, 180), // points
                Arrays.asList((Integer) null, (Integer) null, (Integer) null), // playerTeams (null for solo)
                List.of(true, false, false) // hasWon
        );

        GameRecordResponse created = gameRecordService.recordGame(dummyAccount, req);
        assertThat(created.playedGameId()).isPositive();
        assertThat(created.playerIds()).containsExactly(1, 2, 5);
        assertThat(created.points()).containsExactly(150, 120, 180);
        assertThat(created.hasWon()).containsExactly(true, false, false);

        List<GameRecordResponse> byGroup = gameRecordService.getRecordsForGroup(dummyAccount, 1);
        assertThat(byGroup).anyMatch(r -> r.playedGameId() == created.playedGameId());
    }

    @Test
    void createTeamMatch() {
        GameRecordRequest bad = new GameRecordRequest(
                1, 100, "2024-01-15", List.of(1, 2), List.of(150, 120), List.of(1, 2), List.of(true, false)
        );

        GameRecordResponse created = gameRecordService.recordGame(dummyAccount, bad);
        assertThat(created.playedGameId()).isPositive();
        assertThat(created.playerTeams()).containsExactly(1, 2);
    }

    @Test
    void DeleteRecord() {
        // create
        GameRecordRequest req = new GameRecordRequest(
                1, 777, "2024-01-15", List.of(1, 2), List.of(150, 120), Arrays.asList((Integer) null, (Integer) null), List.of(true, false)
        );
        GameRecordResponse created = gameRecordService.recordGame(dummyAccount, req);

        // delete
        gameRecordService.deleteRecord(dummyAccount, created.playedGameId());

        // verify
        List<GameRecordResponse> byGroup = gameRecordService.getRecordsForGroup(dummyAccount, 1);
        assertThat(byGroup).noneMatch(r -> r.playedGameId() == created.playedGameId());
    }
}


