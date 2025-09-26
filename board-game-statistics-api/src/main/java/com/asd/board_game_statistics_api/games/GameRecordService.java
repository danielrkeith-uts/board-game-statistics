package com.asd.board_game_statistics_api.games;

import com.asd.board_game_statistics_api.games.dto.GameRecordRequest;
import com.asd.board_game_statistics_api.games.dto.GameRecordResponse;
import com.asd.board_game_statistics_api.model.Account;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class GameRecordService {
    private final List<GameRecordResponse> records = new ArrayList<>();
    private final AtomicInteger idSeq = new AtomicInteger(1);

    public GameRecordResponse recordGame(Account account, GameRecordRequest request) {
        validateRequest(request);

        GameRecordResponse response = new GameRecordResponse(
                idSeq.getAndIncrement(),
                request.groupId(),
                request.gameId(),
                Instant.now().toString(),
                request.winCondition(),
                request.numTeams(),
                request.notes(),
                request.playerIds(),
                request.teamAssignments(),
                request.winner()
        );
        synchronized (records) {
            records.add(response);
        }
        return response;
    }

    public List<GameRecordResponse> getRecordsForGroup(Account account, int groupId) {
        synchronized (records) {
            return records.stream().filter(r -> r.groupId() == groupId).collect(Collectors.toList());
        }
    }

    private void validateRequest(GameRecordRequest request) {
        if (request.groupId() <= 0) throw new IllegalArgumentException("groupId required");
        if (request.gameId() <= 0) throw new IllegalArgumentException("gameId required");
        if (request.playerIds() == null || request.playerIds().isEmpty())
            throw new IllegalArgumentException("At least one player");
        if (request.winCondition() == null || (!request.winCondition().equals("single") && !request.winCondition().equals("team")))
            throw new IllegalArgumentException("Invalid win condition");
        if (request.winCondition().equals("team")) {
            if (request.numTeams() == null || request.numTeams() < 2)
                throw new IllegalArgumentException("numTeams >= 2 required for team mode");
            if (request.teamAssignments() == null || request.teamAssignments().size() != request.playerIds().size())
                throw new IllegalArgumentException("All players must have a team");
        } else {
            if (request.winner() == null || request.winner().isEmpty())
                throw new IllegalArgumentException("Winner required for single mode");
        }
    }
}


