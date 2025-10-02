package com.asd.board_game_statistics_api.games;

import com.asd.board_game_statistics_api.games.dto.GameRecordRequest;
import com.asd.board_game_statistics_api.games.dto.GameRecordResponse;
import com.asd.board_game_statistics_api.model.Account;
import com.asd.board_game_statistics_api.util.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameRecordService implements IGameRecordService {
    @Autowired
    private IGameRecordRepository gameRecordRepository;

    @Override
    public GameRecordResponse recordGame(Account account, GameRecordRequest request) {
        Validator.validateGameRecordRequest(request);
        return gameRecordRepository.createGameRecord(request);
    }

    @Override
    public List<GameRecordResponse> getRecordsForGroup(Account account, int groupId) {
        return gameRecordRepository.getGameRecordsByGroup(groupId);
    }

    @Override
    public void deleteRecord(Account account, int playedGameId) {
        gameRecordRepository.deleteGameRecord(playedGameId);
    }

    @Override
    public int getGroupOf(int playedGameId) {
        return gameRecordRepository.getGroupOf(playedGameId);
    }

}