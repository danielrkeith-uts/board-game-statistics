package com.asd.board_game_statistics_api.games;

import com.asd.board_game_statistics_api.games.dto.GameRecordRequest;
import com.asd.board_game_statistics_api.games.dto.GameRecordResponse;
import com.asd.board_game_statistics_api.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameRecordService {
    @Autowired
    private IGameRecordRepository gameRecordRepository;

    public GameRecordResponse recordGame(Account account, GameRecordRequest request) {
        validateRequest(request);
        return gameRecordRepository.createGameRecord(request);
    }

    public List<GameRecordResponse> getRecordsForGroup(Account account, int groupId) {
        return gameRecordRepository.getGameRecordsByGroup(groupId);
    }

    public void deleteRecord(Account account, int playedGameId) {
        gameRecordRepository.deleteGameRecord(playedGameId);
    }

    private void validateRequest(GameRecordRequest request) {
        if (request.groupId() <= 0) throw new IllegalArgumentException("groupId required");
        if (request.gameId() <= 0) throw new IllegalArgumentException("gameId required");
        if (request.datePlayed() == null || request.datePlayed().isEmpty())
            throw new IllegalArgumentException("datePlayed required");
        if (request.playerIds() == null || request.playerIds().isEmpty())
            throw new IllegalArgumentException("At least one player required");
        if (request.points() == null || request.points().size() != request.playerIds().size())
            throw new IllegalArgumentException("Points must be provided for all players");
        if (request.playerTeams() == null || request.playerTeams().size() != request.playerIds().size())
            throw new IllegalArgumentException("Player teams must be provided for all players");
        if (request.hasWon() == null || request.hasWon().size() != request.playerIds().size())
            throw new IllegalArgumentException("Win status must be provided for all players");
    }
}