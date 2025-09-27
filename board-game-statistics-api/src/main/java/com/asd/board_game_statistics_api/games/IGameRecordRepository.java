package com.asd.board_game_statistics_api.games;

import com.asd.board_game_statistics_api.games.dto.GameRecordRequest;
import com.asd.board_game_statistics_api.games.dto.GameRecordResponse;

import java.util.List;

public interface IGameRecordRepository {
    GameRecordResponse createGameRecord(GameRecordRequest request);
    List<GameRecordResponse> getGameRecordsByGroup(int groupId);
    void deleteGameRecord(int playedGameId);
}
