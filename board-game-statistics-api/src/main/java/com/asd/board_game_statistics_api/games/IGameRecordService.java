package com.asd.board_game_statistics_api.games;

import com.asd.board_game_statistics_api.games.dto.GameRecordRequest;
import com.asd.board_game_statistics_api.games.dto.GameRecordResponse;
import com.asd.board_game_statistics_api.model.Account;

import java.util.List;

public interface IGameRecordService {

    GameRecordResponse recordGame(Account account, GameRecordRequest request);

    List<GameRecordResponse> getRecordsForGroup(Account account, int groupId);

    void deleteRecord(Account account, int playedGameId);

    int getGroupOf(int playedGameId);
}
